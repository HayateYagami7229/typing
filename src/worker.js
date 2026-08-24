const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const SHARE_ID_LENGTH = 16;
const DAILY_UPLOAD_CAP = 300;
const CASTLE_BUILD_TOTAL = 500;
const JUNKYARD_POOL_TOTAL = 500;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/share') {
      return handleShareUpload(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/api/progress') {
      return handleProgressReport(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/api/save/upload') {
      return handleSaveUpload(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/api/save/download') {
      return handleSaveDownload(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/api/progress/delete') {
      return handleProgressDelete(request, env);
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
  'total_correct', 'total_play_time_min', 'best_kpm', 'dungeon_starts', 'pt', 'total_pt_earned',
  'pt_tamper_flag', 'junkyard_draws',
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
  dungeon_starts: 10000000,
  pt: 1e15,
  total_pt_earned: 1e15,
  junkyard_draws: 500,
};

const VALID_FUNNEL_IDS = new Set([
  ...Array.from({ length: 21 }, (_, i) => `1-${i + 1}`),
  ...Array.from({ length: 14 }, (_, i) => `2-${i + 1}`),
]);

const FUNNEL_LABELS = {
  '1-1': 'ゲーム開始',
  '1-2': '転生1回達成',
  '1-3': '女神像sent≥1',
  '1-4': '弟子params≥100',
  '1-5': '弟子params≥500',
  '1-6': '弟子クラスアップ',
  '1-7': '魔王に1回敗北',
  '1-8': 'リコ解放',
  '1-9': 'リコ装備コンプ',
  '1-10': '女神像sent≥100',
  '1-11': '女神の園復興1回',
  '1-12': 'リコ全MAX',
  '1-13': 'リコと出会った',
  '1-14': '封紋章解放',
  '1-15': '封紋章1回作成',
  '1-16': '魔王に2回敗北',
  '1-17': '園復興ヒント表示',
  '1-18': '永続コンボ解放',
  '1-19': '弟子連勝1万',
  '1-20': '覚醒（転生10回）',
  '1-21': '魔王討伐',
  '2-1': '卵を購入',
  '2-2': '卵を孵化',
  '2-3': 'パーツを初めて引いた',
  '2-4': 'バッテリーをカンスト所持',
  '2-5': 'パーツを揃えた',
  '2-6': 'ジャンクヤードを綺麗にした',
  '2-7': '因果の巨塔に初めて向かった',
  '2-8': '初めて建築をした',
  '2-9': '素材変換器を購入した',
  '2-10': '建築率5％達成',
  '2-11': '建築率50％達成',
  '2-12': '城を完全に建築した',
  '2-13': '因果の巨塔のモンスターを1000体蹴散らした',
  '2-14': '因果の巨塔のモンスターを全て蹴散らした',
};

function sanitizeFunnelsReached(v) {
  if (!Array.isArray(v)) return '[]';
  const filtered = v.filter((x) => typeof x === 'string' && VALID_FUNNEL_IDS.has(x)).slice(0, 35);
  return JSON.stringify(filtered);
}

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
  const funnelsReached = sanitizeFunnelsReached(data.funnels_reached);
  const now = Date.now();

  const boolFields = new Set([
    'prestige_awakened', 'god_statue_completed', 'disciple_class_upped', 'maou_defeated',
    'rico_unlocked', 'rico_fully_owned', 'mechanical_egg_hatched', 'castle_unlocked',
    'endless_mode_unlocked', 'pt_tamper_flag',
  ]);
  const values = PROGRESS_FIELDS.map((f) => {
    if (boolFields.has(f)) return boolTo01(data[f]);
    return clampInt(data[f], 0, FIELD_CAPS[f] || 1000000);
  });

  const setClause = PROGRESS_FIELDS.map((f) => `${f}=excluded.${f}`).join(', ');
  await env.DB.prepare(`
    INSERT INTO player_progress (
      player_id, player_name, ${PROGRESS_FIELDS.join(', ')}, best_rank, funnels_reached, updated_at
    ) VALUES (?, ?, ${PROGRESS_FIELDS.map(() => '?').join(', ')}, ?, ?, ?)
    ON CONFLICT(player_id) DO UPDATE SET
      player_name=excluded.player_name, ${setClause}, best_rank=excluded.best_rank,
      funnels_reached=excluded.funnels_reached, updated_at=excluded.updated_at
  `).bind(playerId, playerName, ...values, bestRank, funnelsReached, now).run();

  return new Response(null, { status: 204 });
}

async function handleProgressDelete(request, env) {
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
  await env.DB.batch([
    env.DB.prepare('DELETE FROM player_progress WHERE player_id = ?').bind(playerId),
    env.DB.prepare('DELETE FROM player_saves WHERE player_id = ?').bind(playerId),
  ]);

  return new Response(null, { status: 204 });
}

const MAX_SAVE_JSON_BYTES = 512 * 1024;

async function handleSaveUpload(request, env) {
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
  if (typeof data.sync_token !== 'string' || !data.sync_token || data.sync_token.length > 128) {
    return new Response('bad request', { status: 400 });
  }
  if (typeof data.save_json !== 'string' || !data.save_json || data.save_json.length > MAX_SAVE_JSON_BYTES) {
    return new Response('bad request', { status: 400 });
  }

  const playerId = data.player_id.slice(0, 128);
  const syncToken = data.sync_token.slice(0, 128);
  const lastModifiedAt = clampInt(data.last_modified_at, 0, 9999999999999);
  const now = Date.now();

  const existing = await env.DB.prepare('SELECT sync_token FROM player_saves WHERE player_id = ?').bind(playerId).first();
  if (existing && existing.sync_token !== syncToken) {
    return new Response('Unauthorized', { status: 401 });
  }

  await env.DB.prepare(`
    INSERT INTO player_saves (player_id, sync_token, save_json, last_modified_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(player_id) DO UPDATE SET
      sync_token=excluded.sync_token, save_json=excluded.save_json,
      last_modified_at=excluded.last_modified_at, updated_at=excluded.updated_at
  `).bind(playerId, syncToken, data.save_json, lastModifiedAt, now).run();

  return new Response(null, { status: 204 });
}

async function handleSaveDownload(request, env) {
  if (!env.PROGRESS_SHARED_KEY || request.headers.get('x-progress-key') !== env.PROGRESS_SHARED_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response('bad request', { status: 400 });
  }
  if (!data || typeof data.player_id !== 'string' || !data.player_id) {
    return new Response('bad request', { status: 400 });
  }
  if (typeof data.sync_token !== 'string' || !data.sync_token) {
    return new Response('bad request', { status: 400 });
  }

  const row = await env.DB.prepare(
    'SELECT sync_token, save_json, last_modified_at FROM player_saves WHERE player_id = ?',
  ).bind(data.player_id.slice(0, 128)).first();

  if (!row || row.sync_token !== data.sync_token) {
    return new Response(JSON.stringify({ found: false }), {
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    found: true,
    save_json: row.save_json,
    last_modified_at: row.last_modified_at,
  }), { headers: { 'content-type': 'application/json' } });
}

function fmtNum(n) {
  return Number(n || 0).toLocaleString('ja-JP');
}

function maxRow(rows, key) {
  if (!rows.length) return null;
  return rows.reduce((best, r) => ((best === null || r[key] > best[key]) ? r : best), null);
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
  rows.forEach((r) => { r.progress = r.prestige * 100 + r.level; });
  const total = rows.length;
  const count = (pred) => rows.filter(pred).length;
  const sum = (key2) => rows.reduce((s, r) => s + (Number(r[key2]) || 0), 0);
  const summary = {
    total,
    prestigeAny: count((r) => r.prestige > 0),
    godStatueAny: count((r) => r.god_statue_sent > 0),
    godStatueComplete: count((r) => r.god_statue_completed),
    maouDefeated: count((r) => r.maou_defeated),
    castleUnlocked: count((r) => r.castle_unlocked),
    endlessUnlocked: count((r) => r.endless_mode_unlocked),
    totalDungeonStarts: sum('dungeon_starts'),
    totalTypedKeys: sum('total_correct'),
    ptTamperFlagged: count((r) => r.pt_tamper_flag),
  };

  const highlights = [
    { label: '最高レベル', row: maxRow(rows, 'progress'), fmt: (r) => `${r.progress}` },
    { label: '最大所持pt', row: maxRow(rows, 'pt'), fmt: (r) => `${fmtNum(r.pt)}pt` },
    { label: '最大総獲得pt', row: maxRow(rows, 'total_pt_earned'), fmt: (r) => `${fmtNum(r.total_pt_earned)}pt` },
    { label: '最長プレイ時間', row: maxRow(rows, 'total_play_time_min'), fmt: (r) => `${fmtNum(r.total_play_time_min)}分` },
  ];
  const highlightCards = highlights.filter((h) => h.row).map((h) => `
    <div class="highlight">
      <div class="highlight-label">${h.label}</div>
      <div class="highlight-value">${h.fmt(h.row)}</div>
      <div class="highlight-name">${escapeHtml(h.row.player_name || '')}</div>
    </div>`).join('');

  const funnelCounts = {};
  Object.keys(FUNNEL_LABELS).forEach((id) => { funnelCounts[id] = 0; });
  rows.forEach((r) => {
    let reached = [];
    try { reached = JSON.parse(r.funnels_reached || '[]'); } catch (e) { reached = []; }
    reached.forEach((id) => { if (funnelCounts[id] !== undefined) funnelCounts[id] += 1; });
  });
  const funnelRowHtml = (id) => `<tr data-funnel-id="${id}">
    <td><label><input type="checkbox" value="${id}"> ${id}</label></td>
    <td>${escapeHtml(FUNNEL_LABELS[id])}</td>
    <td data-count="${funnelCounts[id]}">${funnelCounts[id]}</td>
  </tr>`;
  const funnelRowsPhase1 = Object.keys(FUNNEL_LABELS).filter((id) => id.startsWith('1-')).map(funnelRowHtml).join('');
  const funnelRowsPhase2 = Object.keys(FUNNEL_LABELS).filter((id) => id.startsWith('2-')).map(funnelRowHtml).join('');

  const tableRows = rows.map((r) => `<tr
    data-progress="${r.progress}"
    data-disciple_total_params="${r.disciple_total_params}" data-castle_progress="${r.castle_progress}"
    data-junkyard_draws="${r.junkyard_draws}"
    data-pt="${r.pt}" data-total_pt_earned="${r.total_pt_earned}" data-total_correct="${r.total_correct}"
    data-dungeon_starts="${r.dungeon_starts}" data-total_play_time_min="${r.total_play_time_min}"
    data-updated_at="${r.updated_at}">
    <td>${escapeHtml(r.player_name || '')}${r.pt_tamper_flag ? ' <span title="pt改ざんの疑いあり">⚠️</span>' : ''}</td>
    <td>${r.progress}</td>
    <td>${r.god_statue_completed ? '✅' : ''}</td>
    <td>${r.garden_restorations >= 20 ? '✅' : ''}</td>
    <td>${r.disciple_total_params}</td>
    <td>${r.maou_defeated ? '✅' : ''}</td>
    <td>${r.castle_unlocked ? `${Math.min(100, (r.castle_progress / CASTLE_BUILD_TOTAL) * 100).toFixed(1)}%` : ''}</td>
    <td>${r.junkyard_draws >= JUNKYARD_POOL_TOTAL ? '✅' : `${fmtNum(r.junkyard_draws)}/${JUNKYARD_POOL_TOTAL}`}</td>
    <td>${r.endless_mode_unlocked ? '✅' : ''}</td>
    <td>${fmtNum(r.pt)}</td>
    <td>${fmtNum(r.total_pt_earned)}</td>
    <td>${fmtNum(r.total_correct)}</td>
    <td>${fmtNum(r.dungeon_starts)}</td>
    <td>${fmtNum(r.total_play_time_min)}分</td>
    <td>${new Date(r.updated_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</td>
  </tr>`).join('');

  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>プレイヤー進捗</title>
<style>
  body { background:#0c0e17; color:#eef0ff; font-family:sans-serif; padding:20px; }
  h1 { display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:8px; font-size:1.3rem; }
  .corner-stats { font-size:0.9rem; font-weight:normal; display:flex; gap:16px; }
  .corner-stats b { color:#7c8cff; }
  table { border-collapse: collapse; width: 100%; font-size: 0.85rem; margin-bottom:24px; }
  th, td { border: 1px solid #33375a; padding: 4px 8px; text-align: right; }
  th:first-child, td:first-child, th:nth-child(2), td:nth-child(2) { text-align: left; }
  th { background: #1a1d2e; position: sticky; top: 0; cursor: default; }
  th[data-sort] { cursor: pointer; user-select: none; }
  th[data-sort]:hover { color: #7c8cff; }
  .summary, .highlights { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
  .summary div, .highlights .highlight { background: #1a1d2e; border: 1px solid #33375a; border-radius: 8px; padding: 8px 14px; }
  .highlight-label { font-size: 0.75rem; color: #9aa0c0; }
  .highlight-value { font-size: 1.1rem; font-weight: 700; color: #7c8cff; }
  .highlight-name { font-size: 0.75rem; }
  .funnel-tables { display: flex; gap: 16px; flex-wrap: wrap; }
  #funnelTable, #funnelTable2 { max-width: 480px; flex: 1 1 480px; margin-bottom: 24px; }
  #funnelTable td:nth-child(3), #funnelTable2 td:nth-child(3) { text-align: right; }
  .funnel-controls { margin-bottom: 8px; font-size: 0.85rem; }
  .funnel-controls a { color: #7c8cff; cursor: pointer; }
  h2 { font-size: 1.05rem; margin-top: 0; }
</style>
</head>
<body>
<h1>
  <span>プレイヤー進捗（総数: ${summary.total}）</span>
  <span class="corner-stats">
    <span>タイピング開始回数: <b>${fmtNum(summary.totalDungeonStarts)}</b></span>
    <span>総タイピング数: <b>${fmtNum(summary.totalTypedKeys)}</b></span>
  </span>
</h1>
<div class="highlights">${highlightCards}</div>
<div class="summary">
  <div>転生経験者: ${summary.prestigeAny}</div>
  <div>女神像送付経験者: ${summary.godStatueAny}</div>
  <div>女神像完全復興: ${summary.godStatueComplete}</div>
  <div>魔王討伐: ${summary.maouDefeated}</div>
  <div>城建築解放: ${summary.castleUnlocked}</div>
  <div>Endless解放: ${summary.endlessUnlocked}</div>
  <div>⚠️ pt改ざん疑いあり: ${summary.ptTamperFlagged}</div>
</div>

<h2>ファネル到達状況</h2>
<div class="funnel-controls"><a id="showAllFunnels">すべて表示に戻す</a></div>
<div class="funnel-tables">
  <table id="funnelTable">
  <thead><tr><th>ID（外す）</th><th>内容</th><th>到達人数</th></tr></thead>
  <tbody>${funnelRowsPhase1}</tbody>
  </table>
  <table id="funnelTable2">
  <thead><tr><th>ID（外す）</th><th>内容</th><th>到達人数</th></tr></thead>
  <tbody>${funnelRowsPhase2}</tbody>
  </table>
</div>

<h2>プレイヤー一覧（列見出しクリックで並べ替え）</h2>
<div class="funnel-controls"><label><input type="checkbox" id="hideLowLevelToggle"> Lv5以下のプレイヤーを非表示</label></div>
<table id="playerTable">
<thead><tr>
  <th>名前</th><th data-sort="progress">Lv</th><th>女神像</th>
  <th>園復興</th><th data-sort="disciple_total_params">弟子params</th><th>魔王討伐</th><th data-sort="castle_progress">城進捗</th>
  <th data-sort="junkyard_draws">ジャンクヤード進捗</th>
  <th>Endless</th><th data-sort="pt">所持pt</th><th data-sort="total_pt_earned">総獲得pt</th>
  <th data-sort="total_correct">総タイプ数</th><th data-sort="dungeon_starts">開始回数</th>
  <th data-sort="total_play_time_min">総プレイ時間</th><th data-sort="updated_at">最終更新</th>
</tr></thead>
<tbody>${tableRows}</tbody>
</table>

<script>
(function () {
  var tbody = document.querySelector('#playerTable tbody');
  var dir = {};
  document.querySelectorAll('#playerTable th[data-sort]').forEach(function (th) {
    th.addEventListener('click', function () {
      var key = th.getAttribute('data-sort');
      dir[key] = dir[key] === 'asc' ? 'desc' : 'asc';
      var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
      rows.sort(function (a, b) {
        var av = parseFloat(a.getAttribute('data-' + key)) || 0;
        var bv = parseFloat(b.getAttribute('data-' + key)) || 0;
        return dir[key] === 'asc' ? av - bv : bv - av;
      });
      rows.forEach(function (r) { tbody.appendChild(r); });
    });
  });

  var STORAGE_KEY = 'progressHiddenFunnels';
  var hidden = [];
  try { hidden = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) { hidden = []; }
  function applyHidden() {
    document.querySelectorAll('#funnelTable tr[data-funnel-id], #funnelTable2 tr[data-funnel-id]').forEach(function (tr) {
      tr.style.display = hidden.indexOf(tr.getAttribute('data-funnel-id')) !== -1 ? 'none' : '';
    });
  }
  document.querySelectorAll('#funnelTable input[type=checkbox], #funnelTable2 input[type=checkbox]').forEach(function (cb) {
    cb.checked = hidden.indexOf(cb.value) === -1;
    cb.addEventListener('change', function () {
      var idx = hidden.indexOf(cb.value);
      if (cb.checked && idx !== -1) hidden.splice(idx, 1);
      if (!cb.checked && idx === -1) hidden.push(cb.value);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hidden));
      applyHidden();
    });
  });
  document.getElementById('showAllFunnels').addEventListener('click', function () {
    hidden = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hidden));
    document.querySelectorAll('#funnelTable input[type=checkbox], #funnelTable2 input[type=checkbox]').forEach(function (cb) { cb.checked = true; });
    applyHidden();
  });
  applyHidden();

  var LOW_LEVEL_KEY = 'progressHideLowLevel';
  var hideLowLevel = localStorage.getItem(LOW_LEVEL_KEY) === '1';
  var lowLevelToggle = document.getElementById('hideLowLevelToggle');
  function applyLowLevelFilter() {
    document.querySelectorAll('#playerTable tbody tr').forEach(function (tr) {
      if (hideLowLevel && (parseFloat(tr.getAttribute('data-progress')) || 0) <= 5) {
        tr.style.display = 'none';
      } else {
        tr.style.display = '';
      }
    });
  }
  lowLevelToggle.checked = hideLowLevel;
  lowLevelToggle.addEventListener('change', function () {
    hideLowLevel = lowLevelToggle.checked;
    localStorage.setItem(LOW_LEVEL_KEY, hideLowLevel ? '1' : '0');
    applyLowLevelFilter();
  });
  applyLowLevelFilter();
})();
</script>
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
