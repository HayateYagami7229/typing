const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const SHARE_ID_LENGTH = 16;
const DAILY_UPLOAD_CAP = 300;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/share') {
      return handleShareUpload(request, env);
    }

    const imageMatch = url.pathname.match(/^\/s\/([a-zA-Z0-9_-]{1,64})\.png$/);
    if (imageMatch) {
      return handleShareImage(imageMatch[1], env);
    }

    const viewMatch = url.pathname.match(/^\/s\/([a-zA-Z0-9_-]{1,64})$/);
    if (viewMatch) {
      return handleShareView(viewMatch[1], env, url);
    }

    return env.ASSETS.fetch(request);
  },
};

function randomId(length) {
  const bytes = new Uint8Array(length / 2);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function checkAndIncrementDailyCount(env) {
  const today = new Date().toISOString().slice(0, 10);
  const key = `_meta/count-${today}`;
  const obj = await env.PROFILE_IMAGES.get(key);
  const count = obj ? parseInt(await obj.text(), 10) || 0 : 0;
  if (count >= DAILY_UPLOAD_CAP) return false;
  await env.PROFILE_IMAGES.put(key, String(count + 1));
  return true;
}

async function handleShareUpload(request, env) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.startsWith('image/png')) {
    return new Response(JSON.stringify({ error: 'invalid content type' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const body = await request.arrayBuffer();
  if (body.byteLength === 0 || body.byteLength > MAX_IMAGE_BYTES) {
    return new Response(JSON.stringify({ error: 'invalid image size' }), {
      status: 413,
      headers: { 'content-type': 'application/json' },
    });
  }

  const underCap = await checkAndIncrementDailyCount(env);
  if (!underCap) {
    return new Response(JSON.stringify({ error: 'daily upload cap reached' }), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    });
  }

  const id = randomId(SHARE_ID_LENGTH);
  await env.PROFILE_IMAGES.put(`${id}.png`, body, {
    httpMetadata: { contentType: 'image/png' },
  });

  const shareUrl = `${new URL(request.url).origin}/s/${id}`;
  return new Response(JSON.stringify({ id, shareUrl }), {
    headers: { 'content-type': 'application/json' },
  });
}

async function handleShareImage(id, env) {
  const obj = await env.PROFILE_IMAGES.get(`${id}.png`);
  if (!obj) return new Response('Not found', { status: 404 });
  return new Response(obj.body, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  });
}

async function handleShareView(id, env, url) {
  const exists = await env.PROFILE_IMAGES.head(`${id}.png`);
  if (!exists) return new Response('Not found', { status: 404 });

  const imageUrl = `${url.origin}/s/${id}.png`;
  const shareUrl = `${url.origin}/s/${id}`;
  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ENDLESS TYPE-LOOP - プロフィールカード</title>
<meta property="og:title" content="ENDLESS TYPE-LOOP プロフィールカード">
<meta property="og:description" content="無限に打てる蓄積型タイピングゲーム「ENDLESS TYPE-LOOP」">
<meta property="og:image" content="${imageUrl}">
<meta property="og:url" content="${shareUrl}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${imageUrl}">
<style>
  body { background:#0c0e17; color:#eef0ff; font-family:'M PLUS Rounded 1c', sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; margin:0; gap:20px; padding:20px; box-sizing:border-box; }
  img { max-width:90vw; max-height:70vh; border-radius:10px; border:1px solid #33375a; }
  a { color:#7c8cff; text-decoration:none; font-weight:700; }
</style>
</head>
<body>
<img src="${imageUrl}" alt="プロフィールカード">
<a href="https://endless-type-loop.online">ENDLESS TYPE-LOOP で遊ぶ →</a>
</body>
</html>`;

  return new Response(html, { headers: { 'content-type': 'text/html; charset=UTF-8' } });
}
