const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const SHARE_ID_LENGTH = 16;
const DAILY_UPLOAD_CAP = 300;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/share') {
      return handleShareUpload(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/api/progress') {
      return handleProgressReport(request, env);
    }

    if (request.method === 'GET' && url.pathname === '/admin/progress') {
      return handleProgressView(request, env, url);
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

const PROGRESS_FIELDS = [
  'level', 'max_level_reached', 'prestige', 'prestige_awakened',
  'god_statue_sent', 'god_statue_completed', 'garden_restorations', 'disciple_total_params',
  'disciple_class_upped', 'maou_defeated', 'rico_unlocked', 'rico_fully_owned',
  'mechanical_egg_hatched', 'castle_unlocked', 'castle_progress', 'endless_mode_unlocked',
  'total_correct', 'total_play_time_min', 'best_kpm',
];

function clampInt(v, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function boolTo01(v) {
  return v ? 1 : 0;
}

const FIELD_CAPS = {
  level: 999,
  max_level_reached: 999,
  prestige: 100000,
  god_statue_sent: 1000000,
  garden_restorations: 1000000,
  disciple_total_params: 1000000,
  castle_progress: 100000,
  total_correct: 1000000000,
  total_play_time_min: 5256000,
  best_kpm: 10000,
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

async function handleProgressReport(request, env) {
  if (!env.PROGRESS_SHARED_KEY || request.headers.get('x-progress-key') !== env.PROGRESS_SHARED_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response('bad request', { status: 400 });
  }
  if (!data || typeof data.player_id !== 'string' || !data.player_id || data.player_id.length > 128) {
    return new Response('bad request', { status: 400 });
  }

  const playerId = data.player_id.slice(0, 128);
  const playerName = String(data.player_name || '').slice(0, 64);
  const bestRank = data.best_rank ? String(data.best_rank).slice(0, 8) : null;
  const now = Date.now();

  const boolFields = new Set([
    'prestige_awakened', 'god_statue_completed', 'disciple_class_upped', 'maou_defeated',
    'rico_unlocked', 'rico_fully_owned', 'mechanical_egg_hatched', 'castle_unlocked',
    'endless_mode_unlocked',
  ]);
  const values = PROGRESS_FIELDS.map((f) => {
    if (boolFields.has(f)) return boolTo01(data[f]);
    return clampInt(data[f], 0, FIELD_CAPS[f] || 1000000);
  });

  const setClause = PROGRESS_FIELDS.map((f) => `${f}=excluded.${f}`).join(', ');
  await env.DB.prepare(`
    INSERT INTO player_progress (
      player_id, player_name, ${PROGRESS_FIELDS.join(', ')}, best_rank, updated_at
    ) VALUES (?, ?, ${PROGRESS_FIELDS.map(() => '?').join(', ')}, ?, ?)
    ON CONFLICT(player_id) DO UPDATE SET
      player_name=excluded.player_name, ${setClause}, best_rank=excluded.best_rank, updated_at=excluded.updated_at
  `).bind(playerId, playerName, ...values, bestRank, now).run();

  return new Response(null, { status: 204 });
}

async function handleProgressView(request, env, url) {
  const key = url.searchParams.get('key');
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { results } = await env.DB.prepare(
    'SELECT * FROM player_progress ORDER BY maou_defeated DESC, castle_progress DESC, level DESC',
  ).all();
  const rows = results || [];
  const total = rows.length;
  const count = (pred) => rows.filter(pred).length;
  const summary = {
    total,
    prestigeAny: count((r) => r.prestige > 0),
    godStatueAny: count((r) => r.god_statue_sent > 0),
    godStatueComplete: count((r) => r.god_statue_completed),
    maouDefeated: count((r) => r.maou_defeated),
    castleUnlocked: count((r) => r.castle_unlocked),
    endlessUnlocked: count((r) => r.endless_mode_unlocked),
  };

  const tableRows = rows.map((r) => `<tr>
    <td>${escapeHtml(r.player_name || '')}</td>
    <td>${r.level}</td>
    <td>${r.prestige}</td>
    <td>${r.god_statue_sent}</td>
    <td>${r.garden_restorations}</td>
    <td>${r.disciple_total_params}</td>
    <td>${r.maou_defeated ? '✅' : ''}</td>
    <td>${r.castle_unlocked ? r.castle_progress : ''}</td>
    <td>${r.endless_mode_unlocked ? '✅' : ''}</td>
    <td>${r.total_play_time_min}分</td>
    <td>${new Date(r.updated_at).toLocaleString('ja-JP')}</td>
  </tr>`).join('');

  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>プレイヤー進捗</title>
<style>
  body { background:#0c0e17; color:#eef0ff; font-family:sans-serif; padding:20px; }
  table { border-collapse: collapse; width: 100%; font-size: 0.85rem; }
  th, td { border: 1px solid #33375a; padding: 4px 8px; text-align: right; }
  th:first-child, td:first-child { text-align: left; }
  th { background: #1a1d2e; position: sticky; top: 0; }
  .summary { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
  .summary div { background: #1a1d2e; border: 1px solid #33375a; border-radius: 8px; padding: 8px 14px; }
</style>
</head>
<body>
<h1>プレイヤー進捗（総数: ${summary.total}）</h1>
<div class="summary">
  <div>転生経験者: ${summary.prestigeAny}</div>
  <div>女神像送付経験者: ${summary.godStatueAny}</div>
  <div>女神像完全復興: ${summary.godStatueComplete}</div>
  <div>魔王討伐: ${summary.maouDefeated}</div>
  <div>城建築解放: ${summary.castleUnlocked}</div>
  <div>Endless解放: ${summary.endlessUnlocked}</div>
</div>
<table>
<thead><tr>
  <th>名前</th><th>Lv</th><th>転生</th><th>女神像sent</th><th>園復興</th><th>弟子params</th>
  <th>魔王討伐</th><th>城進捗</th><th>Endless</th><th>総プレイ時間</th><th>最終更新</th>
</tr></thead>
<tbody>${tableRows}</tbody>
</table>
</body>
</html>`;

  return new Response(html, { headers: { 'content-type': 'text/html; charset=UTF-8' } });
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
