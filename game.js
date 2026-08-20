const SAVE_KEY = 'typingDungeonSave';

const DUNGEONS = {
  word: { label: '単語の間', expFactor: 1, bank: WORD_BANK },
  sentence: { label: '文章の回廊', expFactor: 1.5, bank: SENTENCE_BANK },
  long: { label: '長文の塔', expFactor: 2, bank: LONG_BANK },
};

const LANG_LABELS = { jp: '日本語', en: 'English' };
const ANNOUNCEMENT_HISTORY_MAX = 500;

const SECRET_KEYBOARD_LINES = [
  'よくこんなくだらない所をクリックしたね',
  'じゃあついでにくだらない話をひとつ',
  'タイピングがスゴい大好きなんです',
  '好きなんだけど……なんか違うって',
  'タイピングが目的のゲームばっかりで',
  'タイピングをすることで何かが起こるゲームが欲しくて',
  '思いつきで開発をスタートしました',
  '放置ゲーとかインフレゲーも好きなんです',
  'でも、タイピングを主軸にしたい',
  '何をするにもタイピングが起点であってほしい',
  'そう考えると設計は意外と困難を極めまして',
  'あれやこれや総当たりで考えてみて',
  'こんなゲームデザインになりました',
  'ちょっと昔のゲームみたいな考えですよね',
  '例えば最初は何をしたら良いか分からない',
  'でもタイピングをしてももらえるｐｔは僅か',
  'どうしたらいいんだろう？',
  '弟子ってなんだろう？',
  'ショップを覗くと装備品で一番高いのは指輪',
  'レア出現率ってなんだろう？',
  '弟子のところに連勝数が記録されてるな',
  'じゃあ、連勝したら何か有るのかな？',
  'こういう手触り一つ一つが理解を深めていく',
  '不親切だけどそこには手が加わっていて',
  '少しずつゲームデザインを理解する',
  'そんなゲームを創りたかったんです',
  'このゲームの数値におけるデザインにおいて',
  '一切計算をしていません',
  '全てテストプレイの中で実際の体感を得て',
  'こういうゲームが好きだなーって思えるように',
  '数値を一つ一つ調整しながらテストプレイ',
  'このゲームを一番プレイしているのは間違いなく私',
  'でもおかげで本当に欲しかったゲームに',
  'なってくれた気がしました。',
  '昔タイピングゲームを探しているときに',
  'こういうゲームがやりたいんだよなぁって思っても',
  'どこにもなくて',
  'じゃあ創ればいいじゃん！って乱暴な考えから',
  'ここまで形になるとは思いませんでした',
  '少しでも楽しんでくれているなら',
  '楽しいと思いながら是非ともタイピングを',
  '学んでもらえたら嬉しいです',
  '実際に私もテストプレイしていて感じたのですが',
  '全く苦痛なくタイプスピードが上がった気がします',
  'だからあなたにもそんな効果があったら良いなって',
  '楽しみながらどんどん主人公達を強くしてください',
  'りんご',
  'ごりら',
  'らっぱ',
  'ぱんぱーす',
  'スリランカ',
  'カモメ',
  'メンタリスト',
  'トマト',
  'トラックボールマウス',
  'スキマスイッチ',
  'あ、しりとりです',
  'もう書くことが無いんですよ',
  'あなたも意地っ張りですね',
  'まだ文字が出ると思ってクリックしてますよね？',
  '世の中そんなに親切じゃないんですよ',
  'そろそろ諦めませんか？',
  'そう何回もクリックしてる暇があるなら',
  'タイピングした方が良いですよ',
  '技術も向上しますし',
  'キャラクターも強くなりますし',
  'んー。でもクリックしてくれてるしなぁ。',
  '申し訳無い気持ちなので',
  'ちょっとした豆知識を教えますね',
  'このゲームの様々な在庫は大体が獲得EXPで',
  '得られるようになっています。',
  '弟子のハートとか、ショップのしあわせ草とか',
  '最初のうちはしあわせ草の在庫があれば買って',
  'ちゃっちゃとレベルアップするとよいですよ',
  'ただし獲得EXPはあくまでタイピング時のみ',
  'しあわせ草をいくら食べてもハートは回復しません',
  'あしからず',
  'あくまでタイピングゲーであってクリックゲーじゃないので',
  'そこいらはご愛敬ということでお許し下さい',
  '…………',
  'まだクリックします？',
  'もう良くないですか？',
  '知ってます？',
  'あなたもう84回クリックしてるんですよ',
  '恐らくですが相当愚かな時間ですよ',
  'もっとやれた事あるはずなのに',
  'もういいじゃないですか',
  'ねぇ？',
  'ミスリードじゃないってば',
  '分かりました。',
  'カウントしてるってことはつまり',
  '何か意味があるとお思いですね？',
  'こわいこわい',
  'こんな機能実装しなければ良かった',
  '分かりました',
  '報酬をちゃんと用意しますので',
  'これにて勘弁して下さい',
  'くだらない機能にお付き合い頂いて',
  '本当にありがとうございました。',
];

const CHANGELOG = [
  {
    version: 'Beta0.61',
    items: [
      '初回起動時にヘルプが起動するようにしました。また右上でいつでもヘルプを起動することが出来ます。',
    ],
  },
  {
    version: 'Beta0.6',
    items: [
      'ロゴを実装しました。',
      'メインシナリオに関する内容をアップデートしました。',
    ],
  },
  {
    version: 'Beta0.59',
    items: [
      '永続コンボが有効になっている状態で永続コンボをクリックすると、コンボ、ミスカウントがリセットされるようになりました。',
    ],
  },
  {
    version: 'Beta0.58',
    items: [
      '特定の条件を満たすと永続コンボシステムを開放するアイテムがショップに並ぶようになりました。',
    ],
  },
  {
    version: 'Beta0.57',
    items: [
      '特定挙動においてセーブデータがロールバックしてしまう不具合を解消しました。',
    ],
  },
  {
    version: 'Beta0.56',
    items: [
      'くだらないギミックとそれに伴う実績を実装しました',
    ],
  },
  {
    version: 'Beta0.55',
    items: [
      '一部文字の修正を実施しました。',
      '長文の塔における表示の問題を修正しました。',
      'UIにおける快適性を向上させました。',
    ],
  },
  {
    version: 'Beta0.54',
    items: [
      'タイピング中の獲得pt・獲得EXP表示に桁区切り（カンマ）を追加し、見やすく改善',
    ],
  },
  {
    version: 'Beta0.53',
    items: [
      '設定の機能を追加しました。',
      'セーブデータの機能は設定に移動しました。',
      'キー長押しに関する不具合を修正',
    ],
  },
  {
    version: 'Beta0.52',
    items: [
      'レベルアップのお知らせを改善：ダンジョン挑戦中に複数レベル上がった場合、まとめて1件（Lv.X→Lv.Y）で表示するように修正',
    ],
  },
  {
    version: 'Beta0.51',
    items: [
      'お知らせ履歴（💬）を追加：過去のお知らせを一覧で確認できます',
      'アップデート履歴（📰）を追加：このウィンドウです',
    ],
  },
  {
    version: 'Beta0.5',
    items: [
      'バグ修正・バランス調整を実施',
      'タイピング単語数を大幅に増加',
      'UI表示・演出まわりを改善',
      '新しい要素を複数追加（詳しくは遊んで確認してみてください）',
    ],
  },
];

const GOD_STATUE_RESTORE_COST = 10000;
const GOD_STATUE_MAX = 100;
const GOD_STATUE_MAX_SENT = 100;
const GOD_STATUE_HEART_COST_FLOOR = 75;
const GOD_STATUE_RARE_BONUS_CAP = 0.50;
const PRESTIGE_RARE_BONUS_PER = 0.01;
const PRESTIGE_RARE_BONUS_CAP = 0.10;
const HAPPY_GRASS_EXP_PER_STOCK = 500;
const HAPPY_GRASS_MAX_STOCK = 99;
const GOD_GARDEN_RESTORE_COST = 10000000;
const GOD_GARDEN_MAX_RESTORATIONS = 20;
const GOD_GARDEN_EMBLEM_BONUS_PER = 0.001;
const GOD_BLESSING_COST = 100000000;
const GOD_BLESSING_SHARD_BONUS_PER = 10;
const GOD_BLESSING_MAX_COUNT = 10;
const GOD_BLESSING_MAX_SHARD_BONUS = 100;
const GOD_BLESSING_MAX_WORD_BONUS = { word: 0.05, sentence: 0.2, long: 0.3 };
const RICO_PRAYER_CHARGE_SUPER_THRESHOLD = 10;
const RICO_PRAYER_CHARGE_WORD_BONUS = { word: 0.05, sentence: 0.2, long: 0.3 };
const MAOU_EMBLEM_BASE_CHANCE = 0.001;
const MAOU_EMBLEM_REQUIRED = 100;
const MAOU_EMBLEM_WORD_CHANCE = { sentence: 0.1, long: 0.4 };
const DISCIPLE_CLASS_UP_THRESHOLD = 1000;

const GOD_STATUE_BUFFS = [
  { id: 'exp_boost', name: '経験の祝福', desc: 'EXPが永続的に+20%' },
  { id: 'heart_cost_down', name: '心の泉', desc: 'ハート獲得に必要なEXPが-10（最大75まで軽減）' },
  { id: 'rare_luck', name: '幸運の女神', desc: 'レアモンスター出現率+1%（このボーナスで最大+50%まで）' },
];

const DISCIPLE_ICONS = ['🧑', '👨', '👩', '🧔', '👱', '🧒', '👴', '👵', '🥷', '🧝'];
const DISCIPLE_OPPONENT_ICONS = ['👹', '👺', '💀', '🐍', '🦂', '🦇', '🧟', '🐺', '🐉', '👻'];
const DISCIPLE_HEART_MAX = 99;
const DISCIPLE_HEART_INDIVIDUAL_LIMIT = 20;
const DISCIPLE_HEART_EXP_COST = 150;
const DISCIPLE_TIERS = [
  { key: 'weak', label: '弱', reward: 100, budgetRange: [3, 8], streakBonus: 100 },
  { key: 'normal', label: '普', reward: 300, budgetRange: [10, 20], streakBonus: 200 },
  { key: 'strong', label: '強', reward: 500, budgetRange: [28, 50], streakBonus: 300 },
];
const DISCIPLE_STREAK_STEP = 10;
const DISCIPLE_STAT_DEFS = [
  { key: 'hp', label: 'HP' },
  { key: 'str', label: 'STR' },
  { key: 'dex', label: 'DEX' },
  { key: 'spd', label: 'SPD' },
];
const DISCIPLE_BULK_THRESHOLDS = [
  { count: 5, minTotal: 200 },
  { count: 10, minTotal: 1000 },
];

const RICO_FIELD = { sword: 'value', shield: 'expBonus', armor: 'comboSeconds', ring: 'rareChanceBonus' };
const RICO_BASE_VALUE = { sword: 0.01, shield: 0.01, armor: 2, ring: 0.01 };
const RICO_INCREMENT = { sword: 0.01, shield: 0.01, armor: 0.1, ring: 0.01 };
const RICO_STRENGTHEN_BASE_COST = { sword: 20, shield: 20, armor: 20, ring: 20 };
const RICO_MAX_VALUE = { sword: 2.00, shield: 2.00, armor: 18, ring: 0.20 };
const RICO_STRENGTHEN_GROWTH = { sword: 1.03003, shield: 1.03003, armor: 1.03753, ring: 1.38464 };
const COMPLETION_TABS = ['sword', 'shield', 'armor', 'ring', 'title', 'icon'];
const RICO_MET_EMBLEM_BONUS = 0.005;
const RICO_PRAYER_COST = 50000;
const RICO_PRAYER_EMBLEM_BONUS = 0.05;
const RICO_PRAYER_MAX_CHARGES = 99;
const MAOU_SEAL_UNLOCK_PRAYER_COUNT = 10;
const MAOU_SEAL_CRAFT_COST = 100;
const MAOU_SEAL_REDUCTION_PER = 10;

function defaultSave() {
  return {
    pt: 0,
    totalPtEarned: 0,
    totalPtSpent: 0,
    profile: { name: 'Typer', icon: '🗡️', cardDesign: 'default', iconFrame: 'none' },
    equipment: { swordId: null, shieldId: null, armorId: 'armor_cloth', ringId: null, titleFrontId: null, titleBackId: null, titleConnectiveId: 'conn_no', bgmId: 'bgm_default' },
    inventory: { swords: [], shields: [], armors: ['armor_cloth'], rings: [], titleFronts: [], titleBacks: [], icons: [], consumables: {}, bgm: ['bgm_default'] },
    godStatue: { restoration: 0, sent: 0, completed: false, gardenRestorations: 0, goddessBlessingCount: 0 },
    godStatueBuffs: { expBoostStacks: 0, heartCostReduction: 0, rareBonusStacks: 0 },
    disciple: {
      name: '弟子',
      icon: '🧑',
      hp: 10,
      str: 1,
      dex: 1,
      spd: 1,
      upgrades: { hp: 0, str: 0, dex: 0, spd: 0 },
      hearts: 5,
      heartExpProgress: 0,
      battleWins: 0,
      battleCount: 0,
      ptSpent: 0,
      ptEarned: 0,
      strengthenCount: 0,
      streaks: { weak: 0, normal: 0, strong: 0 },
      bulkUnlocked: { 5: false, 10: false },
      heartVesselOwned: false,
      heartVesselAnnounced: false,
      classUpped: false,
    },
    maouEmblems: 0,
    maouGateRevealed: false,
    maouSealUnlocked: false,
    maouSealCount: 0,
    ricoShardsEarned: 0,
    ricoTabletFound: false,
    ricoMet: false,
    maouPrayerCharges: 0,
    maouPrayerCount: 0,
    maouDefeated: false,
    emptyPrayerClicks: 0,
    helpPopupSeen: false,
    helpManualOpens: 0,
    godGardenHintShown: false,
    prestigeAwakened: false,
    prestigeAwakenedTiers: [],
    level: 1,
    maxLevelReached: 1,
    exp: 0,
    prestige: 0,
    muted: false,
    settings: { bgmVolume: 50, seVolume: 50, typingFrame: 'none' },
    secretKeyboardClicks: 0,
    eternalComboUnlocked: false,
    mechanicalEggOwned: false,
    eternalCombo: 0,
    eternalComboMisses: 0,
    eternalComboMax: 0,
    eternalComboHeartMilestone: 0,
    reincarnationNecklaceAnnounced: false,
    batchBattleAnnounced: false,
    itemPurchaseCounts: {},
    playCount: 0,
    completedRuns: 0,
    abortCount: 0,
    totalKeystrokes: 0,
    totalTypingTimeMs: 0,
    totalCorrect: 0,
    totalMistakes: 0,
    totalWordsCompleted: 0,
    rareMonstersDefeated: 0,
    happyGrassStock: 0,
    happyGrassExpProgress: 0,
    bestKpm: 0,
    kpmSum: 0,
    bestCombo: 0,
    bestRank: null,
    rankIndexSum: 0,
    bestRankByKey: {},
    dungeonPlayCounts: { word: 0, sentence: 0, long: 0 },
    missHeatmap: {},
    history: [],
    announcements: [],
    ricoUnlocked: false,
    ricoShards: 0,
    ricoLevels: { sword: 0, shield: 0, armor: 0, ring: 0 },
  };
}

function normalizeSave(raw) {
  const base = defaultSave();
  return {
    ...base,
    ...raw,
    maxLevelReached: Math.max(raw.maxLevelReached || 1, raw.level || 1),
    prestigeAwakenedTiers: raw.prestigeAwakenedTiers
      ? raw.prestigeAwakenedTiers
      : PRESTIGE_AWAKENING_TIERS.filter((t) => (raw.prestige || 0) >= t.at).map((t) => t.at),
    godGardenHintShown: !!(raw.godGardenHintShown || (raw.godStatue && raw.godStatue.gardenRestorations >= GOD_GARDEN_MAX_RESTORATIONS)),
    ricoTabletFound: !!(raw.ricoTabletFound || raw.ricoMet),
    profile: { ...base.profile, ...(raw.profile || {}) },
    equipment: { ...base.equipment, ...(raw.equipment || {}), bgmId: (raw.equipment && raw.equipment.bgmId) || 'bgm_default' },
    godStatue: { ...base.godStatue, ...(raw.godStatue || {}) },
    godStatueBuffs: { ...base.godStatueBuffs, ...(raw.godStatueBuffs || {}) },
    disciple: {
      ...base.disciple,
      ...(raw.disciple || {}),
      upgrades: { ...base.disciple.upgrades, ...((raw.disciple && raw.disciple.upgrades) || {}) },
      streaks: { ...base.disciple.streaks, ...((raw.disciple && raw.disciple.streaks) || {}) },
      bulkUnlocked: { ...base.disciple.bulkUnlocked, ...((raw.disciple && raw.disciple.bulkUnlocked) || {}) },
    },
    inventory: {
      swords: (raw.inventory && raw.inventory.swords) || [],
      shields: (raw.inventory && raw.inventory.shields) || [],
      armors: (raw.inventory && raw.inventory.armors) || ['armor_cloth'],
      rings: (raw.inventory && raw.inventory.rings) || [],
      titleFronts: (raw.inventory && raw.inventory.titleFronts) || [],
      titleBacks: (raw.inventory && raw.inventory.titleBacks) || [],
      icons: (raw.inventory && raw.inventory.icons) || [],
      consumables: (raw.inventory && raw.inventory.consumables) || {},
      bgm: [...new Set(['bgm_default', ...((raw.inventory && raw.inventory.bgm) || [])])],
    },
    dungeonPlayCounts: { ...base.dungeonPlayCounts, ...(raw.dungeonPlayCounts || {}) },
    bestRankByKey: { ...(raw.bestRankByKey || {}) },
    missHeatmap: { ...(raw.missHeatmap || {}) },
    history: raw.history || [],
    announcements: raw.announcements || [],
    ricoLevels: { ...base.ricoLevels, ...(raw.ricoLevels || {}) },
    settings: { ...base.settings, ...(raw.settings || {}) },
  };
}

const SAVE_CIPHER_KEY = 'TypingDungeon-Rico-2026-Save-Cipher-v1';

function xorBytes(bytes, keyStr) {
  const keyBytes = new TextEncoder().encode(keyStr);
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
  return out;
}

function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function encodeSaveData(obj) {
  const jsonBytes = new TextEncoder().encode(JSON.stringify(obj));
  return bytesToBase64(xorBytes(jsonBytes, SAVE_CIPHER_KEY));
}

function decodeSaveData(encoded) {
  const jsonBytes = xorBytes(base64ToBytes(encoded), SAVE_CIPHER_KEY);
  return JSON.parse(new TextDecoder().decode(jsonBytes));
}

function loadSave() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return defaultSave();
  try {
    return normalizeSave(decodeSaveData(raw));
  } catch (e) {
    try {
      return normalizeSave(JSON.parse(raw));
    } catch (e2) {
      return defaultSave();
    }
  }
}

function persistSave() {
  localStorage.setItem(SAVE_KEY, encodeSaveData(save));
}

function exportSaveString() {
  return JSON.stringify({ app: 'typing-dungeon', version: 2, exportedAt: Date.now(), data: encodeSaveData(save) }, null, 2);
}

function downloadSaveFile() {
  const text = exportSaveString();
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `typing-dungeon-save-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importSaveFromText(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    window.alert('セーブデータの読み込みに失敗しました（JSON形式が正しくありません）');
    return false;
  }
  let raw = null;
  if (parsed && typeof parsed === 'object') {
    if (typeof parsed.data === 'string') {
      try {
        raw = decodeSaveData(parsed.data);
      } catch (e) {
        raw = null;
      }
    } else if (parsed.save) {
      raw = parsed.save;
    } else {
      raw = parsed;
    }
  }
  if (!raw || typeof raw !== 'object') {
    window.alert('セーブデータの読み込みに失敗しました（形式が正しくありません）');
    return false;
  }
  const ok = window.confirm('現在のセーブデータを上書きします。よろしいですか？');
  if (!ok) return false;
  save = normalizeSave(raw);
  persistSave();
  window.alert('セーブデータを読み込みました');
  location.reload();
  return true;
}

const SFX = {
  ctx: null,
  noiseBuffer: null,
  ensure() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    return this.ctx;
  },
  getNoiseBuffer() {
    const ctx = this.ensure();
    if (!this.noiseBuffer) {
      const size = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  },
  volumeMul() {
    const v = save.settings && typeof save.settings.seVolume === 'number' ? save.settings.seVolume : 50;
    return v / 50;
  },
  tone(freq, dur, type = 'sine', gain = 0.05) {
    if (save.muted) return;
    const ctx = this.ensure();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(g).connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.setValueAtTime(Math.max(0.0001, gain * this.volumeMul()), now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.start(now);
    osc.stop(now + dur);
  },
  noiseBurst(dur, filterFreq, gain) {
    if (save.muted) return;
    const ctx = this.ensure();
    const src = ctx.createBufferSource();
    src.buffer = this.getNoiseBuffer();
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 1.2;
    const g = ctx.createGain();
    src.connect(filter).connect(g).connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.setValueAtTime(Math.max(0.0001, gain * this.volumeMul()), now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.start(now);
    src.stop(now + dur);
  },
  correct() {
    this.noiseBurst(0.07, 3200, 0.05);
    this.tone(1500, 0.05, 'triangle', 0.03);
  },
  incorrect() {
    if (save.muted) return;
    const ctx = this.ensure();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'square';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
    g.gain.setValueAtTime(Math.max(0.0001, 0.06 * this.volumeMul()), now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    osc.connect(g).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  },
  comboBonus() {
    [880, 1108, 1318].forEach((f, i) => {
      setTimeout(() => this.tone(f, 0.25, 'sine', 0.05), i * 70);
    });
  },
  rare() {
    [660, 880, 1108, 1318, 1568].forEach((f, i) => {
      setTimeout(() => this.tone(f, 0.2, 'triangle', 0.06), i * 60);
    });
  },
  complete() {
    this.tone(900, 0.09, 'triangle', 0.06);
    setTimeout(() => this.tone(1200, 0.12, 'triangle', 0.06), 70);
  },
  prestige() {
    [440, 660, 880, 1100, 1320, 1500].forEach((f, i) => {
      setTimeout(() => this.tone(f, 0.15, 'sawtooth', 0.05), i * 80);
    });
  },
  playFile(path, gain = 1) {
    if (save.muted) return;
    const audio = new Audio(encodeURI(path));
    audio.volume = Math.max(0, Math.min(1, gain * this.volumeMul()));
    audio.play().catch(() => {});
  },
  maouDefeatSlash() {
    this.playFile('SE/刀で斬る2.mp3');
  },
  maouVictorySlash() {
    this.playFile('SE/大剣で斬る.mp3');
  },
};

function getEquippedBgmTrack() {
  const track = BGM_CATALOG.find((t) => t.id === save.equipment.bgmId);
  return track && track.file ? track : null;
}

const BGM = {
  gainNode: null,
  timer: null,
  patterns: {
    word: { notes: [523, 659, 784, 659, 523, 392, 523, 659], step: 220 },
    sentence: { notes: [440, 523, 587, 523, 440, 392, 349, 392], step: 260 },
    long: { notes: [220, 262, 220, 196, 220, 262, 294, 262], step: 320 },
  },
  volumeMul() {
    const v = save.settings && typeof save.settings.bgmVolume === 'number' ? save.settings.bgmVolume : 50;
    return v / 50;
  },
  ensureGain() {
    const ctx = SFX.ensure();
    if (!this.gainNode) {
      this.gainNode = ctx.createGain();
      this.gainNode.connect(ctx.destination);
    }
    this.gainNode.gain.value = 0.03 * this.volumeMul();
    return this.gainNode;
  },
  playNote(freq, dur) {
    const ctx = SFX.ensure();
    const gainNode = this.ensureGain();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(g).connect(gainNode);
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(1, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.start(now);
    osc.stop(now + dur + 0.05);
  },
  start(mode) {
    this.stop();
    if (save.muted) return;
    const track = getEquippedBgmTrack();
    if (track) {
      const audio = el.customBgmAudio;
      if (audio.dataset.trackId !== track.id) {
        audio.src = encodeURI(track.file);
        audio.dataset.trackId = track.id;
      }
      audio.loop = true;
      audio.volume = Math.min(1, 0.35 * this.volumeMul());
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }
    const pattern = this.patterns[mode] || this.patterns.word;
    let i = 0;
    this.playNote(pattern.notes[0], pattern.step / 1000);
    this.timer = setInterval(() => {
      i = (i + 1) % pattern.notes.length;
      if (!save.muted) this.playNote(pattern.notes[i], pattern.step / 1000);
    }, pattern.step);
  },
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (el.customBgmAudio && !el.customBgmAudio.paused) {
      el.customBgmAudio.pause();
    }
  },
};

let save = loadSave();
let currentLang = 'jp';
let currentMode = 'word';
let currentDuration = 60;
let session = null;
let screen = 'home';
let timerHandle = null;
let levelAtSessionStart = 1;
let sessionPtEarned = 0;
let sessionMaouPrayerBonus = 0;
let sessionPrayerSuperActive = false;
let currentShopTab = 'sword';
let awaitingStart = false;

const el = {
  totalPt: document.getElementById('totalPt'),
  topbar: document.getElementById('topbar'),
  secretKeyboardIcon: document.getElementById('secretKeyboardIcon'),
  topLogo: document.getElementById('topLogo'),
  homeLogo: document.getElementById('homeLogo'),
  muteBtn: document.getElementById('muteBtn'),
  screens: {
    home: document.getElementById('screen-home'),
    game: document.getElementById('screen-game'),
    result: document.getElementById('screen-result'),
    stats: document.getElementById('screen-stats'),
    history: document.getElementById('screen-history'),
    shop: document.getElementById('screen-shop'),
    maou: document.getElementById('screen-maou'),
  },
  playerCard: document.getElementById('playerCard'),
  profileIconBtn: document.getElementById('profileIconBtn'),
  iconPicker: document.getElementById('iconPicker'),
  playerName: document.getElementById('playerName'),
  renameBtn: document.getElementById('renameBtn'),
  playerTitle: document.getElementById('playerTitle'),
  achievementIcons: document.getElementById('achievementIcons'),
  playerLevel: document.getElementById('playerLevel'),
  playerPrestige: document.getElementById('playerPrestige'),
  expBarFill: document.getElementById('expBarFill'),
  expText: document.getElementById('expText'),
  ptMultiplier: document.getElementById('ptMultiplier'),
  prestigeBtn: document.getElementById('prestigeBtn'),
  equipmentSummary: document.getElementById('equipmentSummary'),
  godStatueArt: document.getElementById('godStatueArt'),
  godStatueBarFill: document.getElementById('godStatueBarFill'),
  godStatueText: document.getElementById('godStatueText'),
  godStatueSent: document.getElementById('godStatueSent'),
  godStatueBtn: document.getElementById('godStatueBtn'),
  godStatuePanel: document.getElementById('godStatuePanel'),
  godGardenPanel: document.getElementById('godGardenPanel'),
  godGardenText: document.getElementById('godGardenText'),
  godGardenBtn: document.getElementById('godGardenBtn'),
  godBlessingRow: document.getElementById('godBlessingRow'),
  godBlessingText: document.getElementById('godBlessingText'),
  godBlessingBtn: document.getElementById('godBlessingBtn'),
  godGardenHintBtn: document.getElementById('godGardenHintBtn'),
  maouGatePanel: document.getElementById('maouGatePanel'),
  maouGateText: document.getElementById('maouGateText'),
  openMaouBtn: document.getElementById('openMaouBtn'),
  maouCastleText: document.getElementById('maouCastleText'),
  maouSealCountText: document.getElementById('maouSealCountText'),
  maouCraftSealBtn: document.getElementById('maouCraftSealBtn'),
  maouAttackBtn: document.getElementById('maouAttackBtn'),
  maouBackBtn: document.getElementById('maouBackBtn'),
  maouBackRow: document.getElementById('maouBackRow'),
  maouEntrancePanel: document.getElementById('maouEntrancePanel'),
  maouBattlePanel: document.getElementById('maouBattlePanel'),
  maouRollHp: document.getElementById('maouRollHp'),
  maouRollStr: document.getElementById('maouRollStr'),
  maouRollDex: document.getElementById('maouRollDex'),
  maouRollSpd: document.getElementById('maouRollSpd'),
  maouHpFill: document.getElementById('maouHpFill'),
  maouHpText: document.getElementById('maouHpText'),
  discRollHp: document.getElementById('discRollHp'),
  discRollStr: document.getElementById('discRollStr'),
  discRollDex: document.getElementById('discRollDex'),
  discRollSpd: document.getElementById('discRollSpd'),
  discipleHpFill: document.getElementById('discipleHpFill'),
  discipleHpText: document.getElementById('discipleHpText'),
  maouDiscipleIcon: document.getElementById('maouDiscipleIcon'),
  maouDiscipleName: document.getElementById('maouDiscipleName'),
  maouBattleLog: document.getElementById('maouBattleLog'),
  maouNextTurnBtn: document.getElementById('maouNextTurnBtn'),
  maouDefeatFlash: document.getElementById('maouDefeatFlash'),
  maouVictoryFlash: document.getElementById('maouVictoryFlash'),
  maouSideBox: document.getElementById('maouSideBox'),
  maouStoryScene: document.getElementById('maouStoryScene'),
  maouStoryImageWrap: document.getElementById('maouStoryImageWrap'),
  maouStoryText: document.getElementById('maouStoryText'),
  storyBgmAudio: document.getElementById('storyBgmAudio'),
  simpleRevealPopup: document.getElementById('simpleRevealPopup'),
  simpleRevealTitle: document.getElementById('simpleRevealTitle'),
  simpleRevealDesc: document.getElementById('simpleRevealDesc'),
  simpleRevealCloseBtn: document.getElementById('simpleRevealCloseBtn'),
  discipleIconBtn: document.getElementById('discipleIconBtn'),
  discipleIconPicker: document.getElementById('discipleIconPicker'),
  discipleName: document.getElementById('discipleName'),
  discipleRenameBtn: document.getElementById('discipleRenameBtn'),
  discipleHearts: document.getElementById('discipleHearts'),
  discipleStats: document.getElementById('discipleStats'),
  discipleBattleBtn: document.getElementById('discipleBattleBtn'),
  discipleBatchBattleBtn: document.getElementById('discipleBatchBattleBtn'),
  discipleStreakSummary: document.getElementById('discipleStreakSummary'),
  disciplePopup: document.getElementById('disciplePopup'),
  discipleOpponents: document.getElementById('discipleOpponents'),
  discipleBattleResult: document.getElementById('discipleBattleResult'),
  disciplePopupCloseBtn: document.getElementById('disciplePopupCloseBtn'),
  godStatueBuffPopup: document.getElementById('godStatueBuffPopup'),
  godBuffOptions: document.getElementById('godBuffOptions'),
  announcementsList: document.getElementById('announcementsList'),
  dungeonGrid: document.getElementById('dungeonGrid'),
  dungeonSelectHeading: document.getElementById('dungeonSelectHeading'),
  startBtn: document.getElementById('startBtn'),
  openStatsBtn: document.getElementById('openStatsBtn'),
  openHistoryBtn: document.getElementById('openHistoryBtn'),
  openShopBtn: document.getElementById('openShopBtn'),
  shopBackBtn: document.getElementById('shopBackBtn'),
  shopTabs: document.getElementById('shopTabs'),
  shopPt: document.getElementById('shopPt'),
  shopItemList: document.getElementById('shopItemList'),
  timerDisplay: document.getElementById('timerDisplay'),
  heartHudItem: document.getElementById('heartHudItem'),
  heartHudValue: document.getElementById('heartHudValue'),
  wordsDisplay: document.getElementById('wordsDisplay'),
  comboCount: document.getElementById('comboCount'),
  comboGaugeFill: document.getElementById('comboGaugeFill'),
  comboGaugeText: document.getElementById('comboGaugeText'),
  nextPreview: document.getElementById('nextPreview'),
  readyOverlay: document.getElementById('readyOverlay'),
  rareMonsterBadge: document.getElementById('rareMonsterBadge'),
  fairyDustBadge: document.getElementById('fairyDustBadge'),
  eternalComboHud: document.getElementById('eternalComboHud'),
  eternalComboCount: document.getElementById('eternalComboCount'),
  eternalComboMarks: document.getElementById('eternalComboMarks'),
  maouPrayerBadge: document.getElementById('maouPrayerBadge'),
  rareBonusPopup: document.getElementById('rareBonusPopup'),
  levelUpBanner: document.getElementById('levelUpBanner'),
  accuracyDisplay: document.getElementById('accuracyDisplay'),
  kpmDisplay: document.getElementById('kpmDisplay'),
  sessionPt: document.getElementById('sessionPt'),
  sessionExp: document.getElementById('sessionExp'),
  gameExpBarFill: document.getElementById('gameExpBarFill'),
  gameExpText: document.getElementById('gameExpText'),
  typingStage: document.getElementById('typingStage'),
  displayLine: document.getElementById('displayLine'),
  readingLine: document.getElementById('readingLine'),
  romajiLine: document.getElementById('romajiLine'),
  celebration: document.getElementById('celebration'),
  comboBonusPopup: document.getElementById('comboBonusPopup'),
  resultRankBadge: document.getElementById('resultRankBadge'),
  resultRankTitle: document.getElementById('resultRankTitle'),
  resultLevelUpBanner: document.getElementById('resultLevelUpBanner'),
  resultPrestigeBanner: document.getElementById('resultPrestigeBanner'),
  resultStats: document.getElementById('resultStats'),
  resultExpBarFill: document.getElementById('resultExpBarFill'),
  resultExpText: document.getElementById('resultExpText'),
  retryBtn: document.getElementById('retryBtn'),
  homeBtn: document.getElementById('homeBtn'),
  statsGrid: document.getElementById('statsGrid'),
  statsBackBtn: document.getElementById('statsBackBtn'),
  heatKeys: [...document.querySelectorAll('.heat-key')],
  historyList: document.getElementById('historyList'),
  historyEmpty: document.getElementById('historyEmpty'),
  historyBackBtn: document.getElementById('historyBackBtn'),
  customBgmAudio: document.getElementById('customBgmAudio'),
  shopTabBadges: {
    sword: document.querySelector('#shopTabs button[data-tab="sword"] .tab-comp-badge'),
    shield: document.querySelector('#shopTabs button[data-tab="shield"] .tab-comp-badge'),
    armor: document.querySelector('#shopTabs button[data-tab="armor"] .tab-comp-badge'),
    ring: document.querySelector('#shopTabs button[data-tab="ring"] .tab-comp-badge'),
    title: document.querySelector('#shopTabs button[data-tab="title"] .tab-comp-badge'),
    icon: document.querySelector('#shopTabs button[data-tab="icon"] .tab-comp-badge'),
  },
  ricoCompletePopup: document.getElementById('ricoCompletePopup'),
  ricoCompleteCloseBtn: document.getElementById('ricoCompleteCloseBtn'),
  openAnnouncementHistoryBtn: document.getElementById('openAnnouncementHistoryBtn'),
  announcementHistoryPopup: document.getElementById('announcementHistoryPopup'),
  announcementHistoryList: document.getElementById('announcementHistoryList'),
  announcementHistoryEmpty: document.getElementById('announcementHistoryEmpty'),
  announcementHistoryCloseBtn: document.getElementById('announcementHistoryCloseBtn'),
  openChangelogBtn: document.getElementById('openChangelogBtn'),
  openHelpBtn: document.getElementById('openHelpBtn'),
  helpPopup: document.getElementById('helpPopup'),
  helpPopupBody: document.getElementById('helpPopupBody'),
  helpCloseBtn: document.getElementById('helpCloseBtn'),
  changelogPopup: document.getElementById('changelogPopup'),
  changelogList: document.getElementById('changelogList'),
  changelogCloseBtn: document.getElementById('changelogCloseBtn'),
  openSettingsBtn: document.getElementById('openSettingsBtn'),
  settingsPopup: document.getElementById('settingsPopup'),
  settingsCloseBtn: document.getElementById('settingsCloseBtn'),
  bgmVolumeSlider: document.getElementById('bgmVolumeSlider'),
  bgmVolumeValue: document.getElementById('bgmVolumeValue'),
  seVolumeSlider: document.getElementById('seVolumeSlider'),
  seVolumeValue: document.getElementById('seVolumeValue'),
  frameSettingSection: document.getElementById('frameSettingSection'),
  typingFrameSelect: document.getElementById('typingFrameSelect'),
  phase2AnnouncePopup: document.getElementById('phase2AnnouncePopup'),
  phase2AnnounceBody: document.getElementById('phase2AnnounceBody'),
  phase2AnnounceCloseBtn: document.getElementById('phase2AnnounceCloseBtn'),
  exportSaveBtn: document.getElementById('exportSaveBtn'),
  exportSaveText: document.getElementById('exportSaveText'),
  importSaveFile: document.getElementById('importSaveFile'),
  importSaveFileBtn: document.getElementById('importSaveFileBtn'),
  importSaveText: document.getElementById('importSaveText'),
  importSaveTextBtn: document.getElementById('importSaveTextBtn'),
};

function setScreen(name) {
  screen = name;
  Object.entries(el.screens).forEach(([key, node]) => {
    node.classList.toggle('active', key === name);
  });
}

function goHome() {
  setScreen('home');
  renderPlayerCard();
  renderDungeonBadges();
  renderAnnouncements();
  renderDisciple();
}

const trimmedImageCache = {};
function loadAutoTrimmedImage(path, targetImgEl) {
  if (trimmedImageCache[path]) {
    targetImgEl.src = trimmedImageCache[path];
    return;
  }
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let minX = canvas.width;
    let minY = canvas.height;
    let maxX = -1;
    let maxY = -1;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const coreThreshold = 30;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const alpha = data[(y * canvas.width + x) * 4 + 3];
        if (alpha > coreThreshold) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < minX || maxY < minY) {
      trimmedImageCache[path] = path;
      targetImgEl.src = path;
      return;
    }
    const feather = 50;
    const cropX = Math.max(0, minX - feather);
    const cropY = Math.max(0, minY - feather);
    const cropRight = Math.min(canvas.width, maxX + 1 + feather);
    const cropBottom = Math.min(canvas.height, maxY + 1 + feather);
    const trimW = cropRight - cropX;
    const trimH = cropBottom - cropY;

    const trimCanvas = document.createElement('canvas');
    trimCanvas.width = trimW;
    trimCanvas.height = trimH;
    const trimCtx = trimCanvas.getContext('2d');
    trimCtx.drawImage(canvas, cropX, cropY, trimW, trimH, 0, 0, trimW, trimH);

    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = trimW;
    maskCanvas.height = trimH;
    const maskCtx = maskCanvas.getContext('2d');
    maskCtx.filter = `blur(${feather}px)`;
    maskCtx.fillStyle = '#fff';
    maskCtx.fillRect(feather, feather, Math.max(1, trimW - feather * 2), Math.max(1, trimH - feather * 2));

    trimCtx.globalCompositeOperation = 'destination-in';
    trimCtx.drawImage(maskCanvas, 0, 0);
    trimCtx.globalCompositeOperation = 'source-over';

    const dataUrl = trimCanvas.toDataURL('image/png');
    trimmedImageCache[path] = dataUrl;
    targetImgEl.src = dataUrl;
  };
  img.onerror = () => {
    targetImgEl.src = path;
  };
  img.src = encodeURI(path);
}

function updateLogos() {
  const src = save.maouDefeated ? 'logo/phase2m.png' : 'logo/phase1m.png';
  loadAutoTrimmedImage(src, el.topLogo);
  loadAutoTrimmedImage(src, el.homeLogo);
}

function isMaouAuraFrameActive() {
  if (save.maouGateRevealed && !save.maouDefeated) return true;
  return save.maouDefeated && save.settings.typingFrame === 'maouAura';
}

function showPhase2Announcement() {
  const name = save.disciple.name;
  const sections = [
    'ここまでプレイして頂き、本当に。本当にありがとうございました。\n創造主様は無事、ENDLESS TYPE-LOOP Phase1をクリアされました。\n未来は変わり、Phase2へと進みます。\n以下の変更点が発生致します。',
    '・魔王を討伐されました。\n持っていた魔王の紋章、封紋章は砂のように溶け、全て無くなりました。\nまたダンジョンに纏っていた邪気が払われたようです。\n<span class="phase2-announce-note">（フレーム強調によりタイピングに集中出来る方もいらっしゃると思いますので\n設定にフレームが追加され、いつでも変更出来るようになりました）</span>',
    `・リコは鎖から解き放たれました\n草原にはもう誰も居ません。\nリコの欠片も砕け散り、形は原形を留めませんでした。\nただ、リコがかつて使っていた装備は。\n眩く光を放っています。\n<span class="phase2-announce-note">（装備を全て揃える事でリコボーナスとしてタイプ倍率に+10000が付与されます）</span>`,
    '・女神達が見えなくなりました\n創造主様に建設して頂いた女神像、そして女神の園が見当たりません。\nただし、今までの恩恵は受け取れているようです。',
    `・${name}は無事に戻って来ました\n二人に分かれた${name}の内の一人は創造主様の元にお戻りになられました。\nこれからもかわいがってあげて下さいませ。`,
    '・商人が何やら不思議な卵を入荷したようです。\nショップには新しい商品が様々に入荷しております。\n是非ともご確認下さい。',
    '・トップ画面に変化が起こりました\nわかりやすい変化です。創造主様の築き上げた未来が動いた証拠です。',
  ];
  el.phase2AnnounceBody.innerHTML = sections
    .map((text, i) => `<div class="phase2-announce-section${i === 0 ? ' phase2-announce-intro' : ''}">${text}</div>`)
    .join('');
  el.phase2AnnouncePopup.classList.remove('hidden');
}

function showHelpPopup() {
  const sections = [
    '◯Endless Type-loopの世界へようこそ\nこの世界はあなたのタイピングによって物語が進みます。\nスタミナなどもありませんのでお好きな時にタイピングをしてお好きな時におやめください。',
    '◯何をしたら良いの？\nタイピングをすれば良いと思います。\n\nだけだとイジワルですね。\nあなたにはお弟子様がいらっしゃいます。\nしかしながらとってもとっても非力なお弟子様のようです。\nタイピングで得られるポイントを使って強化をしてあげると、\n今よりも更に強くなるかもしれません。\n\n鍛えた弟子を戦いに出す事ができますがハートを消費します。\nハートがなくなったらどうしたらいいのか？\nタイピングをすれば良いのです。\n\n左上のメニューからショップに移動できます。\nショップにもあなたを手助けするアイテムが並んでおります。\nまずは一度覗かれる事をオススメします。\n\nそして壊れた女神像が御座います。\n気が向いたら是非とも直してあげていただけますと。\n修復が出来た暁には何か、御利益があるかもしれません。',
    '◯セーブについて\nセーブは開いているPC、ブラウザに依存いたします。\n他PCで遊ばれたい場合は設定からデータのエクスポートをお試し下さい。',
    '◯最後に\nあなたが、タイピングを続け世界を開こうとした時。\n自ずと次にやることが見つかるはずです。\nそれでは。ご武運を。',
    '<span class="phase2-announce-note">【もっと詳しい遊び方ページはこちら】\n※工事中</span>',
  ];
  el.helpPopupBody.innerHTML = sections
    .map((text, i) => `<div class="phase2-announce-section${i === 0 ? ' phase2-announce-intro' : ''}">${text}</div>`)
    .join('');
  el.helpPopup.classList.remove('hidden');
}

function refreshTotalPt() {
  el.totalPt.textContent = Math.floor(save.pt).toLocaleString();
}

function refreshMuteBtn() {
  el.muteBtn.textContent = save.muted ? '🔇' : '🔊';
}

function applyRicoBonus(item, slot) {
  if (!item || !item.rico) return item;
  const lvl = (save.ricoLevels && save.ricoLevels[slot]) || 0;
  if (lvl <= 0) return item;
  const field = RICO_FIELD[slot];
  const raw = item[field] + lvl * RICO_INCREMENT[slot];
  return { ...item, [field]: Math.round(raw * 10000) / 10000 };
}

function getEquippedSword() {
  const sword = SWORD_CATALOG.find((s) => s.id === save.equipment.swordId) || null;
  return applyRicoBonus(sword, 'sword');
}
function getEquippedShield() {
  const shield = SHIELD_CATALOG.find((s) => s.id === save.equipment.shieldId) || null;
  return applyRicoBonus(shield, 'shield');
}
function getEquippedArmor() {
  const armor = ARMOR_CATALOG.find((a) => a.id === save.equipment.armorId) || ARMOR_CATALOG[0];
  return applyRicoBonus(armor, 'armor');
}
function getEquippedRing() {
  const ring = RING_CATALOG.find((r) => r.id === save.equipment.ringId) || null;
  return applyRicoBonus(ring, 'ring');
}

function ricoStrengthenCost(slot) {
  const lvl = (save.ricoLevels && save.ricoLevels[slot]) || 0;
  return Math.round(RICO_STRENGTHEN_BASE_COST[slot] * Math.pow(RICO_STRENGTHEN_GROWTH[slot], lvl));
}

function ricoMaxLevel(slot) {
  const max = RICO_MAX_VALUE[slot];
  if (max === undefined) return Infinity;
  return Math.round((max - RICO_BASE_VALUE[slot]) / RICO_INCREMENT[slot]);
}

function isRicoMaxed(slot) {
  const lvl = (save.ricoLevels && save.ricoLevels[slot]) || 0;
  return lvl >= ricoMaxLevel(slot);
}

function strengthenRicoItem(slot) {
  if (isRicoMaxed(slot)) return;
  const cost = ricoStrengthenCost(slot);
  if (save.ricoShards < cost) return;
  save.ricoShards -= cost;
  save.ricoLevels[slot] = (save.ricoLevels[slot] || 0) + 1;
  SFX.correct();
  persistSave();
  renderPlayerCard();
  checkRicoTabletDiscovery();
}

function isAllRicoMaxed() {
  return ['sword', 'shield', 'armor', 'ring'].every((slot) => isRicoMaxed(slot));
}

function checkRicoTabletDiscovery() {
  if (save.ricoTabletFound) return;
  if (!isAllRicoMaxed()) return;
  save.ricoTabletFound = true;
  pushAnnouncement('🪦', 'リコの位牌を見つけました');
  persistSave();
  renderAnnouncements();
  renderPlayerCard();
  queueReveal('リコの導き', '装備品が光り出した。\n指し示した場所は草原が広がっていて、\nそこには一つの位牌が置いてある。');
}

function prayAtEmptyRicoTablet() {
  if (!save.ricoTabletFound) return;
  save.emptyPrayerClicks = (save.emptyPrayerClicks || 0) + 1;
  SFX.correct();
  persistSave();
  if (save.emptyPrayerClicks === 100) {
    pushAnnouncement('👀', '「リコはちょっと嫌がってるかもしれません…」実績を解放しました。');
    renderAnnouncements();
    renderAchievements();
    queueReveal('', '「リコはちょっと嫌がってるかもしれません…」実績を解放しました。');
  } else {
    queueReveal('', 'そこには誰もいない。\nとても暖かい風が頬を撫でた。');
  }
}

function prayAtRicoTablet() {
  if (!save.ricoTabletFound) return;
  if (save.maouDefeated) {
    prayAtEmptyRicoTablet();
    return;
  }
  if (save.ricoShards < RICO_PRAYER_COST) return;
  if ((save.maouPrayerCharges || 0) >= RICO_PRAYER_MAX_CHARGES) return;
  save.ricoShards -= RICO_PRAYER_COST;
  save.maouPrayerCharges = (save.maouPrayerCharges || 0) + 1;
  save.maouPrayerCount = (save.maouPrayerCount || 0) + 1;
  SFX.correct();

  const prayerCount = save.maouPrayerCount;
  const justMetRico = prayerCount === 1 && !save.ricoMet;
  if (justMetRico) save.ricoMet = true;

  const justUnlockedSeal = !save.maouSealUnlocked && prayerCount >= MAOU_SEAL_UNLOCK_PRAYER_COUNT;
  if (justUnlockedSeal) {
    save.maouSealUnlocked = true;
    pushAnnouncement('🔒', 'リコが封紋章の作り方を教えてくれました');
  }

  persistSave();
  renderPlayerCard();
  renderMaouGate();
  renderGodGarden();

  if (justMetRico) {
    pushAnnouncement('✨', 'リコが現れました');
    renderAnnouncements();
    queueReveal(
      'リコ',
      '私には果たせなかった……\nでもアナタ達ならきっと。\n私にはこんなことしか出来ないけど……\n彼女が両手を組み祈りをはじめると、光が突如現れ、\nその光は魔王城に伸びていった',
    );
    queueReveal(
      'リコ',
      'ほんのわずかだけど……\n魔王城の扉を開く為の紋章が\n見つかりやすいように祈っておいた……\n諦めないで。',
    );
    queueReveal(
      '女神達の感謝',
      '女神達は魔王討伐のためにアナタに力を授けようとしている。\nそれ相応の代償は必要だが……',
    );
  } else if (justUnlockedSeal) {
    renderAnnouncements();
    queueReveal(
      'リコの囁き',
      'あなたに魔王の力を封じる封紋章の作り方を教えてあげる…\n諦めないで…\n（封紋章を生成すると魔王のパラメーターを減少させることが出来ます。\n効果は重複し、複数所持するほど減少値は高くなります）',
    );
  } else if (prayerCount >= 2 && prayerCount <= 9) {
    queueReveal(
      'リコの位牌',
      'リコの祈りの加護によって\n次回冒険時、紋章の出現率が5％アップした。\nリコは何かを喋りたそうにしているが、\n目を合わせると逸らされてしまった。',
    );
  }
}

function isCollectionComplete(tab) {
  if (tab === 'sword') return SWORD_CATALOG.filter((i) => !i.rico).every((i) => isOwned('sword', i.id));
  if (tab === 'shield') return SHIELD_CATALOG.filter((i) => !i.rico).every((i) => isOwned('shield', i.id));
  if (tab === 'armor') return ARMOR_CATALOG.filter((i) => !i.rico).every((i) => i.price === 0 || isOwned('armor', i.id));
  if (tab === 'ring') return RING_CATALOG.filter((i) => !i.rico).every((i) => isOwned('ring', i.id));
  if (tab === 'title') {
    return TITLE_FRONT_CATALOG.every((i) => isOwned('titleFront', i.id))
      && TITLE_BACK_CATALOG.every((i) => isOwned('titleBack', i.id));
  }
  if (tab === 'icon') return ICON_CATALOG.shop.every((i) => isOwned('icon', i.id));
  return false;
}

function isEverythingComplete() {
  return COMPLETION_TABS.every(isCollectionComplete);
}

function updateShopTabBadges() {
  COMPLETION_TABS.forEach((tab) => {
    const badge = el.shopTabBadges[tab];
    if (badge) badge.classList.toggle('hidden', !isCollectionComplete(tab));
  });
}

function checkRicoUnlock() {
  if (save.ricoUnlocked || !isEverythingComplete()) return;
  save.ricoUnlocked = true;
  pushAnnouncement('📦', 'コンプ報酬「リコシリーズ」が入荷しました');
  persistSave();
  renderAnnouncements();
  el.ricoCompletePopup.classList.remove('hidden');
}
function getEquippedTitleFront() {
  return TITLE_FRONT_CATALOG.find((t) => t.id === save.equipment.titleFrontId) || null;
}
function getEquippedTitleBack() {
  return TITLE_BACK_CATALOG.find((t) => t.id === save.equipment.titleBackId) || null;
}
function getEquippedConnective() {
  return TITLE_CONNECTIVES.find((c) => c.id === save.equipment.titleConnectiveId) || TITLE_CONNECTIVES[0];
}
function getEquippedTitleText() {
  const front = getEquippedTitleFront();
  const back = getEquippedTitleBack();
  if (!front && !back) return null;
  if (front && back) return `${front.name}${getEquippedConnective().text}${back.name}`;
  return front ? front.name : back.name;
}
function swordEffectLabel(sword) {
  if (!sword) return '';
  const pct = Math.round(sword.value * 100);
  return sword.statType === 'keystroke' ? `打鍵pt+${pct}%` : `撃破ボーナス+${pct}%(文字数分)`;
}
function shieldEffectLabel(shield) {
  if (!shield) return '';
  return `EXP+${Math.round(shield.expBonus * 100)}%`;
}
function armorEffectLabel(armor) {
  if (!armor) return '';
  return `${armor.comboStep}コンボ毎+${armor.comboSeconds}s`;
}
function ringEffectLabel(ring) {
  if (!ring) return '';
  return `レア出現率+${Math.round(ring.rareChanceBonus * 100)}%`;
}

function fullPtMultiplier() {
  const { levelBonus, prestigeBonus } = ptMultiplierBreakdown(save);
  const sword = getEquippedSword();
  const swordBonus = sword && sword.statType === 'keystroke' ? sword.value : 0;
  const base = 1 + levelBonus + prestigeBonus;
  const awakeningBonus = prestigeAwakeningPtBonus(save);
  const ricoBonus = save.maouDefeated && isRicoFullyOwned(save) ? 10000 : 0;
  const total = base * (1 + swordBonus) + awakeningBonus + ricoBonus;
  return { levelBonus, prestigeBonus, swordBonus, awakeningBonus, ricoBonus, total };
}

function rankAtLeast(rank, threshold) {
  if (!rank) return false;
  return RANK_ORDER.indexOf(rank) >= RANK_ORDER.indexOf(threshold);
}

function isRicoFullyOwned(s) {
  return s.inventory.swords.includes('sword_rico')
    && s.inventory.shields.includes('shield_rico')
    && s.inventory.armors.includes('armor_rico')
    && s.inventory.rings.includes('ring_rico');
}

const ACHIEVEMENTS = [
  { id: 'prestige_once', icon: '🌟', label: '転生を達成', check: (s) => s.prestige >= 1 },
  { id: 'prestige_awaken', icon: '💫', label: '転生10回達成（覚醒）', check: (s) => !!s.prestigeAwakened },
  { id: 'prestige_super_awaken', icon: '🌌', label: '転生30回達成（超覚醒）', check: (s) => (s.prestigeAwakenedTiers || []).includes(30) },
  { id: 'disciple_streak_1000', icon: '🔥', label: '弟子が1000連勝を達成', check: (s) => discipleMaxStreakOf(s) > 1000 },
  { id: 'disciple_streak_10000', icon: '🔥', label: '弟子が10000連勝を達成', check: (s) => discipleMaxStreakOf(s) >= 10000 },
  { id: 'rank_ss_word', icon: '🗡️', label: '単語の間でSSを達成', check: (s) => rankAtLeast(s.bestRankByKey['jp:word'], 'SS') },
  { id: 'rank_ss_sentence', icon: '⚔️', label: '文章の回廊でSSを達成', check: (s) => rankAtLeast(s.bestRankByKey['jp:sentence'], 'SS') },
  { id: 'rank_ss_long', icon: '🗼', label: '長文の塔でSSを達成', check: (s) => rankAtLeast(s.bestRankByKey['jp:long'], 'SS') },
  { id: 'shop_complete', icon: '🏆', label: 'ショップの装備・称号・アイコンをコンプ', check: (s) => !!s.ricoUnlocked },
  { id: 'rico_all_owned', icon: '🕶️', label: 'リコ装備を全て購入', check: isRicoFullyOwned, red: true },
  { id: 'god_statue_once', icon: '🛠️', label: '女神像を復興した', check: (s) => (s.godStatue.sent || 0) >= 1 },
  { id: 'god_statue_complete', icon: '⛩️', label: 'ラグナロクに決着をつけた（女神像100回）', check: (s) => !!s.godStatue.completed },
  { id: 'disciple_params_500', icon: '💪', label: '弟子のパラメーター合計が500を達成', check: (s) => discipleTotalParamsOf(s) >= 500 },
  { id: 'disciple_params_1000', icon: '👑', label: '弟子のパラメーター合計が1000を達成（勇者化）', check: (s) => !!s.disciple.classUpped },
  { id: 'maou_gate_seen', icon: '🏰', label: '魔王城への道が見えてきた', check: (s) => !!s.maouGateRevealed },
  { id: 'maou_defeated', icon: '💀', label: '魔王を倒した', check: (s) => !!s.maouDefeated },
  { id: 'rico_prayer_once', icon: '🙏', label: 'リコの位牌に初めて祈った', check: (s) => (s.maouPrayerCount || 0) >= 1 },
  { id: 'maou_seal_learned', icon: '🔒', label: '封紋章の作り方を教わった', check: (s) => !!s.maouSealUnlocked },
  { id: 'secret_keyboard_100', icon: '😝', label: 'くだらないギミックのクリックを頑張ったで賞', hoverText: 'いいからタイピングしなよ', check: (s) => (s.secretKeyboardClicks || 0) >= 100 },
  { id: 'fairy_dust_500', icon: '🧚', label: '妖精の粉を500回購入した', hoverText: '不思議な粉', check: (s) => ((s.itemPurchaseCounts && s.itemPurchaseCounts.item_fairy_dust) || 0) >= 500 },
  { id: 'happy_grass_500', icon: '🌿', label: 'しあわせ草を500回購入した', hoverText: '草中毒', check: (s) => ((s.itemPurchaseCounts && s.itemPurchaseCounts.item_happy_grass) || 0) >= 500 },
  { id: 'eternal_combo_100', icon: '🔵', label: '永続コンボ100達成（輪廻の始まり）', check: (s) => (s.eternalComboMax || 0) >= 100 },
  { id: 'eternal_combo_500', icon: '🟣', label: '永続コンボ500達成（輪廻は続く）', check: (s) => (s.eternalComboMax || 0) >= 500 },
  { id: 'eternal_combo_1000', icon: '🟤', label: '永続コンボ1000達成（輪廻魔眼）', check: (s) => (s.eternalComboMax || 0) >= 1000 },
  { id: 'eternal_combo_3000', icon: '🔴', label: '永続コンボ3000達成（輪廻邪眼）', check: (s) => (s.eternalComboMax || 0) >= 3000 },
  { id: 'eternal_combo_5000', icon: '⚪', label: '永続コンボ5000達成（輪廻聖眼）', check: (s) => (s.eternalComboMax || 0) >= 5000 },
  { id: 'eternal_combo_10000', icon: '🟡', label: '永続コンボ10000達成（輪廻神眼）', check: (s) => (s.eternalComboMax || 0) >= 10000 },
  { id: 'total_taps_1man', icon: '🥉', label: '総タイプ数1万達成', check: (s) => s.totalCorrect >= 10000 },
  { id: 'total_taps_10man', icon: '🥈', label: '総タイプ数10万達成', check: (s) => s.totalCorrect >= 100000 },
  { id: 'total_taps_100man', icon: '🥇', label: '総タイプ数100万達成', check: (s) => s.totalCorrect >= 1000000 },
  { id: 'total_taps_1000man', icon: '💎', label: '総タイプ数1000万達成', check: (s) => s.totalCorrect >= 10000000 },
  { id: 'typing_time_1h', icon: '⏱️', label: '総タイピング時間1時間達成', check: (s) => (s.totalTypingTimeMs || 0) >= 3600000 },
  { id: 'typing_time_10h', icon: '⏰', label: '総タイピング時間10時間達成', check: (s) => (s.totalTypingTimeMs || 0) >= 36000000 },
  { id: 'typing_time_100h', icon: '🕰️', label: '総タイピング時間100時間達成', check: (s) => (s.totalTypingTimeMs || 0) >= 360000000 },
  { id: 'empty_prayer_100', icon: '👀', label: '見てるからもう祈らないでください', check: (s) => (s.emptyPrayerClicks || 0) >= 100 },
  { id: 'help_100', icon: '😰', label: '疑心暗鬼', check: (s) => (s.helpManualOpens || 0) >= 100 },
];

function discipleMaxStreakOf(s) {
  const streaks = s.disciple.streaks || {};
  return Math.max(streaks.weak || 0, streaks.normal || 0, streaks.strong || 0);
}

function discipleTotalParamsOf(s) {
  return s.disciple.hp + s.disciple.str + s.disciple.dex + s.disciple.spd;
}

function renderAchievements() {
  el.achievementIcons.innerHTML = '';
  ACHIEVEMENTS.forEach((a) => {
    if (!a.check(save)) return;
    const span = document.createElement('span');
    span.className = a.red ? 'achievement-icon achievement-icon-red' : 'achievement-icon';
    span.title = a.hoverText || a.label;
    span.textContent = a.icon;
    el.achievementIcons.appendChild(span);
  });
}

function renderPlayerCard() {
  el.profileIconBtn.textContent = save.profile.icon;
  el.playerName.textContent = save.profile.name;
  renderAchievements();
  const titleText = getEquippedTitleText();
  el.playerTitle.textContent = titleText ? `称号：${titleText}` : '称号：未設定';
  el.playerLevel.textContent = `Lv.${save.level}`;
  el.playerPrestige.textContent = save.prestige > 0 ? `+${save.prestige}` : '';

  const need = expToNextLevel(save.level, prestigeAwakeningExpMultiplier(save));
  const atMax = save.level >= MAX_LEVEL;
  const pct = atMax ? 100 : Math.min(100, Math.round((save.exp / need) * 100));
  el.expBarFill.style.width = `${pct}%`;
  el.expText.textContent = atMax ? `${save.exp} / ${need} EXP (MAX)` : `${save.exp} / ${need} EXP`;
  const mult = fullPtMultiplier();
  const swordPart = mult.swordBonus > 0 ? ` 剣+${Math.round(mult.swordBonus * 100)}%` : '';
  const awakeningPart = mult.awakeningBonus > 0 ? ` 覚醒+${mult.awakeningBonus.toFixed(1)}` : '';
  const ricoPart = mult.ricoBonus > 0 ? ` リコの加護ボーナス+${mult.ricoBonus.toLocaleString()}` : '';
  el.ptMultiplier.textContent = `pt倍率 x${mult.total.toFixed(1)}（Lv+${mult.levelBonus.toFixed(1)} 転生+${mult.prestigeBonus.toFixed(1)}${swordPart}${awakeningPart}${ricoPart}）`;
  el.prestigeBtn.classList.toggle('hidden', !canPrestige(save));

  el.playerCard.className = `player-card design-${save.profile.cardDesign}`;
  el.profileIconBtn.className = `profile-icon frame-${save.profile.iconFrame}`;

  renderEquipmentSummary();
  renderGodStatue();
  renderMaouGate();
}

function godStatueSvg(stage) {
  const pedestal = '<rect x="14" y="70" width="32" height="10" rx="2" fill="#4a3a72"/><rect x="10" y="80" width="40" height="6" rx="2" fill="#332a52"/>';
  if (stage === 0) {
    return `<svg viewBox="0 0 60 90" class="god-statue-svg">${pedestal}<text x="30" y="60" text-anchor="middle" font-size="11" fill="#5a4d7a">?</text></svg>`;
  }
  if (stage === 1) {
    return `<svg viewBox="0 0 60 90" class="god-statue-svg">${pedestal}
      <path d="M30 46 C24 46 21 54 21 60 L21 70 L39 70 L39 60 C39 54 36 46 30 46 Z" fill="#8a7ab0" opacity="0.35"/>
    </svg>`;
  }
  if (stage === 2) {
    return `<svg viewBox="0 0 60 90" class="god-statue-svg">${pedestal}
      <path d="M30 34 C22 34 18 44 18 52 L18 70 L42 70 L42 52 C42 44 38 34 30 34 Z" fill="#8a7ab0" opacity="0.6"/>
      <circle cx="30" cy="25" r="7" fill="#8a7ab0" opacity="0.5"/>
    </svg>`;
  }
  if (stage === 3) {
    return `<svg viewBox="0 0 60 90" class="god-statue-svg">${pedestal}
      <path d="M30 30 C21 30 16 41 16 50 L16 70 L44 70 L44 50 C44 41 39 30 30 30 Z" fill="#a596c9" opacity="0.9"/>
      <circle cx="30" cy="21" r="8" fill="#a596c9" opacity="0.85"/>
      <path d="M22 45 L26 50 M38 42 L34 48" stroke="#fff" stroke-width="0.8" opacity="0.5"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 60 90" class="god-statue-svg">
    <defs><radialGradient id="godGlow" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fff3c4"/><stop offset="55%" stop-color="#c26bff"/><stop offset="100%" stop-color="#7c8cff"/>
    </radialGradient></defs>
    ${pedestal}
    <path d="M30 28 C20 28 15 40 15 50 L15 70 L45 70 L45 50 C45 40 40 28 30 28 Z" fill="url(#godGlow)"/>
    <circle cx="30" cy="18" r="9" fill="url(#godGlow)"/>
    <path d="M12 20 A18 18 0 0 1 48 20" stroke="#ffe9a8" stroke-width="1.5" fill="none" opacity="0.85"/>
    <circle cx="10" cy="35" r="1.4" fill="#fff3c4"/>
    <circle cx="50" cy="40" r="1.2" fill="#fff3c4"/>
    <circle cx="30" cy="8" r="1.4" fill="#fff3c4"/>
  </svg>`;
}

function renderGodStatue() {
  if (save.maouDefeated) {
    el.godStatuePanel.classList.add('hidden');
    el.godGardenPanel.classList.add('hidden');
    return;
  }
  el.godStatuePanel.classList.toggle('hidden', save.godStatue.completed);
  el.godGardenPanel.classList.toggle('hidden', !save.godStatue.completed);
  if (save.godStatue.completed) {
    renderGodGarden();
    return;
  }

  const pct = Math.round((save.godStatue.restoration / GOD_STATUE_MAX) * 100);
  el.godStatueBarFill.style.width = `${pct}%`;
  el.godStatueText.textContent = `復興 ${save.godStatue.restoration} / ${GOD_STATUE_MAX}`;
  el.godStatueSent.textContent = save.godStatue.sent > 0 ? `+${save.godStatue.sent}` : '';
  const stage = save.godStatue.restoration >= GOD_STATUE_MAX ? 4 : Math.min(3, Math.floor(save.godStatue.restoration / 25));
  el.godStatueArt.innerHTML = godStatueSvg(stage);

  const ready = save.godStatue.restoration >= GOD_STATUE_MAX;
  el.godStatueBtn.innerHTML = ready
    ? '⚔️ 女神像をラグナロクに送る <span class="key-hint">M</span>'
    : `🛠️ 女神像を再建築する（-${GOD_STATUE_RESTORE_COST.toLocaleString()}pt） <span class="key-hint">M</span>`;
  el.godStatueBtn.classList.toggle('ready', ready);
  el.godStatueBtn.disabled = !ready && save.pt < GOD_STATUE_RESTORE_COST;
}

function renderGodGarden() {
  const n = save.godStatue.gardenRestorations || 0;
  const maxed = n >= GOD_GARDEN_MAX_RESTORATIONS;
  const bonusSuffix = save.maouGateRevealed ? `（魔王の紋章 出現率 +${(n * GOD_GARDEN_EMBLEM_BONUS_PER * 100).toFixed(1)}%）` : '';
  el.godGardenText.textContent = `復興 ${n} / ${GOD_GARDEN_MAX_RESTORATIONS}${bonusSuffix}`;
  el.godGardenBtn.textContent = maxed ? '🌸 女神の園は完全に復興した' : `🌸 女神の園を復興する（-${GOD_GARDEN_RESTORE_COST.toLocaleString()}pt）`;
  el.godGardenBtn.disabled = maxed || save.pt < GOD_GARDEN_RESTORE_COST;
  el.godGardenHintBtn.classList.toggle('hidden', !save.godGardenHintShown);

  el.godBlessingRow.classList.toggle('hidden', !save.ricoMet);
  el.godBlessingBtn.classList.toggle('hidden', !save.ricoMet);
  if (save.ricoMet) {
    const blessingCount = save.godStatue.goddessBlessingCount || 0;
    const blessingMaxed = isGoddessBlessingMaxed();
    el.godBlessingText.textContent = blessingMaxed
      ? '女神達の超加護（リコの欠片ドロップ数+100 ダンジョンによって魔王の紋章が大幅ドロップ率UP）'
      : `加護×${blessingCount}（リコの欠片ドロップ数+${blessingCount * GOD_BLESSING_SHARD_BONUS_PER}）`;
    el.godBlessingText.classList.toggle('stat-glow-yellow', blessingMaxed);
    el.godBlessingBtn.textContent = blessingMaxed
      ? '🙏 女神達の聖なる加護は完成した'
      : `🙏 女神達の加護を受ける（-${GOD_BLESSING_COST.toLocaleString()}pt）`;
    el.godBlessingBtn.disabled = blessingMaxed || save.pt < GOD_BLESSING_COST;
  }
}

function isGoddessBlessingMaxed() {
  return (save.godStatue.goddessBlessingCount || 0) >= GOD_BLESSING_MAX_COUNT;
}

function receiveGoddessBlessing() {
  if (!save.ricoMet) return;
  if (isGoddessBlessingMaxed()) return;
  if (save.pt < GOD_BLESSING_COST) return;
  save.pt -= GOD_BLESSING_COST;
  save.totalPtSpent += GOD_BLESSING_COST;
  save.godStatue.goddessBlessingCount = (save.godStatue.goddessBlessingCount || 0) + 1;
  persistSave();
  refreshTotalPt();
  renderGodGarden();
}

function showGodGardenHint() {
  queueReveal(
    '女神の呟き',
    '私達を追いやった魔王軍を倒す為には、あなたではない力。\nそして彼女と会ってください…ではないと…\n魔王城にすら辿り着けないかもしれません……',
  );
}

el.godGardenHintBtn.addEventListener('click', showGodGardenHint);

function restoreGodGarden() {
  if ((save.godStatue.gardenRestorations || 0) >= GOD_GARDEN_MAX_RESTORATIONS) return;
  if (save.pt < GOD_GARDEN_RESTORE_COST) return;
  save.pt -= GOD_GARDEN_RESTORE_COST;
  save.totalPtSpent += GOD_GARDEN_RESTORE_COST;
  save.godStatue.gardenRestorations = (save.godStatue.gardenRestorations || 0) + 1;
  const justCompleted = save.godStatue.gardenRestorations >= GOD_GARDEN_MAX_RESTORATIONS && !save.godGardenHintShown;
  if (justCompleted) {
    save.godGardenHintShown = true;
    pushAnnouncement('❔', '女神が何かを仄めかしています');
  }
  persistSave();
  refreshTotalPt();
  renderGodGarden();
  if (justCompleted) {
    renderAnnouncements();
    showGodGardenHint();
  }
}

function renderMaouGate() {
  el.maouGatePanel.classList.toggle('hidden', !save.maouGateRevealed || save.maouDefeated);
  if (!save.maouGateRevealed || save.maouDefeated) return;
  el.maouGateText.textContent = `魔王の紋章 ${Math.min(save.maouEmblems, MAOU_EMBLEM_REQUIRED).toLocaleString()} / ${MAOU_EMBLEM_REQUIRED}`;

  el.maouSealCountText.classList.toggle('hidden', !save.maouSealUnlocked);
  el.maouCraftSealBtn.classList.toggle('hidden', !save.maouSealUnlocked);
  if (save.maouSealUnlocked) {
    el.maouSealCountText.textContent = `｜🔒封紋章 ${(save.maouSealCount || 0).toLocaleString()}個`;
    el.maouCraftSealBtn.disabled = save.maouEmblems < MAOU_SEAL_CRAFT_COST;
  }
}

function renderMaouCastleScreen() {
  const ready = save.maouEmblems >= MAOU_EMBLEM_REQUIRED;
  el.maouCastleText.textContent = `魔王の紋章 ${Math.min(save.maouEmblems, MAOU_EMBLEM_REQUIRED).toLocaleString()} / ${MAOU_EMBLEM_REQUIRED}`;
  el.maouAttackBtn.disabled = !ready;
}

function craftMaouSeal() {
  if (!save.maouSealUnlocked) return;
  if (save.maouEmblems < MAOU_SEAL_CRAFT_COST) return;
  save.maouEmblems -= MAOU_SEAL_CRAFT_COST;
  save.maouSealCount = (save.maouSealCount || 0) + 1;
  persistSave();
  renderMaouGate();
  renderMaouCastleScreen();
}

const MAOU_STAT_MIN = 300;
const MAOU_STAT_MAX = 500;
const MAOU_WAVE_MULTIPLIER = 2;
const MAOU_BATTLE_TURN_CAP = 30;
const MAOU_BATTLE_PREVIEW_TURNS = 3;
const MAOU_BATTLE_SKIP_MARGIN = 5;

let maouBattleQueue = null;
let maouBattleDisc = null;
let maouBattlePhase = 'intro';
let maouBattleClickResolve = null;

function waitForMaouBattleClick(phase) {
  return new Promise((resolve) => {
    maouBattlePhase = phase;
    maouBattleClickResolve = resolve;
    el.maouNextTurnBtn.classList.remove('hidden');
  });
}

function computeMaouBattleRounds(disc, maou) {
  const p = { ...disc };
  const o = { ...maou };
  const maouFirst = o.spd >= p.spd;
  const rounds = [];
  let round = 0;
  while (p.hp > 0 && o.hp > 0 && round < MAOU_BATTLE_TURN_CAP) {
    round += 1;
    const order = maouFirst ? ['maou', 'disciple'] : ['disciple', 'maou'];
    const events = [];
    for (const who of order) {
      if (p.hp <= 0 || o.hp <= 0) break;
      if (who === 'disciple') {
        const hits = Math.max(1, Math.floor(p.spd / Math.max(1, o.spd)));
        const dmg = Math.max(1, p.str - o.dex);
        let dealt = 0;
        for (let i = 0; i < hits && o.hp > 0; i++) {
          o.hp -= dmg;
          dealt += dmg;
        }
        events.push({ actor: 'disciple', dmg: dealt });
      } else {
        const hits = Math.max(1, Math.floor(o.spd / Math.max(1, p.spd)));
        const dmg = Math.max(1, o.str - p.dex);
        let dealt = 0;
        for (let i = 0; i < hits && p.hp > 0; i++) {
          p.hp -= dmg;
          dealt += dmg;
        }
        events.push({ actor: 'maou', dmg: dealt });
      }
    }
    rounds.push({ events, discHp: Math.max(0, p.hp), maouHp: Math.max(0, o.hp) });
  }
  const win = o.hp <= 0 && p.hp > 0;
  const timeout = !win && p.hp > 0 && o.hp > 0;
  return { rounds, win, timeout };
}

function rollMaouStat(target, min, max, duration) {
  return new Promise((resolve) => {
    const start = performance.now();
    const step = () => {
      const elapsed = performance.now() - start;
      const value = min + Math.floor(Math.random() * (max - min + 1));
      if (elapsed >= duration) {
        target.textContent = value.toLocaleString();
        resolve(value);
        return;
      }
      target.textContent = value.toLocaleString();
      setTimeout(step, 60);
    };
    step();
  });
}

function pulseMaouStat(target, value) {
  target.textContent = value.toLocaleString();
  target.classList.remove('stat-pulse');
  void target.offsetWidth;
  target.classList.add('stat-pulse');
}

function pulseMaouStatWeak(target, value) {
  target.textContent = value.toLocaleString();
  target.classList.remove('stat-pulse-weak');
  void target.offsetWidth;
  target.classList.add('stat-pulse-weak');
}

function appendMaouBattleLog(text) {
  const line = document.createElement('div');
  line.className = 'maou-battle-log-line';
  line.textContent = text;
  el.maouBattleLog.appendChild(line);
  el.maouBattleLog.scrollTop = el.maouBattleLog.scrollHeight;
}

function triggerMaouDefeatFlash() {
  SFX.maouDefeatSlash();
  el.maouDefeatFlash.classList.remove('flashing');
  void el.maouDefeatFlash.offsetWidth;
  el.maouDefeatFlash.classList.add('flashing');
}

function triggerMaouVictoryFlash() {
  SFX.maouVictorySlash();
  el.maouVictoryFlash.classList.remove('flashing');
  void el.maouVictoryFlash.offsetWidth;
  el.maouVictoryFlash.classList.add('flashing');
}

function getMaouStoryScenes() {
  const name = save.disciple.name;
  return [
    {
      image: 'img/1.jpg',
      pages: [
        '魔王城から邪気が払われた時。\n草原に、暖かい風が吹き抜けた。',
        '「やったのね……遂に……。\n　一族の想いを……本当にありがとう……」',
        '少しずつ彼女は光ながら、姿が薄くなっていく。\n風が運ぶように。彼女の姿は見えなくなっていった。',
      ],
    },
    {
      image: 'img/2.jpg',
      pages: [
        '女神の園は喜びに包まれていた。\nラグナロクの戦いが終わり、そして魔王は倒された。',
        '女神達は大きな声を出して喜んでいた。\n「これで邪魔する者は居なくなった」と。',
      ],
    },
    {
      image: 'img/3.jpg',
      pages: [
        `${name}は眩く光る\n「本当にありがとうございました……」`,
        '「自分が勇者として運命を背負っていたこと。\n　その責任を果たさせてくれたこと……」',
        '「これから勇者として果たさなければならないことが\n　あります。だけど……」',
      ],
    },
    {
      image: 'img/4.jpg',
      pages: [
        '「これからも側で一緒に戦わせて下さい…」\n　光瞬くと姿は一人から二人に。',
        `そして、一人の${name}は。\n私達に背を向け歩き出す。運命と向き合う為に。`,
      ],
    },
    {
      image: 'img/ED.jpg',
      fadeIn: true,
      largeImage: true,
      holdMs: 7000,
      stopBgmAfter: true,
    },
    {
      image: 'img/5.jpg',
      seThenFade: 'SE/コンピューター音.mp3',
    },
  ];
}

function typewriterText(target, text, charDelay, onDone) {
  target.textContent = '';
  let i = 0;
  function step() {
    if (i >= text.length) {
      if (onDone) onDone();
      return;
    }
    target.textContent += text[i];
    i += 1;
    setTimeout(step, charDelay);
  }
  step();
}

function startStoryBgm() {
  if (save.muted) return;
  const audio = el.storyBgmAudio;
  audio.src = encodeURI('StoryBGM/EDBGM.mp3');
  audio.loop = true;
  audio.volume = Math.min(1, 0.35 * BGM.volumeMul());
  audio.currentTime = 0;
  audio.onended = () => {
    if (audio.paused && audio.src) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };
  audio.play().catch(() => {});
}

function stopStoryBgm() {
  el.storyBgmAudio.onended = null;
  el.storyBgmAudio.pause();
}

function playSeThenFadeOut(path, onDone) {
  const fadeMs = 4000;
  const startFade = (audio) => {
    if (audio) {
      const steps = 40;
      const stepMs = fadeMs / steps;
      const baseVolume = audio.volume;
      let i = 0;
      const timer = setInterval(() => {
        i += 1;
        audio.volume = Math.max(0, baseVolume * (1 - i / steps));
        if (i >= steps) {
          clearInterval(timer);
          audio.pause();
        }
      }, stepMs);
    }
    void el.maouStoryImageWrap.offsetWidth;
    el.maouStoryImageWrap.classList.add('maou-story-content-fadeout');
    setTimeout(onDone, fadeMs);
  };

  if (save.muted) {
    startFade(null);
    return;
  }

  const audio = new Audio(encodeURI(path));
  audio.volume = Math.max(0, Math.min(1, SFX.volumeMul()));
  audio.addEventListener('error', () => startFade(null), { once: true });
  audio.addEventListener('ended', () => startFade(audio), { once: true });
  audio.play().catch(() => startFade(audio));
}

function playMaouStoryScene(scenes, onAllDone) {
  el.topbar.classList.add('hidden');
  el.maouStoryScene.classList.remove('hidden');
  startStoryBgm();
  let index = 0;

  function finish() {
    el.maouStoryScene.classList.add('hidden');
    el.maouStoryImageWrap.classList.remove('maou-story-fade-pending', 'maou-story-fade-in', 'maou-story-content-fadeout');
    el.topbar.classList.remove('hidden');
    if (onAllDone) onAllDone();
  }

  function playPages(pages, i, onPagesDone) {
    if (i >= pages.length) {
      onPagesDone();
      return;
    }
    el.maouStoryText.textContent = '';
    typewriterText(el.maouStoryText, pages[i], 160, () => {
      setTimeout(() => playPages(pages, i + 1, onPagesDone), 1800);
    });
  }

  function playNext() {
    if (index >= scenes.length) {
      finish();
      return;
    }
    const scene = scenes[index];
    index += 1;
    el.maouStoryText.textContent = '';

    const afterReveal = () => {
      if (scene.seThenFade) {
        playSeThenFadeOut(scene.seThenFade, finish);
        return;
      }
      if (scene.playSe) SFX.playFile(scene.playSe);
      const holdMs = scene.holdMs != null ? scene.holdMs : 1800;
      setTimeout(() => {
        if (scene.stopBgmAfter) stopStoryBgm();
        if (scene.fadeOutAtEnd) {
          void el.maouStoryScene.offsetWidth;
          el.maouStoryScene.classList.add('maou-story-fadeout');
          setTimeout(finish, 4000);
        } else {
          playNext();
        }
      }, holdMs);
    };

    const showImage = () => {
      el.maouStoryImageWrap.classList.toggle('maou-story-image-large', !!scene.largeImage);
      el.maouStoryImageWrap.innerHTML = scene.image ? `<img src="${encodeURI(scene.image)}" alt="">` : '';
    };

    const revealPagesThenContinue = () => {
      if (scene.pages && scene.pages.length) {
        playPages(scene.pages, 0, afterReveal);
      } else {
        afterReveal();
      }
    };

    if (scene.fadeIn) {
      el.maouStoryImageWrap.classList.remove('maou-story-fade-in');
      el.maouStoryImageWrap.classList.add('maou-story-fade-pending');
      showImage();
      void el.maouStoryImageWrap.offsetWidth;
      el.maouStoryImageWrap.classList.remove('maou-story-fade-pending');
      el.maouStoryImageWrap.classList.add('maou-story-fade-in');
      setTimeout(revealPagesThenContinue, 3000);
    } else {
      el.maouStoryImageWrap.classList.remove('maou-story-fade-pending', 'maou-story-fade-in');
      showImage();
      revealPagesThenContinue();
    }
  }
  playNext();
}

function playMaouVanishSequence() {
  el.maouSideBox.classList.add('maou-victory-flicker');
  setTimeout(() => {
    el.maouSideBox.classList.remove('maou-victory-flicker');
    void el.maouSideBox.offsetWidth;
    el.maouSideBox.classList.add('maou-victory-vanishing');
    setTimeout(() => {
      maouBattlePhase = 'post-victory';
      el.maouNextTurnBtn.textContent = '▶ 次へ';
      el.maouNextTurnBtn.classList.remove('hidden');
    }, 2500 + 1000);
  }, 2000);
}

function resetMaouToEntrance() {
  el.maouBattlePanel.classList.add('hidden');
  el.maouEntrancePanel.classList.remove('hidden');
  el.maouBackRow.classList.remove('hidden');
  renderMaouGate();
  renderMaouCastleScreen();
}

function startMaouBattle() {
  if (save.maouEmblems < MAOU_EMBLEM_REQUIRED) return;
  el.maouEntrancePanel.classList.add('hidden');
  el.maouBattlePanel.classList.remove('hidden');
  el.maouSideBox.classList.remove('maou-victory-flicker', 'maou-victory-vanishing');
  el.maouBackRow.classList.add('hidden');
  el.maouNextTurnBtn.classList.add('hidden');
  el.maouBattleLog.innerHTML = '';
  [el.maouRollHp, el.maouRollStr, el.maouRollDex, el.maouRollSpd].forEach((t) => (t.textContent = '-'));

  maouBattleDisc = {
    hp: save.disciple.hp,
    str: save.disciple.str,
    dex: save.disciple.dex,
    spd: save.disciple.spd,
  };
  el.discRollHp.textContent = maouBattleDisc.hp.toLocaleString();
  el.discRollStr.textContent = maouBattleDisc.str.toLocaleString();
  el.discRollDex.textContent = maouBattleDisc.dex.toLocaleString();
  el.discRollSpd.textContent = maouBattleDisc.spd.toLocaleString();
  el.discipleHpFill.style.width = '100%';
  el.discipleHpText.textContent = `${maouBattleDisc.hp.toLocaleString()} / ${maouBattleDisc.hp.toLocaleString()}`;
  el.maouDiscipleIcon.textContent = save.disciple.icon;
  el.maouDiscipleName.textContent = save.disciple.name;
  el.maouHpFill.style.width = '100%';
  el.maouHpText.textContent = '- / -';

  appendMaouBattleLog('魔王が姿を現した……！');
  maouBattlePhase = 'intro';
  el.maouNextTurnBtn.textContent = '▶ 次へ';
  el.maouNextTurnBtn.classList.remove('hidden');
}

async function beginMaouRoulette() {
  maouBattlePhase = 'rolling';
  el.maouNextTurnBtn.classList.add('hidden');

  const [hp, str, dex, spd] = await Promise.all([
    rollMaouStat(el.maouRollHp, MAOU_STAT_MIN, MAOU_STAT_MAX, 1200),
    rollMaouStat(el.maouRollStr, MAOU_STAT_MIN, MAOU_STAT_MAX, 1200),
    rollMaouStat(el.maouRollDex, MAOU_STAT_MIN, MAOU_STAT_MAX, 1200),
    rollMaouStat(el.maouRollSpd, MAOU_STAT_MIN, MAOU_STAT_MAX, 1200),
  ]);
  let maou = { hp, str, dex, spd };

  await new Promise((r) => setTimeout(r, 800));
  if (save.ricoMet) {
    appendMaouBattleLog('「なんだ！？　魔力が封じられている…！？」');
    await new Promise((r) => setTimeout(r, 600));
    appendMaouBattleLog('「リコの祈りにより魔王の魔力は封じられた！」');
  } else {
    appendMaouBattleLog('禍々しい波動が魔王を包み込んだ……！');
    await new Promise((r) => setTimeout(r, 700));
    maou = {
      hp: maou.hp * MAOU_WAVE_MULTIPLIER,
      str: maou.str * MAOU_WAVE_MULTIPLIER,
      dex: maou.dex * MAOU_WAVE_MULTIPLIER,
      spd: maou.spd * MAOU_WAVE_MULTIPLIER,
    };
    pulseMaouStat(el.maouRollHp, maou.hp);
    pulseMaouStat(el.maouRollStr, maou.str);
    pulseMaouStat(el.maouRollDex, maou.dex);
    pulseMaouStat(el.maouRollSpd, maou.spd);
    await new Promise((r) => setTimeout(r, 600));
  }

  el.maouNextTurnBtn.textContent = '▶ 次へ';
  await waitForMaouBattleClick('intro-wait-1');

  if ((save.maouSealCount || 0) > 0) {
    appendMaouBattleLog('持っていた封紋章が光り出す！');
    await new Promise((r) => setTimeout(r, 700));
    const reduction = MAOU_SEAL_REDUCTION_PER * save.maouSealCount;
    maou = {
      hp: Math.max(1, maou.hp - reduction),
      str: Math.max(1, maou.str - reduction),
      dex: Math.max(1, maou.dex - reduction),
      spd: Math.max(1, maou.spd - reduction),
    };
    pulseMaouStatWeak(el.maouRollHp, maou.hp);
    pulseMaouStatWeak(el.maouRollStr, maou.str);
    pulseMaouStatWeak(el.maouRollDex, maou.dex);
    pulseMaouStatWeak(el.maouRollSpd, maou.spd);
    await new Promise((r) => setTimeout(r, 600));
    appendMaouBattleLog('魔王に変化があったようだ。');
    await new Promise((r) => setTimeout(r, 500));
    appendMaouBattleLog('「なんだこれは……！？」');

    el.maouNextTurnBtn.textContent = '▶ 次へ';
    await waitForMaouBattleClick('intro-wait-2');
  }

  appendMaouBattleLog(`あとは${save.disciple.name}に任せるだけだ。`);
  appendMaouBattleLog('「戦闘開始」を押して戦況を見守ろう。');
  el.maouNextTurnBtn.textContent = '▶ 戦闘開始';
  await waitForMaouBattleClick('intro-wait-3');

  el.maouHpFill.style.width = '100%';
  el.maouHpText.textContent = `${maou.hp.toLocaleString()} / ${maou.hp.toLocaleString()}`;

  const { rounds, win, timeout } = computeMaouBattleRounds(maouBattleDisc, maou);
  let skipTargetIndex = null;
  const skipCandidate = rounds.length - MAOU_BATTLE_SKIP_MARGIN;
  if (skipCandidate > MAOU_BATTLE_PREVIEW_TURNS) skipTargetIndex = skipCandidate;
  maouBattleQueue = {
    rounds,
    index: 0,
    discMaxHp: maouBattleDisc.hp,
    maouMaxHp: maou.hp,
    win,
    timeout,
    skipTargetIndex,
  };
  maouBattlePhase = 'battling';
  el.maouNextTurnBtn.textContent = '▶ 次のターンへ';
  el.maouNextTurnBtn.classList.remove('hidden');
}

function advanceMaouTurn() {
  if (!maouBattleQueue || maouBattleQueue.index >= maouBattleQueue.rounds.length) return;

  if (
    maouBattleQueue.index === MAOU_BATTLE_PREVIEW_TURNS &&
    maouBattleQueue.skipTargetIndex &&
    maouBattleQueue.skipTargetIndex > maouBattleQueue.index &&
    maouBattleQueue.skipTargetIndex < maouBattleQueue.rounds.length
  ) {
    const skipToIndex = maouBattleQueue.skipTargetIndex;
    const skipRound = maouBattleQueue.rounds[skipToIndex - 1];
    maouBattleQueue.index = skipToIndex;
    maouBattleQueue.skipTargetIndex = null;
    el.maouBattleLog.innerHTML = '';
    appendMaouBattleLog('死闘は続く…！');
    const skipDiscPct = Math.max(0, Math.round((skipRound.discHp / maouBattleQueue.discMaxHp) * 100));
    const skipMaouPct = Math.max(0, Math.round((skipRound.maouHp / maouBattleQueue.maouMaxHp) * 100));
    el.discipleHpFill.style.width = `${skipDiscPct}%`;
    el.discipleHpText.textContent = `${skipRound.discHp.toLocaleString()} / ${maouBattleQueue.discMaxHp.toLocaleString()}`;
    el.maouHpFill.style.width = `${skipMaouPct}%`;
    el.maouHpText.textContent = `${skipRound.maouHp.toLocaleString()} / ${maouBattleQueue.maouMaxHp.toLocaleString()}`;
    return;
  }

  const turnNumber = maouBattleQueue.index + 1;
  const round = maouBattleQueue.rounds[maouBattleQueue.index];
  maouBattleQueue.index += 1;
  el.maouBattleLog.innerHTML = '';
  appendMaouBattleLog(`${turnNumber}ターン目`);
  round.events.forEach((ev) => {
    if (ev.actor === 'disciple') {
      appendMaouBattleLog(`${save.disciple.name}の攻撃！ 魔王に${ev.dmg.toLocaleString()}のダメージ`);
    } else {
      appendMaouBattleLog(`魔王の攻撃！ ${save.disciple.name}は${ev.dmg.toLocaleString()}のダメージを受けた`);
    }
  });
  const discPct = Math.max(0, Math.round((round.discHp / maouBattleQueue.discMaxHp) * 100));
  const maouPct = Math.max(0, Math.round((round.maouHp / maouBattleQueue.maouMaxHp) * 100));
  el.discipleHpFill.style.width = `${discPct}%`;
  el.discipleHpText.textContent = `${round.discHp.toLocaleString()} / ${maouBattleQueue.discMaxHp.toLocaleString()}`;
  el.maouHpFill.style.width = `${maouPct}%`;
  el.maouHpText.textContent = `${round.maouHp.toLocaleString()} / ${maouBattleQueue.maouMaxHp.toLocaleString()}`;

  if (maouBattleQueue.index >= maouBattleQueue.rounds.length) {
    el.maouNextTurnBtn.classList.add('hidden');
    const win = maouBattleQueue.win;
    const timeout = maouBattleQueue.timeout;
    maouBattleQueue = null;
    if (win) {
      triggerMaouVictoryFlash();
      setTimeout(() => {
        queueReveal('', '「馬鹿な……何故……何故だ……！\nあのバカ共の力にやられるなんて…！\nそんな事があってはならん……！」');
        queueReveal(
          '',
          '「リュウエン……お前は何を知っている！？\nこれもお前の計算のうちなのか！？\nクソ……クソぉぉぉぉぉぉぉぉぉぉぉぉぉ！！」',
          playMaouVanishSequence,
        );
      }, 500);
    } else if (timeout) {
      triggerMaouDefeatFlash();
      save.maouEmblems = 0;
      persistSave();
      setTimeout(() => {
        queueReveal(
          '……撤退',
          '戦いが長引きすぎたのか、世界が歪む。\n「これ以上ここに居ると闇に呑まれてしまう…！」\n悔しいが、これ以上はここに居られない。\n撤退することにした。',
          undefined,
          true,
        );
        setTimeout(resetMaouToEntrance, 400);
      }, 600);
    } else {
      triggerMaouDefeatFlash();
      save.maouEmblems = 0;
      persistSave();
      setTimeout(() => {
        queueReveal(
          '……敗走',
          `${save.disciple.name}は命からがら、その場から逃げ出した。\n逃げ出した際に魔王の城の扉を開く為に必要な魔王の紋章を落としてしまった。`,
          undefined,
          true,
        );
        setTimeout(resetMaouToEntrance, 400);
      }, 600);
    }
  }
}

let revealQueue = [];
let revealQueueEmptyCallback = null;
function queueReveal(title, desc, onEmptyCallback, noBackdropClose) {
  revealQueue.push({ title, desc, noBackdropClose: !!onEmptyCallback || !!noBackdropClose });
  if (onEmptyCallback) revealQueueEmptyCallback = onEmptyCallback;
  if (revealQueue.length === 1) setTimeout(showNextReveal, 0);
}
function showNextReveal() {
  if (revealQueue.length === 0) return;
  const { title, desc } = revealQueue[0];
  el.simpleRevealTitle.textContent = title;
  el.simpleRevealDesc.textContent = desc;
  el.simpleRevealCloseBtn.textContent = revealQueue.length > 1 ? '次へ' : '閉じる';
  el.simpleRevealPopup.classList.remove('hidden');
}

function checkGodStatueCompletion() {
  if (save.godStatue.completed || save.godStatue.sent < GOD_STATUE_MAX_SENT) return;
  save.godStatue.completed = true;
  pushAnnouncement('⛩️', 'ラグナロクに全ての女神を帰しました');
  persistSave();
  renderAnnouncements();
  renderGodStatue();
  queueReveal('ラグナロクに全ての女神を帰した', '女神像の再建は、もう必要ないようだ……代わりに「女神の園」の復興が始まった。');
  checkMaouGateReveal();
}

function checkDiscipleClassUp() {
  if (save.disciple.classUpped || discipleTotalParams() < DISCIPLE_CLASS_UP_THRESHOLD) return;
  save.disciple.classUpped = true;
  pushAnnouncement('⚔️', `${save.disciple.name}は勇者でした！勇者にクラスアップしました`);
  persistSave();
  renderAnnouncements();
  queueReveal('弟子の様子が…！？', `${save.disciple.name}は勇者だった！勇者にクラスアップした！`);
  checkMaouGateReveal();
}

function checkMaouGateReveal() {
  if (save.maouGateRevealed || !save.disciple.classUpped) return;
  save.maouGateRevealed = true;
  save.maouEmblems = MAOU_EMBLEM_REQUIRED;
  pushAnnouncement('🏰', '勇者が生まれた事で霧が晴れ、魔王城への道が開かれました');
  persistSave();
  renderAnnouncements();
  renderMaouGate();
  queueReveal('魔王城への道', '勇者が生まれた事で霧が晴れ、魔王城への道は開かれた……');
}

let maouEmblemPopupTimer = null;
function showMaouEmblemPopup() {
  el.rareBonusPopup.textContent = `🔱 魔王の紋章を手に入れた！（${Math.min(save.maouEmblems, MAOU_EMBLEM_REQUIRED)}/${MAOU_EMBLEM_REQUIRED}）`;
  el.rareBonusPopup.classList.remove('show');
  void el.rareBonusPopup.offsetWidth;
  el.rareBonusPopup.classList.add('show');
  clearTimeout(maouEmblemPopupTimer);
  clearTimeout(rareBonusTimer);
  maouEmblemPopupTimer = setTimeout(() => el.rareBonusPopup.classList.remove('show'), 1800);
}

function restoreGodStatue() {
  if (save.pt < GOD_STATUE_RESTORE_COST || save.godStatue.restoration >= GOD_STATUE_MAX) return;
  save.pt -= GOD_STATUE_RESTORE_COST;
  save.totalPtSpent += GOD_STATUE_RESTORE_COST;
  save.godStatue.restoration += 1;
  if (save.godStatue.restoration >= GOD_STATUE_MAX) {
    pushAnnouncement('⛩️', '女神像が完全に復活しました');
    renderAnnouncements();
  }
  persistSave();
  refreshTotalPt();
  renderGodStatue();
}

function sendGodStatueToRagnarok() {
  if (save.godStatue.restoration < GOD_STATUE_MAX) return;
  const ok = window.confirm('女神像をラグナロクに送ります。復興状態はリセットされますが、送った数は記録されます。よろしいですか？');
  if (!ok) return;
  save.godStatue.sent += 1;
  save.godStatue.restoration = 0;
  pushAnnouncement('⚔️', `女神像をラグナロクに送りました（+${save.godStatue.sent}）`);
  persistSave();
  renderGodStatue();
  renderAnnouncements();
  SFX.prestige();
  openGodStatueBuffPopup();
}

function isGodBuffMaxed(buffId) {
  if (buffId === 'heart_cost_down') {
    return (save.godStatueBuffs.heartCostReduction || 0) >= (DISCIPLE_HEART_EXP_COST - GOD_STATUE_HEART_COST_FLOOR);
  }
  if (buffId === 'rare_luck') {
    return (save.godStatueBuffs.rareBonusStacks || 0) >= 50;
  }
  return false;
}

function renderGodStatueBuffOptions() {
  el.godBuffOptions.innerHTML = '';
  GOD_STATUE_BUFFS.forEach((buff) => {
    const maxed = isGodBuffMaxed(buff.id);
    const card = document.createElement('div');
    card.className = maxed ? 'god-buff-card maxed' : 'god-buff-card';
    card.innerHTML = `
      <div class="god-buff-name">${buff.name}</div>
      <div class="god-buff-desc">${buff.desc}</div>
      <button class="shop-btn" data-buff="${buff.id}" ${maxed ? 'disabled' : ''}>${maxed ? '効果最大' : '選ぶ'}</button>
    `;
    el.godBuffOptions.appendChild(card);
  });
}

function openGodStatueBuffPopup() {
  renderGodStatueBuffOptions();
  el.godStatueBuffPopup.classList.remove('hidden');
}

function chooseGodStatueBuff(buffId) {
  if (buffId === 'exp_boost') {
    save.godStatueBuffs.expBoostStacks = (save.godStatueBuffs.expBoostStacks || 0) + 1;
    pushAnnouncement('🌟', `女神の祝福「経験の祝福」を授かりました（EXP永続+${save.godStatueBuffs.expBoostStacks * 20}%）`);
  } else if (buffId === 'heart_cost_down') {
    const before = effectiveHeartExpCost();
    save.godStatueBuffs.heartCostReduction = (save.godStatueBuffs.heartCostReduction || 0) + 10;
    const after = effectiveHeartExpCost();
    pushAnnouncement('🌟', `女神の祝福「心の泉」を授かりました（ハート必要EXP ${before}→${after}）`);
  } else if (buffId === 'rare_luck') {
    const current = save.godStatueBuffs.rareBonusStacks || 0;
    if (current < 50) save.godStatueBuffs.rareBonusStacks = current + 1;
    pushAnnouncement('🌟', `女神の祝福「幸運の女神」を授かりました（レア出現率+${Math.min(50, (save.godStatueBuffs.rareBonusStacks || 0))}%）`);
  } else {
    return;
  }
  persistSave();
  el.godStatueBuffPopup.classList.add('hidden');
  renderPlayerCard();
  renderAnnouncements();
  checkGodStatueCompletion();
}

el.godBuffOptions.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-buff]');
  if (!btn) return;
  chooseGodStatueBuff(btn.dataset.buff);
});

el.godStatueBtn.addEventListener('click', () => {
  if (save.godStatue.restoration >= GOD_STATUE_MAX) sendGodStatueToRagnarok();
  else restoreGodStatue();
});
el.godGardenBtn.addEventListener('click', restoreGodGarden);
el.godBlessingBtn.addEventListener('click', receiveGoddessBlessing);
el.simpleRevealCloseBtn.addEventListener('click', () => {
  revealQueue.shift();
  if (revealQueue.length > 0) {
    showNextReveal();
  } else {
    el.simpleRevealPopup.classList.add('hidden');
    if (revealQueueEmptyCallback) {
      const callback = revealQueueEmptyCallback;
      revealQueueEmptyCallback = null;
      setTimeout(callback, 300);
    }
  }
});
el.simpleRevealPopup.addEventListener('click', (e) => {
  if (e.target !== el.simpleRevealPopup) return;
  if (el.simpleRevealCloseBtn.textContent !== '閉じる') return;
  if (revealQueue[0] && revealQueue[0].noBackdropClose) return;
  el.simpleRevealCloseBtn.click();
});

const DISCIPLE_PRICE_HIKE_TIERS = [
  { minValue: 200, multiplier: 100 },
  { minValue: 100, multiplier: 10 },
];

function discipleTotalParams() {
  return save.disciple.hp + save.disciple.str + save.disciple.dex + save.disciple.spd;
}

function disciplePriceMultiplier(statValue) {
  for (const tier of DISCIPLE_PRICE_HIKE_TIERS) {
    if (statValue > tier.minValue) return tier.multiplier;
  }
  return 1;
}

function discipleStepCost(upgradesCount, statValue) {
  return (500 + 100 * upgradesCount) * disciplePriceMultiplier(statValue);
}

function discipleUpgradeCost(stat) {
  return discipleStepCost(save.disciple.upgrades[stat], save.disciple[stat]);
}

function discipleBulkUpgradeCost(stat, count) {
  let cost = 0;
  let upgrades = save.disciple.upgrades[stat];
  let value = save.disciple[stat];
  for (let i = 0; i < count; i++) {
    cost += discipleStepCost(upgrades, value);
    upgrades++;
    value++;
  }
  return cost;
}

function checkDiscipleBulkUnlocks() {
  const total = discipleTotalParams();
  DISCIPLE_BULK_THRESHOLDS.forEach(({ count, minTotal }) => {
    if (total > minTotal && !save.disciple.bulkUnlocked[count]) {
      save.disciple.bulkUnlocked[count] = true;
      pushAnnouncement('💪', `弟子のパラメーター合計が${minTotal}を超えたことで「+${count}」ボタンが追加されました`);
      renderAnnouncements();
    }
  });
}

function upgradeDiscipleStat(stat, count = 1) {
  const cost = discipleBulkUpgradeCost(stat, count);
  if (save.pt < cost) return;
  save.pt -= cost;
  save.totalPtSpent += cost;
  save.disciple.ptSpent += cost;
  save.disciple[stat] += count;
  save.disciple.upgrades[stat] += count;
  save.disciple.strengthenCount += count;
  checkDiscipleBulkUnlocks();
  checkDiscipleClassUp();
  persistSave();
  refreshTotalPt();
  renderDisciple();
}

function effectiveHeartExpCost() {
  return Math.max(GOD_STATUE_HEART_COST_FLOOR, DISCIPLE_HEART_EXP_COST - (save.godStatueBuffs.heartCostReduction || 0));
}

function effectiveDiscipleHeartMax() {
  return save.disciple.heartVesselOwned ? 999 : DISCIPLE_HEART_MAX;
}

function discipleMaxStreak() {
  const s = save.disciple.streaks;
  return Math.max(s.weak || 0, s.normal || 0, s.strong || 0);
}

function checkHeartVesselUnlock() {
  if (save.disciple.heartVesselOwned || save.disciple.heartVesselAnnounced) return;
  if (discipleMaxStreak() <= 1000) return;
  save.disciple.heartVesselAnnounced = true;
  pushAnnouncement('❓', 'ショップに何かが入荷されました');
  renderAnnouncements();
}

function checkBatchBattleReveal() {
  if (save.batchBattleAnnounced) return;
  if (discipleMaxStreak() < 10000) return;
  save.batchBattleAnnounced = true;
  pushAnnouncement('⚡', '10000連勝したことで一括対戦が解放されました');
  renderAnnouncements();
  queueReveal('一括対戦 解放', '10000連勝したことで一括対戦が解放されました');
}

function gainDiscipleHeartExp(exp) {
  const max = effectiveDiscipleHeartMax();
  if (save.disciple.hearts >= max) {
    save.disciple.heartExpProgress = 0;
    return;
  }
  save.disciple.heartExpProgress += exp;
  const cost = effectiveHeartExpCost();
  while (save.disciple.heartExpProgress >= cost && save.disciple.hearts < max) {
    save.disciple.heartExpProgress -= cost;
    save.disciple.hearts += 1;
  }
  if (save.disciple.hearts >= max) save.disciple.heartExpProgress = 0;
}

function godStatueExpMultiplier() {
  return 1 + 0.20 * (save.godStatueBuffs.expBoostStacks || 0);
}

function gainHappyGrassStock(exp) {
  if (save.happyGrassStock >= HAPPY_GRASS_MAX_STOCK) {
    save.happyGrassExpProgress = 0;
    return;
  }
  save.happyGrassExpProgress += exp;
  while (save.happyGrassExpProgress >= HAPPY_GRASS_EXP_PER_STOCK && save.happyGrassStock < HAPPY_GRASS_MAX_STOCK) {
    save.happyGrassExpProgress -= HAPPY_GRASS_EXP_PER_STOCK;
    save.happyGrassStock += 1;
  }
  if (save.happyGrassStock >= HAPPY_GRASS_MAX_STOCK) save.happyGrassExpProgress = 0;
}

function gainExp(amount, opts = {}) {
  const boosted = Math.round(amount * godStatueExpMultiplier());
  if (opts.countsForHappyGrass !== false) gainHappyGrassStock(boosted);
  return addExp(save, boosted);
}

function generateOpponentFromBudget(budget) {
  const weights = [Math.random() + 0.3, Math.random() + 0.3, Math.random() + 0.3, Math.random() + 0.3];
  const sum = weights[0] + weights[1] + weights[2] + weights[3];
  const hp = Math.max(5, Math.round((weights[0] / sum) * budget * 10));
  const str = Math.max(1, Math.round((weights[1] / sum) * budget));
  const dex = Math.max(1, Math.round((weights[2] / sum) * budget));
  const spd = Math.max(1, Math.round((weights[3] / sum) * budget));
  return { hp, str, dex, spd };
}

function rollDiscipleOpponent(tier) {
  const [lo, hi] = tier.budgetRange;
  const budget = lo + Math.random() * (hi - lo);
  const stats = generateOpponentFromBudget(budget);
  const icon = DISCIPLE_OPPONENT_ICONS[Math.floor(Math.random() * DISCIPLE_OPPONENT_ICONS.length)];
  return { ...stats, reward: tier.reward, icon, tierKey: tier.key, tierLabel: tier.label, streakBonus: tier.streakBonus };
}

function simulateDiscipleBattle(player, opponent) {
  const p = { hp: player.hp, str: player.str, dex: player.dex, spd: player.spd };
  const o = { hp: opponent.hp, str: opponent.str, dex: opponent.dex, spd: opponent.spd };
  const playerFirst = p.spd >= o.spd;
  let rounds = 0;
  while (p.hp > 0 && o.hp > 0 && rounds < 200) {
    rounds++;
    const order = playerFirst ? ['p', 'o'] : ['o', 'p'];
    for (const who of order) {
      if (p.hp <= 0 || o.hp <= 0) break;
      if (who === 'p') {
        const hits = Math.max(1, Math.floor(p.spd / Math.max(1, o.spd)));
        const dmg = Math.max(1, p.str - o.dex);
        for (let i = 0; i < hits && o.hp > 0; i++) o.hp -= dmg;
      } else {
        const hits = Math.max(1, Math.floor(o.spd / Math.max(1, p.spd)));
        const dmg = Math.max(1, o.str - p.dex);
        for (let i = 0; i < hits && p.hp > 0; i++) p.hp -= dmg;
      }
    }
  }
  return { win: o.hp <= 0 && p.hp > 0, rounds, playerHpLeft: Math.max(0, p.hp), opponentHpLeft: Math.max(0, o.hp) };
}

let currentDiscipleOpponents = [];

function renderDiscipleStats() {
  el.discipleStats.innerHTML = '';
  const unlockedCounts = [1, ...DISCIPLE_BULK_THRESHOLDS.filter((t) => save.disciple.bulkUnlocked[t.count]).map((t) => t.count)];
  DISCIPLE_STAT_DEFS.forEach(({ key, label }) => {
    const row = document.createElement('div');
    row.className = 'disciple-stat-row';
    const buttonsHtml = unlockedCounts.map((count) => {
      const cost = discipleBulkUpgradeCost(key, count);
      const canAfford = save.pt >= cost;
      return `<button class="disciple-upgrade-btn" data-stat="${key}" data-count="${count}" ${canAfford ? '' : 'disabled'}>+${count}（${cost.toLocaleString()}pt）</button>`;
    }).join('');
    row.innerHTML = `
      <span class="disciple-stat-label">${label}</span>
      <span class="disciple-stat-value">${save.disciple[key]}</span>
      <div class="disciple-upgrade-btns">${buttonsHtml}</div>
    `;
    el.discipleStats.appendChild(row);
  });
}

function renderDisciple() {
  el.discipleIconBtn.textContent = save.disciple.icon;
  el.discipleName.textContent = save.disciple.name;
  renderDiscipleStats();

  const heartCount = save.disciple.hearts;
  el.discipleHearts.textContent = heartCount <= 0
    ? '🖤'
    : heartCount <= DISCIPLE_HEART_INDIVIDUAL_LIMIT
      ? '❤️'.repeat(heartCount)
      : `❤️×${heartCount}`;
  el.discipleBattleBtn.disabled = save.disciple.hearts <= 0;

  const batchUnlocked = discipleMaxStreak() >= 10000;
  el.discipleBatchBattleBtn.classList.toggle('hidden', !batchUnlocked);
  if (batchUnlocked) el.discipleBatchBattleBtn.disabled = save.disciple.hearts <= 0;

  const s = save.disciple.streaks;
  el.discipleStreakSummary.textContent = `🔥 連勝: 弱${s.weak} ／ 普${s.normal} ／ 強${s.strong}`;
}

function renderDiscipleIconPicker() {
  el.discipleIconPicker.innerHTML = '';
  DISCIPLE_ICONS.forEach((icon) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = icon;
    btn.addEventListener('click', () => {
      save.disciple.icon = icon;
      persistSave();
      renderDisciple();
      el.discipleIconPicker.classList.add('hidden');
    });
    el.discipleIconPicker.appendChild(btn);
  });
}

function openDisciplePopup() {
  if (save.disciple.hearts <= 0) return;
  currentDiscipleOpponents = DISCIPLE_TIERS.map(rollDiscipleOpponent);
  renderDiscipleOpponents();
  el.disciplePopup.classList.remove('hidden');
}

function renderDiscipleOpponents() {
  el.discipleBattleResult.classList.add('hidden');
  el.discipleOpponents.classList.remove('hidden');
  el.discipleOpponents.innerHTML = '';
  currentDiscipleOpponents.forEach((opp, idx) => {
    const streak = save.disciple.streaks[opp.tierKey] || 0;
    const bonusSteps = Math.floor(streak / DISCIPLE_STREAK_STEP);
    const currentReward = opp.reward + bonusSteps * opp.streakBonus;
    const card = document.createElement('div');
    card.className = 'opponent-card';
    card.innerHTML = `
      <div class="opponent-icon">${opp.icon}</div>
      <div class="opponent-stats-grid">
        <div class="opponent-stat"><span class="opponent-stat-label">HP</span><span class="opponent-stat-value">${opp.hp}</span></div>
        <div class="opponent-stat"><span class="opponent-stat-label">STR</span><span class="opponent-stat-value">${opp.str}</span></div>
        <div class="opponent-stat"><span class="opponent-stat-label">DEX</span><span class="opponent-stat-value">${opp.dex}</span></div>
        <div class="opponent-stat"><span class="opponent-stat-label">SPD</span><span class="opponent-stat-value">${opp.spd}</span></div>
      </div>
      ${streak > 0 ? `<div class="opponent-streak">🔥 ${streak}連勝中</div>` : ''}
      <div class="opponent-reward">勝利報酬 +${currentReward}pt</div>
      <button class="shop-btn" data-idx="${idx}">挑む</button>
      <div class="opponent-key-hint">${['S', 'D', 'F'][idx] || ''}</div>
    `;
    el.discipleOpponents.appendChild(card);
  });
}

function fightDiscipleOpponent(opp) {
  if (!opp || save.disciple.hearts <= 0) return;
  save.disciple.hearts -= 1;
  save.disciple.battleCount += 1;
  const result = simulateDiscipleBattle(save.disciple, opp);
  let earned = 0;
  let streakAfter = 0;
  if (result.win) {
    save.disciple.battleWins += 1;
    const streakBefore = save.disciple.streaks[opp.tierKey] || 0;
    const bonusSteps = Math.floor(streakBefore / DISCIPLE_STREAK_STEP);
    earned = opp.reward + bonusSteps * opp.streakBonus;
    streakAfter = streakBefore + 1;
    save.disciple.streaks[opp.tierKey] = streakAfter;
    checkHeartVesselUnlock();
    checkBatchBattleReveal();
    save.pt += earned;
    save.totalPtEarned += earned;
    save.disciple.ptEarned += earned;
  } else {
    save.disciple.streaks[opp.tierKey] = 0;
  }
  persistSave();
  refreshTotalPt();
  renderDisciple();
  renderPlayerCard();
  showDiscipleBattleResult(result, earned, opp, streakAfter);
}

function batchFightStrongOpponents() {
  if (discipleMaxStreak() <= 10000) return;
  const heartsToUse = save.disciple.hearts;
  if (heartsToUse <= 0) return;

  const strongTier = DISCIPLE_TIERS.find((t) => t.key === 'strong');
  const streakBefore = save.disciple.streaks.strong || 0;
  const ptBefore = save.pt;

  let streak = streakBefore;
  let ptEarned = 0;
  let wins = 0;

  for (let i = 0; i < heartsToUse; i++) {
    const opp = rollDiscipleOpponent(strongTier);
    const result = simulateDiscipleBattle(save.disciple, opp);
    if (result.win) {
      wins += 1;
      const bonusSteps = Math.floor(streak / DISCIPLE_STREAK_STEP);
      ptEarned += opp.reward + bonusSteps * opp.streakBonus;
      streak += 1;
    } else {
      streak = 0;
    }
  }

  save.disciple.hearts = 0;
  save.disciple.battleCount += heartsToUse;
  save.disciple.battleWins += wins;
  save.disciple.streaks.strong = streak;
  save.pt += ptEarned;
  save.totalPtEarned += ptEarned;
  save.disciple.ptEarned += ptEarned;
  checkHeartVesselUnlock();
  persistSave();
  refreshTotalPt();
  renderDisciple();
  renderPlayerCard();

  queueReveal(
    '一括対戦 完了',
    `連勝数：${streakBefore.toLocaleString()}→${streak.toLocaleString()}\n所持pt：${Math.floor(ptBefore).toLocaleString()}pt→${Math.floor(save.pt).toLocaleString()}pt`,
  );
}

function showDiscipleBattleResult(result, earned, opp, streakAfter) {
  el.discipleOpponents.classList.add('hidden');
  el.discipleBattleResult.classList.remove('hidden');
  const streakLine = result.win
    ? `<div class="battle-streak">🔥 ${opp.tierLabel}相手に${streakAfter}連勝中</div>`
    : '';
  el.discipleBattleResult.innerHTML = result.win
    ? `<div class="battle-win">🎉 勝利！ +${earned}pt</div>${streakLine}<div class="battle-detail">${result.rounds}ターンで撃破(残りHP ${result.playerHpLeft})</div>`
    : `<div class="battle-lose">💀 敗北……</div><div class="battle-detail">${result.rounds}ターンで力尽きた（連勝記録はリセット）</div>`;
  if (save.disciple.hearts > 0) {
    const again = document.createElement('button');
    again.type = 'button';
    again.className = 'choice-btn';
    again.innerHTML = 'もう一度対戦相手を選ぶ <span class="key-hint">S/D/F</span>';
    again.addEventListener('click', openDisciplePopup);
    el.discipleBattleResult.appendChild(again);
  }
}

el.discipleIconBtn.addEventListener('click', () => {
  if (el.discipleIconPicker.classList.contains('hidden')) renderDiscipleIconPicker();
  el.discipleIconPicker.classList.toggle('hidden');
});

el.discipleRenameBtn.addEventListener('click', () => {
  const name = window.prompt('弟子の名前を入力してください', save.disciple.name);
  if (name && name.trim()) {
    save.disciple.name = name.trim().slice(0, 12);
    persistSave();
    renderDisciple();
  }
});

el.discipleStats.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-stat]');
  if (!btn) return;
  upgradeDiscipleStat(btn.dataset.stat, parseInt(btn.dataset.count || '1', 10));
});

function enableBackdropClose(popup, canCloseFn, onClose) {
  popup.addEventListener('click', (e) => {
    if (e.target !== popup) return;
    if (canCloseFn && !canCloseFn()) return;
    popup.classList.add('hidden');
    if (onClose) onClose();
  });
}

el.discipleBattleBtn.addEventListener('click', openDisciplePopup);
el.discipleBatchBattleBtn.addEventListener('click', batchFightStrongOpponents);
el.disciplePopupCloseBtn.addEventListener('click', () => el.disciplePopup.classList.add('hidden'));
enableBackdropClose(el.disciplePopup);
el.ricoCompleteCloseBtn.addEventListener('click', () => {
  el.ricoCompletePopup.classList.add('hidden');
  renderShopList();
});
enableBackdropClose(el.ricoCompletePopup, null, renderShopList);

el.openAnnouncementHistoryBtn.addEventListener('click', () => {
  renderAnnouncementHistory();
  el.announcementHistoryPopup.classList.remove('hidden');
});
el.announcementHistoryCloseBtn.addEventListener('click', () => el.announcementHistoryPopup.classList.add('hidden'));
enableBackdropClose(el.announcementHistoryPopup);

el.openChangelogBtn.addEventListener('click', () => {
  renderChangelog();
  el.changelogPopup.classList.remove('hidden');
});
el.changelogCloseBtn.addEventListener('click', () => el.changelogPopup.classList.add('hidden'));
enableBackdropClose(el.changelogPopup);

el.openHelpBtn.addEventListener('click', () => {
  save.helpManualOpens = (save.helpManualOpens || 0) + 1;
  persistSave();
  if (save.helpManualOpens === 100) {
    pushAnnouncement('😰', '実績「疑心暗鬼」が解放されました。');
    renderAnnouncements();
    renderAchievements();
    queueReveal('', 'まだ何か分らないことがありますか？\n実績「疑心暗鬼」が解放されました。');
  } else {
    showHelpPopup();
  }
});
el.helpCloseBtn.addEventListener('click', () => el.helpPopup.classList.add('hidden'));
enableBackdropClose(el.helpPopup);

el.secretKeyboardIcon.addEventListener('click', () => {
  const clicks = save.secretKeyboardClicks || 0;
  if (clicks >= 100) return;
  save.secretKeyboardClicks = clicks + 1;
  persistSave();
  if (save.secretKeyboardClicks <= 99) {
    queueReveal('', SECRET_KEYBOARD_LINES[save.secretKeyboardClicks - 1]);
  } else {
    pushAnnouncement('😝', '実績「くだらないギミックのクリックを頑張ったで賞」が解放されました。');
    renderAnnouncements();
    renderAchievements();
    queueReveal('勘弁して下さい', '実績「くだらないギミックのクリックを頑張ったで賞」が解放されました。');
  }
});

el.topLogo.addEventListener('click', handleLogoClick);

el.openSettingsBtn.addEventListener('click', () => {
  el.exportSaveText.value = exportSaveString();
  el.importSaveText.value = '';
  el.bgmVolumeSlider.value = save.settings.bgmVolume;
  el.bgmVolumeValue.textContent = save.settings.bgmVolume;
  el.seVolumeSlider.value = save.settings.seVolume;
  el.seVolumeValue.textContent = save.settings.seVolume;
  el.frameSettingSection.classList.toggle('hidden', !save.maouDefeated);
  el.typingFrameSelect.value = save.settings.typingFrame;
  el.settingsPopup.classList.remove('hidden');
});
el.settingsCloseBtn.addEventListener('click', () => el.settingsPopup.classList.add('hidden'));
el.phase2AnnounceCloseBtn.addEventListener('click', () => {
  el.phase2AnnouncePopup.classList.add('hidden');
  el.topbar.classList.remove('hidden');
  goHome();
});
enableBackdropClose(el.settingsPopup);
el.bgmVolumeSlider.addEventListener('input', () => {
  save.settings.bgmVolume = parseInt(el.bgmVolumeSlider.value, 10);
  el.bgmVolumeValue.textContent = save.settings.bgmVolume;
  persistSave();
  if (el.customBgmAudio && !el.customBgmAudio.paused) {
    el.customBgmAudio.volume = Math.min(1, 0.35 * (save.settings.bgmVolume / 50));
  }
});
el.seVolumeSlider.addEventListener('input', () => {
  save.settings.seVolume = parseInt(el.seVolumeSlider.value, 10);
  el.seVolumeValue.textContent = save.settings.seVolume;
  persistSave();
  SFX.correct();
});
el.typingFrameSelect.addEventListener('change', () => {
  save.settings.typingFrame = el.typingFrameSelect.value;
  persistSave();
  el.typingStage.classList.toggle('maou-aura', isMaouAuraFrameActive());
  renderDungeonBadges();
});
el.exportSaveBtn.addEventListener('click', downloadSaveFile);
el.importSaveFileBtn.addEventListener('click', () => el.importSaveFile.click());
el.importSaveFile.addEventListener('change', () => {
  const file = el.importSaveFile.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => importSaveFromText(String(reader.result));
  reader.readAsText(file);
  el.importSaveFile.value = '';
});
el.importSaveTextBtn.addEventListener('click', () => {
  if (!el.importSaveText.value.trim()) return;
  importSaveFromText(el.importSaveText.value);
});
el.discipleOpponents.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-idx]');
  if (!btn) return;
  const opp = currentDiscipleOpponents[parseInt(btn.dataset.idx, 10)];
  if (opp) fightDiscipleOpponent(opp);
});

function renderEquipmentSummary() {
  const sword = getEquippedSword();
  const shield = getEquippedShield();
  const armor = getEquippedArmor();
  const ring = getEquippedRing();
  const rows = [
    ['剣', sword, sword ? `${sword.name}（${swordEffectLabel(sword)}）` : '未装備', 'sword'],
    ['盾', shield, shield ? `${shield.name}（${shieldEffectLabel(shield)}）` : '未装備', 'shield'],
    ['鎧', armor, `${armor.name}（${armorEffectLabel(armor)}）`, 'armor'],
    ['指輪', ring, ring ? `${ring.name}（${ringEffectLabel(ring)}）` : '未装備', 'ring'],
  ];
  el.equipmentSummary.innerHTML = '';

  if (save.ricoUnlocked && !save.maouDefeated) {
    const shardRow = document.createElement('div');
    shardRow.className = 'equip-row rico-shard-row';
    shardRow.innerHTML = `<span class="equip-label">✨ リコの欠片</span><span class="equip-value">${Math.floor(save.ricoShards).toLocaleString()}</span>`;
    el.equipmentSummary.appendChild(shardRow);
  }

  if (save.ricoTabletFound) {
    const prayerRow = document.createElement('div');
    prayerRow.className = 'equip-row rico-prayer-row';
    if (save.maouDefeated) {
      prayerRow.innerHTML = `<span class="equip-label">🙏 リコの位牌</span><span class="equip-right"><button class="equip-strengthen-btn" data-action="pray">祈る</button></span>`;
    } else {
      const canPray = save.ricoShards >= RICO_PRAYER_COST && (save.maouPrayerCharges || 0) < RICO_PRAYER_MAX_CHARGES;
      const prayerSuper = (save.maouPrayerCharges || 0) >= RICO_PRAYER_CHARGE_SUPER_THRESHOLD;
      const prayerLabel = prayerSuper ? '超・祈りの加護' : '祈りの加護';
      prayerRow.innerHTML = `<span class="equip-label">🙏 リコの位牌</span><span class="equip-right"><span class="equip-value${prayerSuper ? ' stat-glow-yellow' : ''}">${prayerLabel} ${save.maouPrayerCharges || 0}</span><button class="equip-strengthen-btn" data-action="pray" ${canPray ? '' : 'disabled'}>祈る（${RICO_PRAYER_COST.toLocaleString()}）</button></span>`;
    }
    el.equipmentSummary.appendChild(prayerRow);
  }

  rows.forEach(([label, item, text, slot]) => {
    const row = document.createElement('div');
    row.className = 'equip-row';
    let strengthenHtml = '';
    if (item && item.rico) {
      if (isRicoMaxed(slot)) {
        strengthenHtml = '<button class="equip-strengthen-btn" disabled>✨成長限界</button>';
      } else {
        const cost = ricoStrengthenCost(slot);
        const canAfford = save.ricoShards >= cost;
        strengthenHtml = `<button class="equip-strengthen-btn" data-slot="${slot}" ${canAfford ? '' : 'disabled'}>✨強化（${cost.toLocaleString()}）</button>`;
      }
    }
    row.innerHTML = `<span class="equip-label">${label}</span><span class="equip-right"><span class="equip-value">${text}</span>${strengthenHtml}</span>`;
    el.equipmentSummary.appendChild(row);
  });
}

el.equipmentSummary.addEventListener('click', (e) => {
  const strengthenBtn = e.target.closest('button[data-slot]');
  if (strengthenBtn) {
    strengthenRicoItem(strengthenBtn.dataset.slot);
    return;
  }
  const prayBtn = e.target.closest('button[data-action="pray"]');
  if (prayBtn) prayAtRicoTablet();
});

function renderIconPicker() {
  el.iconPicker.innerHTML = '';
  const entries = [
    ...ICON_CATALOG.free.map((icon) => ({ icon, owned: true })),
    ...ICON_CATALOG.shop.map((i) => ({ icon: i.icon, owned: save.inventory.icons.includes(i.id) })),
  ];
  entries.forEach(({ icon, owned }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = owned ? icon : '🔒';
    btn.disabled = !owned;
    if (!owned) {
      btn.title = 'ショップで購入するとアイコンが選べます';
      btn.classList.add('locked');
    } else {
      btn.addEventListener('click', () => {
        save.profile.icon = icon;
        persistSave();
        renderPlayerCard();
        el.iconPicker.classList.add('hidden');
      });
    }
    el.iconPicker.appendChild(btn);
  });
}

function renderDungeonBadges() {
  Object.keys(DUNGEONS).forEach((mode) => {
    const badge = document.getElementById(`bestBadge-${mode}`);
    if (!badge) return;
    const rank = save.bestRankByKey[`${currentLang}:${mode}`];
    badge.textContent = rank ? `Best: ${rank}` : '';
  });
  const maouAuraStoryActive = save.maouGateRevealed && !save.maouDefeated;
  el.dungeonGrid.classList.toggle('maou-aura', isMaouAuraFrameActive());
  el.dungeonSelectHeading.textContent = maouAuraStoryActive
    ? 'ダンジョン選択（魔王が現れた事で魔王紋章ドロップ）'
    : 'ダンジョン選択';
}

function renderAnnouncements() {
  el.announcementsList.innerHTML = '';
  if (save.announcements.length === 0) {
    el.announcementsList.innerHTML = '<div class="announcement-empty">まだお知らせはありません。プレイして実績を解放しよう。</div>';
    return;
  }
  save.announcements.slice(0, 5).forEach((a) => {
    const row = document.createElement('div');
    row.className = 'announcement-row';
    row.innerHTML = `<span>${a.icon}</span><span>${a.text}</span>`;
    el.announcementsList.appendChild(row);
  });
}

function pushAnnouncement(icon, text) {
  save.announcements.unshift({ ts: Date.now(), icon, text });
  if (save.announcements.length > ANNOUNCEMENT_HISTORY_MAX) save.announcements.length = ANNOUNCEMENT_HISTORY_MAX;
}

function formatTimestamp(ts) {
  const date = new Date(ts);
  return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function renderAnnouncementHistory() {
  el.announcementHistoryList.innerHTML = '';
  el.announcementHistoryEmpty.classList.toggle('hidden', save.announcements.length > 0);
  save.announcements.forEach((a) => {
    const row = document.createElement('div');
    row.className = 'announcement-history-row';
    row.innerHTML = `
      <span class="announcement-history-icon">${a.icon}</span>
      <span class="announcement-history-body">
        <span class="announcement-history-text">${a.text}</span>
        <span class="announcement-history-ts">${formatTimestamp(a.ts)}</span>
      </span>
    `;
    el.announcementHistoryList.appendChild(row);
  });
}

function renderChangelog() {
  el.changelogList.innerHTML = '';
  CHANGELOG.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'changelog-entry';
    const items = entry.items.map((i) => `<li>${i}</li>`).join('');
    card.innerHTML = `<div class="changelog-version">${entry.version}</div><ul class="changelog-items">${items}</ul>`;
    el.changelogList.appendChild(card);
  });
}

el.profileIconBtn.addEventListener('click', () => {
  if (el.iconPicker.classList.contains('hidden')) renderIconPicker();
  el.iconPicker.classList.toggle('hidden');
});

el.renameBtn.addEventListener('click', () => {
  const name = window.prompt('プレイヤー名を入力してください', save.profile.name);
  if (name && name.trim()) {
    save.profile.name = name.trim().slice(0, 16);
    persistSave();
    renderPlayerCard();
  }
});

function checkReincarnationNecklaceReveal() {
  if (save.reincarnationNecklaceAnnounced || save.eternalComboUnlocked) return;
  if (save.prestige < 1) return;
  save.reincarnationNecklaceAnnounced = true;
  pushAnnouncement('🔄', 'ショップに新商品が入荷しました');
  persistSave();
  renderAnnouncements();
  queueReveal(
    '新商品入荷',
    'ショップに「輪廻のネックレス」が入荷しました。\n永続コンボシステムを開放するアイテムです。',
  );
}

el.prestigeBtn.addEventListener('click', () => {
  if (!canPrestige(save)) return;
  const ok = window.confirm('転生すると Lv.1 に戻ります。pt・実績・履歴は引き継がれます。よろしいですか？');
  if (!ok) return;
  const { newTiers } = doPrestige(save);
  pushAnnouncement('🌟', `転生 +${save.prestige} を達成しました`);
  persistSave();
  renderPlayerCard();
  renderAnnouncements();
  SFX.prestige();
  newTiers.forEach((tier) => {
    pushAnnouncement('✨', `眠っていた力が目覚めました（pt倍率+${tier.ptBonus}・以後の経験値テーブルが${tier.expMultiplier}倍）`);
    renderAnnouncements();
    queueReveal(
      '体が眩く光り出す…！',
      `眠っていた力が目覚めたようだ。\n※pt倍率に+${tier.ptBonus}されました\n※以後の経験値テーブルが${tier.expMultiplier}倍になりました`,
    );
  });
  checkReincarnationNecklaceReveal();
});

el.dungeonGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-mode]');
  if (!btn) return;
  currentMode = btn.dataset.mode;
  [...el.dungeonGrid.children].forEach((b) => b.classList.toggle('active', b === btn));
});

el.muteBtn.addEventListener('click', () => {
  save.muted = !save.muted;
  persistSave();
  refreshMuteBtn();
  if (save.muted) {
    BGM.stop();
  } else if (screen === 'game') {
    BGM.start(currentMode);
  }
});

el.startBtn.addEventListener('click', startSession);
el.retryBtn.addEventListener('click', startSession);
el.homeBtn.addEventListener('click', goHome);
el.openStatsBtn.addEventListener('click', () => {
  renderStats();
  setScreen('stats');
});
el.statsBackBtn.addEventListener('click', goHome);
el.openHistoryBtn.addEventListener('click', () => {
  renderHistory();
  setScreen('history');
});
el.historyBackBtn.addEventListener('click', goHome);
el.openShopBtn.addEventListener('click', () => {
  renderShop();
  setScreen('shop');
});
el.shopBackBtn.addEventListener('click', goHome);
el.openMaouBtn.addEventListener('click', () => {
  resetMaouToEntrance();
  setScreen('maou');
});
el.maouBackBtn.addEventListener('click', goHome);
el.eternalComboHud.addEventListener('click', resetEternalCombo);
el.maouAttackBtn.addEventListener('click', () => {
  if (save.maouEmblems < MAOU_EMBLEM_REQUIRED) return;
  startMaouBattle();
});
el.maouCraftSealBtn.addEventListener('click', craftMaouSeal);
el.maouNextTurnBtn.addEventListener('click', () => {
  if (maouBattlePhase === 'intro') {
    beginMaouRoulette();
  } else if (maouBattleClickResolve) {
    const resolve = maouBattleClickResolve;
    maouBattleClickResolve = null;
    el.maouNextTurnBtn.classList.add('hidden');
    resolve();
  } else if (maouBattlePhase === 'battling') {
    advanceMaouTurn();
  } else if (maouBattlePhase === 'post-victory') {
    el.maouNextTurnBtn.classList.add('hidden');
    playMaouStoryScene(getMaouStoryScenes(), () => {
      el.maouSideBox.classList.remove('maou-victory-flicker', 'maou-victory-vanishing');
      save.maouDefeated = true;
      pushAnnouncement('💀', '魔王を討伐しました');
      pushAnnouncement('🍃', 'リコはあの場所を去りました');
      pushAnnouncement('🌌', 'ENDLESS TYPE-LOOP Phase2に突入しました');
      renderAnnouncements();
      persistSave();
      updateLogos();
      resetMaouToEntrance();
      setScreen('blank');
      el.topbar.classList.add('hidden');
      setTimeout(showPhase2Announcement, 1500);
    });
  }
});
el.shopTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-tab]');
  if (!btn) return;
  currentShopTab = btn.dataset.tab;
  [...el.shopTabs.children].forEach((b) => b.classList.toggle('active', b === btn));
  renderShopList();
});
el.shopItemList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const { action, itemId, tab } = btn.dataset;
  const effectiveTab = tab || currentShopTab;
  if (action === 'buy') buyItem(effectiveTab, itemId);
  if (action === 'equip') equipItem(effectiveTab, itemId);
  if (action === 'use-item') buyConsumableItem(itemId);
  if (action === 'bulk-buy-item') bulkBuyItem(itemId);
});

const SHOP_CATALOGS = {
  sword: SWORD_CATALOG,
  shield: SHIELD_CATALOG,
  armor: ARMOR_CATALOG,
  ring: RING_CATALOG,
  titleFront: TITLE_FRONT_CATALOG,
  titleBack: TITLE_BACK_CATALOG,
  bgm: BGM_CATALOG,
};
const SHOP_INVENTORY_KEYS = { sword: 'swords', shield: 'shields', armor: 'armors', ring: 'rings', titleFront: 'titleFronts', titleBack: 'titleBacks', bgm: 'bgm' };
const SHOP_EQUIP_KEYS = { sword: 'swordId', shield: 'shieldId', armor: 'armorId', ring: 'ringId', titleFront: 'titleFrontId', titleBack: 'titleBackId', bgm: 'bgmId' };

function shopItemEffectLabel(tab, item) {
  if (tab === 'sword') return swordEffectLabel(item);
  if (tab === 'shield') return shieldEffectLabel(item);
  if (tab === 'armor') return armorEffectLabel(item);
  if (tab === 'ring') return ringEffectLabel(item);
  if (tab === 'bgm') return item.credit ? `♪ ${item.credit}` : '';
  return '';
}

function isOwned(tab, itemId) {
  if (tab === 'icon') return save.inventory.icons.includes(itemId);
  const key = SHOP_INVENTORY_KEYS[tab];
  return save.inventory[key].includes(itemId);
}

function buyItem(tab, itemId) {
  if (tab === 'icon') {
    const item = ICON_CATALOG.shop.find((i) => i.id === itemId);
    if (!item || isOwned('icon', itemId)) return;
    if (save.pt < item.price) return;
    save.pt -= item.price;
    save.totalPtSpent += item.price;
    save.inventory.icons.push(itemId);
    refreshTotalPt();
    checkRicoUnlock();
    equipItem('icon', itemId);
    return;
  }
  const catalog = SHOP_CATALOGS[tab];
  const item = catalog.find((i) => i.id === itemId);
  if (!item || isOwned(tab, itemId)) return;
  if (save.pt < item.price) return;
  save.pt -= item.price;
  save.totalPtSpent += item.price;
  save.inventory[SHOP_INVENTORY_KEYS[tab]].push(itemId);
  refreshTotalPt();
  checkRicoUnlock();
  equipItem(tab, itemId);
}

function equipItem(tab, itemId) {
  if (tab === 'icon') {
    if (!isOwned('icon', itemId)) return;
    const item = ICON_CATALOG.shop.find((i) => i.id === itemId);
    if (!item) return;
    save.profile.icon = item.icon;
    persistSave();
    renderPlayerCard();
    renderShopList();
    return;
  }
  if (!isOwned(tab, itemId)) return;
  save.equipment[SHOP_EQUIP_KEYS[tab]] = itemId;
  persistSave();
  renderPlayerCard();
  renderShopList();
}

const BULK_BUY_ITEM_IDS = ['item_fairy_dust', 'item_happy_grass'];
const BULK_BUY_THRESHOLD = 500;

function trackItemPurchase(itemId) {
  if (!BULK_BUY_ITEM_IDS.includes(itemId)) return;
  save.itemPurchaseCounts = save.itemPurchaseCounts || {};
  save.itemPurchaseCounts[itemId] = (save.itemPurchaseCounts[itemId] || 0) + 1;
}

function buyConsumableItem(itemId) {
  const item = ITEM_CATALOG.find((i) => i.id === itemId);
  if (!item) return;

  if (item.effect === 'heart_cap_up') {
    if (save.disciple.heartVesselOwned) return;
    if (save.pt < item.price) return;
    save.pt -= item.price;
    save.totalPtSpent += item.price;
    save.disciple.heartVesselOwned = true;
    pushAnnouncement('❤️', `「${item.name}」を手に入れました！弟子のハート上限が${item.value}になりました`);
    SFX.complete();
    persistSave();
    refreshTotalPt();
    renderPlayerCard();
    renderAnnouncements();
    renderShopList();
    renderHeartHud();
    return;
  }

  if (item.effect === 'unlock_eternal_combo') {
    if (save.eternalComboUnlocked) return;
    if (save.pt < item.price) return;
    save.pt -= item.price;
    save.totalPtSpent += item.price;
    save.eternalComboUnlocked = true;
    pushAnnouncement('🔄', `「${item.name}」を手に入れました！永続コンボシステムが解放されました`);
    SFX.complete();
    persistSave();
    refreshTotalPt();
    renderPlayerCard();
    renderAnnouncements();
    renderShopList();
    renderEternalCombo();
    return;
  }

  if (item.effect === 'easter_egg_dev_contact') {
    if (save.mechanicalEggOwned) return;
    if (save.pt < item.price) return;
    save.pt -= item.price;
    save.totalPtSpent += item.price;
    save.mechanicalEggOwned = true;
    SFX.complete();
    persistSave();
    refreshTotalPt();
    renderShopList();
    return;
  }

  if (item.stackable) {
    const owned = save.inventory.consumables[itemId] || 0;
    if (owned >= item.maxStack) return;
    if (save.pt < item.price) return;
    save.pt -= item.price;
    save.totalPtSpent += item.price;
    save.inventory.consumables[itemId] = owned + 1;
    trackItemPurchase(itemId);
    SFX.correct();
    persistSave();
    refreshTotalPt();
    renderShopList();
    return;
  }

  if (item.hasShopStock && save.happyGrassStock <= 0) return;
  if (save.pt < item.price) return;
  save.pt -= item.price;
  save.totalPtSpent += item.price;
  if (item.hasShopStock) save.happyGrassStock -= 1;
  trackItemPurchase(itemId);

  if (item.effect === 'exp') {
    const levelBefore = save.level;
    const levelsGained = addExp(save, item.value);
    if (levelsGained.length > 0) {
      pushAnnouncement('🎉', `Lv.${levelBefore} → Lv.${save.level} に到達しました`);
      showLevelUpPopup(save.level);
    }
  }

  SFX.complete();
  persistSave();
  refreshTotalPt();
  renderPlayerCard();
  renderAnnouncements();
  renderShopList();
}

function bulkBuyItem(itemId) {
  const item = ITEM_CATALOG.find((i) => i.id === itemId);
  if (!item) return;
  if (((save.itemPurchaseCounts && save.itemPurchaseCounts[itemId]) || 0) < BULK_BUY_THRESHOLD) return;

  if (item.stackable) {
    let bought = 0;
    while (true) {
      const owned = save.inventory.consumables[itemId] || 0;
      if (owned >= item.maxStack) break;
      if (save.pt < item.price) break;
      save.pt -= item.price;
      save.totalPtSpent += item.price;
      save.inventory.consumables[itemId] = owned + 1;
      trackItemPurchase(itemId);
      bought += 1;
    }
    if (bought === 0) return;
    SFX.correct();
    persistSave();
    refreshTotalPt();
    renderShopList();
    return;
  }

  const levelBefore = save.level;
  let used = 0;
  while (true) {
    if (item.hasShopStock && save.happyGrassStock <= 0) break;
    if (save.pt < item.price) break;
    save.pt -= item.price;
    save.totalPtSpent += item.price;
    if (item.hasShopStock) save.happyGrassStock -= 1;
    trackItemPurchase(itemId);
    if (item.effect === 'exp') addExp(save, item.value);
    used += 1;
  }
  if (used === 0) return;
  if (save.level > levelBefore) {
    pushAnnouncement('🎉', `Lv.${levelBefore} → Lv.${save.level} に到達しました`);
    showLevelUpPopup(save.level);
  }
  SFX.complete();
  persistSave();
  refreshTotalPt();
  renderPlayerCard();
  renderAnnouncements();
  renderShopList();
}

function itemEffectLabel(item) {
  if (item.effect === 'exp') return `即座にEXP+${item.value}`;
  if (item.effect === 'rare_chance_next_game') return `次のゲームでレア出現率+${Math.round(item.value * 100)}%`;
  if (item.effect === 'heart_cap_up') return `弟子のハート上限が${item.value}になる（永続）`;
  if (item.effect === 'unlock_eternal_combo') return '永続コンボシステムを開放する';
  if (item.effect === 'easter_egg_dev_contact') return 'この画面を開けた方は開発者へご連絡下さい';
  return '';
}

function renderItemShop() {
  el.shopItemList.innerHTML = '';
  ITEM_CATALOG.forEach((item) => {
    const isHeartVessel = item.effect === 'heart_cap_up';
    const isEternalCombo = item.effect === 'unlock_eternal_combo';
    const isMechanicalEgg = item.effect === 'easter_egg_dev_contact';
    const oneTimeOwned = (isHeartVessel && save.disciple.heartVesselOwned)
      || (isEternalCombo && save.eternalComboUnlocked)
      || (isMechanicalEgg && save.mechanicalEggOwned);
    if (item.requiresDiscipleStreak && !oneTimeOwned && discipleMaxStreak() <= item.requiresDiscipleStreak) return;
    if (item.requiresPrestige && !oneTimeOwned && save.prestige < item.requiresPrestige) return;

    const owned = oneTimeOwned ? 1 : (item.stackable ? (save.inventory.consumables[item.id] || 0) : 0);
    const maxed = oneTimeOwned || (item.stackable && owned >= item.maxStack);
    const outOfStock = item.hasShopStock && save.happyGrassStock <= 0;
    const canAfford = save.pt >= item.price;
    const disabled = maxed || outOfStock || !canAfford;
    let btnLabel = '購入';
    if (maxed) btnLabel = '所持済';
    else if (outOfStock) btnLabel = '在庫切れ';
    else if (!canAfford) btnLabel = 'pt不足';
    const bulkUnlocked = BULK_BUY_ITEM_IDS.includes(item.id)
      && ((save.itemPurchaseCounts && save.itemPurchaseCounts[item.id]) || 0) >= BULK_BUY_THRESHOLD;
    const row = document.createElement('div');
    row.className = (isHeartVessel || isEternalCombo) ? 'shop-item shop-item-rico' : 'shop-item';
    row.innerHTML = `
      <div class="shop-item-main">
        <span class="shop-item-name">${item.name}</span>
        <span class="shop-item-effect">（${itemEffectLabel(item)}）</span>
        ${item.stackable ? `<span class="shop-item-owned">所持: ${owned}/${item.maxStack}</span>` : ''}
        ${item.hasShopStock ? `<span class="shop-item-owned">在庫: ${save.happyGrassStock}/${HAPPY_GRASS_MAX_STOCK}</span>` : ''}
      </div>
      <div class="shop-item-side">
        <span class="shop-item-price">${oneTimeOwned ? '所持済' : `${item.price.toLocaleString()} pt`}</span>
        <button class="shop-btn" data-action="use-item" data-item-id="${item.id}" ${disabled ? 'disabled' : ''}>${btnLabel}</button>
        ${bulkUnlocked ? `<button class="shop-btn" data-action="bulk-buy-item" data-item-id="${item.id}" ${disabled ? 'disabled' : ''}>⚡ 一括購入</button>` : ''}
      </div>
    `;
    el.shopItemList.appendChild(row);
  });
}

function renderShop() {
  el.shopPt.textContent = Math.floor(save.pt).toLocaleString();
  renderShopList();
}

function renderShopList() {
  const outerScrollTop = el.shopItemList.scrollTop;
  const prevTitleLists = [...el.shopItemList.querySelectorAll('.title-column-list')];
  const prevTitleScroll = prevTitleLists.map((node) => node.scrollTop);

  el.shopPt.textContent = Math.floor(save.pt).toLocaleString();
  el.shopItemList.innerHTML = '';
  updateShopTabBadges();

  if (currentShopTab === 'title') {
    renderTitleShop();
    const newTitleLists = [...el.shopItemList.querySelectorAll('.title-column-list')];
    newTitleLists.forEach((node, i) => {
      if (prevTitleScroll[i] !== undefined) node.scrollTop = prevTitleScroll[i];
    });
  } else if (currentShopTab === 'item') {
    renderItemShop();
  } else if (currentShopTab === 'icon') {
    ICON_CATALOG.shop.forEach((item) => {
      el.shopItemList.appendChild(buildShopRow({
        name: item.icon,
        effect: '',
        price: item.price,
        owned: isOwned('icon', item.id),
        equipped: save.profile.icon === item.icon,
        itemId: item.id,
      }));
    });
  } else {
    const catalog = SHOP_CATALOGS[currentShopTab];
    catalog.filter((item) => !item.rico || save.ricoUnlocked).forEach((item) => {
      const owned = currentShopTab === 'armor' ? (item.price === 0 || isOwned('armor', item.id)) : isOwned(currentShopTab, item.id);
      const equipped = save.equipment[SHOP_EQUIP_KEYS[currentShopTab]] === item.id;
      el.shopItemList.appendChild(buildShopRow({
        name: item.name,
        effect: shopItemEffectLabel(currentShopTab, item),
        price: item.price,
        owned,
        equipped,
        itemId: item.id,
        rico: !!item.rico,
      }));
    });
  }

  el.shopItemList.scrollTop = outerScrollTop;
}

function buildShopRow({ name, effect, price, owned, equipped, itemId, tab, rico }) {
  const row = document.createElement('div');
  row.className = rico ? 'shop-item shop-item-rico' : 'shop-item';
  const canAfford = save.pt >= price;
  const effectiveTab = tab || currentShopTab;

  let actionHtml;
  if (equipped) {
    actionHtml = '<button class="shop-btn equipped" disabled>装備中</button>';
  } else if (owned) {
    actionHtml = `<button class="shop-btn" data-action="equip" data-item-id="${itemId}" data-tab="${effectiveTab}">装備</button>`;
  } else {
    actionHtml = `<button class="shop-btn" data-action="buy" data-item-id="${itemId}" data-tab="${effectiveTab}" ${canAfford ? '' : 'disabled'}>${canAfford ? '購入' : 'pt不足'}</button>`;
  }

  row.innerHTML = `
    <div class="shop-item-main">
      <span class="shop-item-name">${name}</span>
      ${effect ? `<span class="shop-item-effect">（${effect}）</span>` : ''}
    </div>
    <div class="shop-item-side">
      <span class="shop-item-price">${price === 0 ? '所持済' : `${price.toLocaleString()} pt`}</span>
      ${actionHtml}
    </div>
  `;
  return row;
}

function renderTitleShop() {
  const front = getEquippedTitleFront();
  const back = getEquippedTitleBack();
  const conn = getEquippedConnective();
  const previewText = front || back
    ? `${front ? front.name : ''}${front && back ? conn.text : ''}${back ? back.name : ''}`
    : '前半・後半パーツを選んでください';

  el.shopItemList.innerHTML = '';

  const preview = document.createElement('div');
  preview.className = 'title-preview';
  preview.textContent = previewText;
  el.shopItemList.appendChild(preview);

  const connRow = document.createElement('div');
  connRow.className = 'title-connective-row';
  TITLE_CONNECTIVES.forEach((c) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `connective-btn${save.equipment.titleConnectiveId === c.id ? ' active' : ''}`;
    btn.textContent = c.text || '(直結)';
    btn.addEventListener('click', () => {
      save.equipment.titleConnectiveId = c.id;
      persistSave();
      renderPlayerCard();
      renderTitleShop();
    });
    connRow.appendChild(btn);
  });
  el.shopItemList.appendChild(connRow);

  const columns = document.createElement('div');
  columns.className = 'title-columns';

  const frontCol = document.createElement('div');
  frontCol.className = 'title-column';
  frontCol.innerHTML = '<h3>前半パーツ</h3>';
  const frontList = document.createElement('div');
  frontList.className = 'title-column-list';
  TITLE_FRONT_CATALOG.forEach((item) => {
    frontList.appendChild(buildShopRow({
      name: item.name,
      effect: '',
      price: item.price,
      owned: isOwned('titleFront', item.id),
      equipped: save.equipment.titleFrontId === item.id,
      itemId: item.id,
      tab: 'titleFront',
    }));
  });
  frontCol.appendChild(frontList);

  const backCol = document.createElement('div');
  backCol.className = 'title-column';
  backCol.innerHTML = '<h3>後半パーツ</h3>';
  const backList = document.createElement('div');
  backList.className = 'title-column-list';
  TITLE_BACK_CATALOG.forEach((item) => {
    backList.appendChild(buildShopRow({
      name: item.name,
      effect: '',
      price: item.price,
      owned: isOwned('titleBack', item.id),
      equipped: save.equipment.titleBackId === item.id,
      itemId: item.id,
      tab: 'titleBack',
    }));
  });
  backCol.appendChild(backList);

  columns.appendChild(frontCol);
  columns.appendChild(backCol);
  el.shopItemList.appendChild(columns);
}

function startSession() {
  el.typingStage.classList.toggle('long-mode', currentMode === 'long');
  el.typingStage.classList.toggle('maou-aura', isMaouAuraFrameActive());
  renderEternalCombo();
  const dungeon = DUNGEONS[currentMode];
  const pool = dungeon.bank[currentLang];
  const buildFn = currentLang === 'jp' ? buildJpTarget : buildEnTarget;
  const armor = getEquippedArmor();
  const shield = getEquippedShield();
  const sword = getEquippedSword();
  const ring = getEquippedRing();

  let rareChanceBonus = ring ? ring.rareChanceBonus : 0;
  rareChanceBonus += Math.min(GOD_STATUE_RARE_BONUS_CAP, 0.01 * (save.godStatueBuffs.rareBonusStacks || 0));
  rareChanceBonus += Math.min(PRESTIGE_RARE_BONUS_CAP, PRESTIGE_RARE_BONUS_PER * save.prestige);
  const fairyDustCount = save.inventory.consumables.item_fairy_dust || 0;
  let fairyDustActive = false;
  if (fairyDustCount > 0) {
    const fairyDustItem = ITEM_CATALOG.find((i) => i.id === 'item_fairy_dust');
    save.inventory.consumables.item_fairy_dust = fairyDustCount - 1;
    rareChanceBonus += fairyDustItem.value;
    fairyDustActive = true;
    pushAnnouncement('🧚', `妖精の粉を使用しました（レア出現率+${Math.round(fairyDustItem.value * 100)}%）`);
  }
  el.fairyDustBadge.classList.toggle('hidden', !fairyDustActive);

  sessionPrayerSuperActive = !save.maouDefeated && (save.maouPrayerCharges || 0) >= RICO_PRAYER_CHARGE_SUPER_THRESHOLD;
  sessionMaouPrayerBonus = 0;
  if (!save.maouDefeated && (save.maouPrayerCharges || 0) > 0) {
    save.maouPrayerCharges -= 1;
    sessionMaouPrayerBonus = RICO_PRAYER_EMBLEM_BONUS;
    pushAnnouncement('🙏', 'リコの祈りの力を感じています（魔王の紋章の出現率が大幅に上昇しています）');
  }
  el.maouPrayerBadge.classList.toggle('hidden', save.maouDefeated || !save.ricoMet);
  if (!save.maouDefeated && save.ricoMet) {
    el.maouPrayerBadge.textContent = sessionMaouPrayerBonus > 0
      ? '🙏 リコの祈り＋祈りの加護 効果中（魔王の紋章 出現率 大幅UP）'
      : '🙏 リコの祈り 効果中（魔王の紋章 出現率UP）';
  }

  session = new TimeAttackSession(pool, buildFn, currentDuration, {
    expFactor: dungeon.expFactor,
    shieldExpBonus: shield ? shield.expBonus : 0,
    wordclearPtBonus: sword && sword.statType === 'wordclear' ? sword.value : 0,
    comboStep: armor.comboStep,
    comboSeconds: armor.comboSeconds,
    capRatio: armor.capRatio,
    rareChanceBonus,
  });
  levelAtSessionStart = save.level;
  sessionPtEarned = 0;

  save.playCount++;
  save.dungeonPlayCounts[currentMode] = (save.dungeonPlayCounts[currentMode] || 0) + 1;
  persistSave();

  setScreen('game');
  renderTarget();
  updateHud();
  renderGameExpBar();
  startTimerLoop();

  awaitingStart = true;
  el.readyOverlay.classList.remove('hidden');
}

function beginTyping() {
  if (!awaitingStart) return;
  awaitingStart = false;
  el.readyOverlay.classList.add('hidden');
  BGM.start(currentMode);
}

function renderGameExpBar() {
  const need = expToNextLevel(save.level, prestigeAwakeningExpMultiplier(save));
  const atMax = save.level >= MAX_LEVEL;
  const pct = atMax ? 100 : Math.min(100, Math.round((save.exp / need) * 100));
  el.gameExpBarFill.style.width = `${pct}%`;
  el.gameExpText.textContent = atMax ? `Lv.${save.level}(MAX)` : `Lv.${save.level}　${save.exp}/${need} EXP`;
}

let levelUpTimer = null;
function showLevelUpPopup(levelAfter) {
  el.levelUpBanner.textContent = `🎉 LEVEL UP！ Lv.${levelAfter}`;
  el.levelUpBanner.classList.remove('show');
  void el.levelUpBanner.offsetWidth;
  el.levelUpBanner.classList.add('show');
  clearTimeout(levelUpTimer);
  levelUpTimer = setTimeout(() => el.levelUpBanner.classList.remove('show'), 1800);
}

function renderTarget() {
  const target = session.current;
  if (!target) return;

  if (currentLang === 'jp') {
    el.displayLine.style.display = '';
    el.readingLine.style.display = '';
    el.romajiLine.style.display = '';
    el.displayLine.textContent = target.display;
    renderChunkLine(el.readingLine, target);
    renderRomajiLine(target);
  } else {
    el.displayLine.style.display = 'none';
    el.readingLine.style.display = '';
    el.romajiLine.style.display = 'none';
    renderChunkLine(el.readingLine, target);
  }
  el.nextPreview.textContent = `次: ${session.nextDisplay}`;
  el.rareMonsterBadge.classList.toggle('hidden', !session.currentIsRare);
}

function renderChunkLine(container, target) {
  container.innerHTML = '';
  target.renderChunkParts().forEach((part) => {
    const span = document.createElement('span');
    span.className = `chunk ${part.state}`;
    span.textContent = part.text;
    container.appendChild(span);
  });
}

function renderRomajiLine(target) {
  const parts = target.renderRomajiParts();
  el.romajiLine.innerHTML = '';

  const typedSpan = document.createElement('span');
  typedSpan.className = 'ok';
  typedSpan.textContent = parts.typed + parts.currentTypedPart;
  el.romajiLine.appendChild(typedSpan);

  if (parts.currentRemainderPart.length > 0) {
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.textContent = parts.currentRemainderPart[0];
    el.romajiLine.appendChild(cursorSpan);

    if (parts.currentRemainderPart.length > 1) {
      const restSpan = document.createElement('span');
      restSpan.className = 'pending';
      restSpan.textContent = parts.currentRemainderPart.slice(1);
      el.romajiLine.appendChild(restSpan);
    }
  }

  if (parts.upcoming) {
    const upcomingSpan = document.createElement('span');
    upcomingSpan.className = 'pending';
    upcomingSpan.textContent = parts.upcoming;
    el.romajiLine.appendChild(upcomingSpan);
  }
}

function formatTime(ms) {
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function renderHeartHud() {
  const owned = save.disciple.heartVesselOwned;
  el.heartHudItem.classList.toggle('hidden', !owned);
  if (owned) el.heartHudValue.textContent = save.disciple.hearts;
}

function updateHud() {
  el.timerDisplay.textContent = formatTime(session.remainingMs);
  el.wordsDisplay.textContent = session.wordsCompleted;
  el.comboCount.textContent = session.combo;
  el.accuracyDisplay.textContent = `${session.accuracy}%`;
  el.kpmDisplay.textContent = session.kpm;
  el.sessionPt.textContent = Math.floor(sessionPtEarned + session.wordclearPtGained).toLocaleString();
  el.sessionExp.textContent = session.expGained.toLocaleString();
  renderHeartHud();

  const progress = session.combo % session.comboStep;
  const pct = Math.round((progress / session.comboStep) * 100);
  el.comboGaugeFill.style.width = `${pct}%`;
  el.comboGaugeText.textContent = `${progress}/${session.comboStep}`;
}

function renderEternalCombo() {
  el.eternalComboHud.classList.toggle('hidden', !save.eternalComboUnlocked);
  if (!save.eternalComboUnlocked) return;
  el.eternalComboCount.textContent = save.eternalCombo.toLocaleString();
  const marks = el.eternalComboMarks.querySelectorAll('.eternal-combo-mark');
  marks.forEach((mark, i) => {
    mark.classList.toggle('lit', i < save.eternalComboMisses);
  });
}

function resetEternalCombo() {
  if (!save.eternalComboUnlocked) return;
  const wasNewBest = save.eternalCombo > 0 && save.eternalCombo === save.eternalComboMax;
  if (wasNewBest) {
    pushAnnouncement('🔄', `最大永続コンボ記録を更新しました（${save.eternalCombo.toLocaleString()}）`);
  }
  save.eternalCombo = 0;
  save.eternalComboMisses = 0;
  save.eternalComboHeartMilestone = 0;
  renderEternalCombo();
  persistSave();
}

function startTimerLoop() {
  stopTimerLoop();
  timerHandle = setInterval(() => {
    if (!session) return;
    el.timerDisplay.textContent = formatTime(session.remainingMs);
    if (session.isTimeUp) finishSession();
  }, 150);
}

function stopTimerLoop() {
  if (timerHandle) {
    clearInterval(timerHandle);
    timerHandle = null;
  }
}

function flashIncorrect() {
  const stage = el.typingStage;
  stage.classList.remove('shake');
  void stage.offsetWidth;
  stage.classList.add('shake');
}

const CELEBRATIONS = ['Nice!', 'Great!', 'Perfect!', 'Excellent!', 'Awesome!'];
let celebrationTimer = null;

function celebrate() {
  el.celebration.textContent = CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)];
  el.celebration.classList.remove('show');
  void el.celebration.offsetWidth;
  el.celebration.classList.add('show');
  clearTimeout(celebrationTimer);
  celebrationTimer = setTimeout(() => el.celebration.classList.remove('show'), 650);
}

function showComboBonus(seconds) {
  const label = Number.isInteger(seconds) ? seconds : seconds.toFixed(1);
  el.comboBonusPopup.textContent = `+${label}s!`;
  el.comboBonusPopup.classList.remove('show');
  void el.comboBonusPopup.offsetWidth;
  el.comboBonusPopup.classList.add('show');
}

let rareBonusTimer = null;
function showRareBonusPopup(rareBonus, includeEmblemLine) {
  const rareLine = `🐲 レアボーナス！ +${rareBonus.pt}pt +${rareBonus.exp}EXP 💗+${rareBonus.heart}`;
  const emblemLine = `🔱 魔王の紋章を手に入れた！（${Math.min(save.maouEmblems, MAOU_EMBLEM_REQUIRED)}/${MAOU_EMBLEM_REQUIRED}）`;
  el.rareBonusPopup.textContent = includeEmblemLine ? `${rareLine}\n${emblemLine}` : rareLine;
  el.rareBonusPopup.classList.remove('show');
  void el.rareBonusPopup.offsetWidth;
  el.rareBonusPopup.classList.add('show');
  clearTimeout(rareBonusTimer);
  clearTimeout(maouEmblemPopupTimer);
  rareBonusTimer = setTimeout(() => el.rareBonusPopup.classList.remove('show'), 1800);
}

function handleTypedChar(ch) {
  const target = session.current;
  const res = session.handleKey(ch);

  if (res.result === 'incorrect') {
    const expected = target.matcher.renderParts().currentRemainderPart[0];
    if (expected && /[a-z.,!?]/i.test(expected)) {
      const key = expected.toLowerCase();
      save.missHeatmap[key] = (save.missHeatmap[key] || 0) + 1;
    }
    save.totalMistakes++;
    save.totalKeystrokes++;
    SFX.incorrect();
    flashIncorrect();
    if (save.eternalComboUnlocked) {
      save.eternalComboMisses += 1;
      if (save.eternalComboMisses >= 5) {
        const wasNewBest = save.eternalCombo > 0 && save.eternalCombo === save.eternalComboMax;
        if (wasNewBest) {
          pushAnnouncement('🔄', `最大永続コンボ記録を更新しました（${save.eternalCombo.toLocaleString()}）`);
        }
        save.eternalCombo = 0;
        save.eternalComboMisses = 0;
        save.eternalComboHeartMilestone = 0;
      }
      renderEternalCombo();
    }
  } else {
    const gain = fullPtMultiplier().total;
    save.pt += gain;
    save.totalPtEarned += gain;
    sessionPtEarned += gain;
    save.totalCorrect++;
    save.totalKeystrokes++;
    if (save.eternalComboUnlocked) {
      save.eternalCombo += 1;
      if (save.eternalCombo > save.eternalComboMax) save.eternalComboMax = save.eternalCombo;
      const milestoneCount = Math.floor(save.eternalCombo / 250);
      if (milestoneCount > (save.eternalComboHeartMilestone || 0)) {
        save.eternalComboHeartMilestone = milestoneCount;
        save.disciple.hearts = Math.min(effectiveDiscipleHeartMax(), save.disciple.hearts + 10);
      }
      renderEternalCombo();
    }
    if (save.ricoUnlocked) {
      const shardGain = 1
        + (save.godStatue.gardenRestorations || 0)
        + GOD_BLESSING_SHARD_BONUS_PER * (save.godStatue.goddessBlessingCount || 0)
        + (isGoddessBlessingMaxed() ? GOD_BLESSING_MAX_SHARD_BONUS : 0);
      save.ricoShards = (save.ricoShards || 0) + shardGain;
      save.ricoShardsEarned = (save.ricoShardsEarned || 0) + shardGain;
    }
    refreshTotalPt();

    if (res.comboBonus > 0) {
      showComboBonus(res.comboBonus);
      SFX.comboBonus();
    } else {
      SFX.correct();
    }

    if (res.result === 'complete-all') {
      celebrate();
      if (res.ptDelta > 0) {
        save.pt += res.ptDelta;
        save.totalPtEarned += res.ptDelta;
        refreshTotalPt();
      }
      if (res.expDelta > 0) {
        const levelsGained = gainExp(res.expDelta);
        gainDiscipleHeartExp(res.expDelta);
        renderGameExpBar();
        if (levelsGained.length > 0) showLevelUpPopup(save.level);
      }
      let emblemDropped = false;
      if (save.maouGateRevealed && save.maouEmblems < MAOU_EMBLEM_REQUIRED) {
        let dropChance = MAOU_EMBLEM_BASE_CHANCE
          + (save.godStatue.gardenRestorations || 0) * GOD_GARDEN_EMBLEM_BONUS_PER
          + (save.ricoMet ? RICO_MET_EMBLEM_BONUS : 0)
          + sessionMaouPrayerBonus
          + (MAOU_EMBLEM_WORD_CHANCE[currentMode] || 0);
        if (isGoddessBlessingMaxed()) dropChance += GOD_BLESSING_MAX_WORD_BONUS[currentMode] || 0;
        if (sessionPrayerSuperActive) dropChance += RICO_PRAYER_CHARGE_WORD_BONUS[currentMode] || 0;
        if (Math.random() < dropChance) {
          save.maouEmblems += 1;
          renderMaouGate();
          emblemDropped = true;
        }
      }
      if (res.rareBonus) {
        save.pt += res.rareBonus.pt;
        save.totalPtEarned += res.rareBonus.pt;
        sessionPtEarned += res.rareBonus.pt;
        const levelsGainedFromRare = gainExp(res.rareBonus.exp, { countsForHappyGrass: false });
        renderGameExpBar();
        if (levelsGainedFromRare.length > 0) showLevelUpPopup(save.level);
        save.disciple.hearts = Math.min(effectiveDiscipleHeartMax(), save.disciple.hearts + res.rareBonus.heart);
        save.rareMonstersDefeated += 1;
        refreshTotalPt();
        showRareBonusPopup(res.rareBonus, emblemDropped);
        SFX.rare();
      } else if (emblemDropped) {
        showMaouEmblemPopup();
        SFX.rare();
      }
      persistSave();
      if (!session.isTimeUp) renderTarget();
      updateHud();
      return;
    }
  }

  updateHud();
  if (currentLang === 'jp') {
    renderChunkLine(el.readingLine, session.current);
    renderRomajiLine(session.current);
  } else {
    renderChunkLine(el.readingLine, session.current);
  }
}

function finishSession() {
  stopTimerLoop();
  BGM.stop();
  session.finish();
  save.totalTypingTimeMs = (save.totalTypingTimeMs || 0) + session.elapsedMs;

  const prevBestRank = save.bestRank;
  const prevBestCombo = save.bestCombo;
  const prevBestKpm = save.bestKpm;
  const key = `${currentLang}:${currentMode}`;
  const prevBestRankForKey = save.bestRankByKey[key];

  const levelsGained = [];
  for (let lvl = levelAtSessionStart + 1; lvl <= save.level; lvl++) levelsGained.push(lvl);
  save.totalWordsCompleted += session.wordsCompleted;

  const rank = computeRank(session.kpm, session.accuracy);
  save.kpmSum += session.kpm;
  save.rankIndexSum += RANK_ORDER.indexOf(rank);
  save.completedRuns += 1;
  if (session.kpm > save.bestKpm) save.bestKpm = session.kpm;
  if (session.maxCombo > save.bestCombo) save.bestCombo = session.maxCombo;
  if (isRankBetterThan(rank, save.bestRank)) save.bestRank = rank;
  if (isRankBetterThan(rank, save.bestRankByKey[key])) save.bestRankByKey[key] = rank;

  save.history.unshift({
    ts: Date.now(),
    lang: currentLang,
    mode: currentMode,
    durationSec: currentDuration,
    correct: session.correct,
    incorrect: session.incorrect,
    accuracy: session.accuracy,
    kpm: session.kpm,
    maxCombo: session.maxCombo,
    wordsCompleted: session.wordsCompleted,
    expGained: session.expGained,
    ptGained: Math.floor(sessionPtEarned + session.wordclearPtGained),
    rank,
  });
  if (save.history.length > 50) save.history.length = 50;

  if (levelsGained.length > 0) {
    pushAnnouncement('🎉', `Lv.${levelAtSessionStart} → Lv.${save.level} に到達しました`);
  }
  if (isRankBetterThan(rank, prevBestRank)) {
    pushAnnouncement('🏆', `自己ベストランク ${rank}(${rankTitle(rank)})を達成しました`);
  }
  if (isRankBetterThan(rank, prevBestRankForKey)) {
    pushAnnouncement('🗝️', `「${DUNGEONS[currentMode].label}」で自己ベストランク ${rank} を達成しました`);
  }
  if (session.maxCombo > prevBestCombo) {
    pushAnnouncement('🔥', `最大コンボ記録を更新しました（${session.maxCombo}コンボ）`);
  }
  if (session.kpm > prevBestKpm) {
    pushAnnouncement('⚡', `最高KPM記録を更新しました（${session.kpm}KPM）`);
  }

  refreshTotalPt();
  persistSave();
  renderPlayerCard();
  renderDungeonBadges();
  renderAnnouncements();
  renderResult({ rank, levelsGained, levelBefore: levelAtSessionStart });
  setScreen('result');
}

function abortSession(options = {}) {
  stopTimerLoop();
  BGM.stop();
  if (!options.silent) save.abortCount++;
  save.totalTypingTimeMs = (save.totalTypingTimeMs || 0) + session.elapsedMs;
  persistSave();
  session = null;
  goHome();
}

function handleLogoClick() {
  if (screen === 'game' && session) {
    abortSession({ silent: true });
  } else {
    goHome();
  }
}

function renderResult({ rank, levelsGained, levelBefore }) {
  el.resultRankBadge.textContent = rank;
  el.resultRankBadge.className = `rank-badge rank-${rank}`;
  el.resultRankTitle.textContent = rankTitle(rank);

  el.resultLevelUpBanner.classList.toggle('hidden', levelsGained.length === 0);
  if (levelsGained.length > 0) {
    el.resultLevelUpBanner.textContent = `🎉 レベルアップ！ Lv.${levelBefore} → Lv.${save.level}`;
  }

  const prestigeReady = canPrestige(save);
  el.resultPrestigeBanner.classList.toggle('hidden', !prestigeReady);
  if (prestigeReady) {
    el.resultPrestigeBanner.textContent = '★ 転生の準備が整いました！ホーム画面から転生が可能です';
  }

  const rows = [
    ['完了ワード数', session.wordsCompleted],
    ['タイプ数', session.correct],
    ['ミス数', session.incorrect],
    ['正答率', `${session.accuracy}%`],
    ['最大コンボ', session.maxCombo],
    ['KPM', session.kpm],
    ['適用中のpt倍率', `x${fullPtMultiplier().total.toFixed(1)}`],
    ['獲得pt(倍率込み)', Math.floor(sessionPtEarned)],
    ['装備ボーナスpt(撃破時)', session.wordclearPtGained],
    ['獲得EXP', session.expGained],
    ['所持pt', Math.floor(save.pt).toLocaleString()],
  ];
  el.resultStats.innerHTML = '';
  rows.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'result-row';
    row.innerHTML = `<span class="result-label">${label}</span><span class="result-value">${value}</span>`;
    el.resultStats.appendChild(row);
  });

  const need = expToNextLevel(save.level, prestigeAwakeningExpMultiplier(save));
  const atMax = save.level >= MAX_LEVEL;
  const pct = atMax ? 100 : Math.min(100, Math.round((save.exp / need) * 100));
  el.resultExpBarFill.style.width = `${pct}%`;
  el.resultExpText.textContent = atMax
    ? `Lv.${save.level} (MAX) ${save.exp}/${need} EXP`
    : `Lv.${save.level}　${save.exp}/${need} EXP`;
}

const TYPE_VOLUME_UNITS = [
  { name: '原稿用紙', chars: 400, suffix: '枚分' },
  { name: 'ノート', chars: 20000, suffix: '冊分' },
  { name: '文庫本', chars: 100000, suffix: '冊分' },
  { name: '小説', chars: 200000, suffix: '冊分' },
];

function formatTypeVolume(count) {
  let unit = TYPE_VOLUME_UNITS[0];
  for (let i = 0; i < TYPE_VOLUME_UNITS.length; i++) {
    const next = TYPE_VOLUME_UNITS[i + 1];
    if (!next || count < next.chars * 10) {
      unit = TYPE_VOLUME_UNITS[i];
      break;
    }
  }
  const amount = count / unit.chars;
  const display = amount < 100 ? amount.toFixed(1) : Math.floor(amount).toLocaleString();
  return `${unit.name} ${display}${unit.suffix}`;
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours.toLocaleString()}時間${minutes}分${seconds}秒`;
  if (minutes > 0) return `${minutes}分${seconds}秒`;
  return `${seconds}秒`;
}

function renderStats() {
  const totalAttempts = save.totalCorrect + save.totalMistakes;
  const overallAccuracy = totalAttempts === 0 ? 100 : Math.round((save.totalCorrect / totalAttempts) * 1000) / 10;
  const avgKpm = save.completedRuns === 0 ? 0 : Math.round(save.kpmSum / save.completedRuns);
  const avgRank = save.completedRuns === 0 ? '-' : RANK_ORDER[Math.round(save.rankIndexSum / save.completedRuns)];

  const rows = [
    ['総タイプ数', save.totalCorrect.toLocaleString()],
    ['__sub__', `📄 ${formatTypeVolume(save.totalCorrect)}`],
    ['総タイピング時間', formatDuration(save.totalTypingTimeMs || 0)],
    ['総ミスタイプ数', save.totalMistakes.toLocaleString()],
    ['クリアしたワード数', save.totalWordsCompleted.toLocaleString()],
    ['単語の間 挑戦回数', save.dungeonPlayCounts.word],
    ['文章の回廊 挑戦回数', save.dungeonPlayCounts.sentence],
    ['長文の塔 挑戦回数', save.dungeonPlayCounts.long],
    ['ESCで中断した回数', save.abortCount],
    ['最高KPM', save.bestKpm],
    ['平均KPM', avgKpm],
    ['正答率', `${overallAccuracy}%`],
    ['総合獲得pt', Math.floor(save.totalPtEarned).toLocaleString()],
    ['総合消費pt', Math.floor(save.totalPtSpent).toLocaleString()],
    ['最高ランク', save.bestRank ? `${save.bestRank}(${rankTitle(save.bestRank)})` : '-'],
    ['平均ランク', avgRank === '-' ? '-' : `${avgRank}(${rankTitle(avgRank)})`],
    ['最大コンボ', save.bestCombo],
    ['弟子強化回数', save.disciple.strengthenCount.toLocaleString()],
    ['弟子に使ったpt合計', Math.floor(save.disciple.ptSpent).toLocaleString()],
    ['弟子の勝利回数', save.disciple.battleWins.toLocaleString()],
    ['弟子が稼いだ累計pt', Math.floor(save.disciple.ptEarned).toLocaleString()],
    ['レアモンスター討伐数', save.rareMonstersDefeated.toLocaleString()],
  ];

  if (save.godStatueBuffs.expBoostStacks > 0) {
    rows.push(['女神の祝福：EXPボーナス', `+${save.godStatueBuffs.expBoostStacks * 20}%`]);
  }
  if (save.godStatueBuffs.heartCostReduction > 0) {
    rows.push(['女神の祝福：ハート必要EXP', `${effectiveHeartExpCost()}（基本${DISCIPLE_HEART_EXP_COST}から軽減）`]);
  }
  if (save.godStatueBuffs.rareBonusStacks > 0) {
    rows.push(['女神の祝福：レア出現率', `+${Math.min(50, save.godStatueBuffs.rareBonusStacks)}%`]);
  }
  if (save.eternalComboUnlocked) {
    rows.push(['最大永続コンボ', (save.eternalComboMax || 0).toLocaleString()]);
  }
  if ((save.maouPrayerCount || 0) > 0) {
    rows.push(['リコへの祈り回数', save.maouPrayerCount.toLocaleString()]);
  }

  el.statsGrid.innerHTML = '';
  rows.forEach(([label, value]) => {
    const row = document.createElement('div');
    if (label === '__sub__') {
      row.className = 'result-row stat-sub-row';
      row.innerHTML = `<span class="stat-sub-value">${value}</span>`;
    } else {
      row.className = 'result-row';
      row.innerHTML = `<span class="result-label">${label}</span><span class="result-value">${value}</span>`;
    }
    el.statsGrid.appendChild(row);
  });

  renderHeatmap();
}

function renderHeatmap() {
  const heat = save.missHeatmap;
  const counts = Object.values(heat);
  const max = counts.length ? Math.max(...counts) : 0;
  el.heatKeys.forEach((cell) => {
    const k = cell.dataset.key;
    const count = heat[k] || 0;
    const intensity = max > 0 ? count / max : 0;
    cell.style.setProperty('--heat', intensity.toFixed(2));
    cell.title = `${k.toUpperCase()}: ${count}回`;
  });
}

function renderHistory() {
  el.historyList.innerHTML = '';
  el.historyEmpty.classList.toggle('hidden', save.history.length > 0);
  save.history.forEach((h) => {
    const row = document.createElement('div');
    row.className = 'history-row';
    const dateStr = formatTimestamp(h.ts);
    row.innerHTML = `
      <span class="history-rank rank-${h.rank}" title="${rankTitle(h.rank)}">${h.rank}</span>
      <span class="history-main">
        <span class="history-title">${LANG_LABELS[h.lang]} / ${DUNGEONS[h.mode].label} / ${h.durationSec}秒</span>
        <span class="history-sub">${dateStr}</span>
      </span>
      <span class="history-stats">
        <span>正答率 ${h.accuracy}%</span>
        <span>KPM ${h.kpm}</span>
        <span>コンボ ${h.maxCombo}</span>
        <span>EXP +${h.expGained}</span>
        <span>pt +${h.ptGained}</span>
      </span>
    `;
    el.historyList.appendChild(row);
  });
}

let secretGrassClicks = 0;
el.topbar.addEventListener('click', (e) => {
  if (e.target !== el.topbar) return;
  secretGrassClicks = Math.min(12, secretGrassClicks + 1);
});

document.addEventListener('keydown', (e) => {
  if (secretGrassClicks >= 12 && e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    e.preventDefault();
    secretGrassClicks = 0;
    save.happyGrassStock = HAPPY_GRASS_MAX_STOCK;
    pushAnnouncement('🍀', '裏技発動！しあわせ草が大量入荷しました');
    persistSave();
    if (screen === 'shop') renderShopList();
    SFX.rare();
    return;
  }

  if (screen === 'result' && e.key === ' ') {
    e.preventDefault();
    startSession();
    return;
  }

  if (screen === 'home' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const key = e.key.toLowerCase();
    const popupOpen = !el.disciplePopup.classList.contains('hidden');

    if (!popupOpen) {
      if (e.key === ' ') {
        e.preventDefault();
        startSession();
        return;
      }
      if (key === 'f') {
        e.preventDefault();
        openDisciplePopup();
        return;
      }
      if (key === 'm') {
        e.preventDefault();
        el.godStatueBtn.click();
        return;
      }
      return;
    }

    if (['s', 'd', 'f'].includes(key)) {
      e.preventDefault();
      const showingOpponents = !el.discipleOpponents.classList.contains('hidden');
      if (showingOpponents) {
        const idx = { s: 0, d: 1, f: 2 }[key];
        const opp = currentDiscipleOpponents[idx];
        if (opp) fightDiscipleOpponent(opp);
        return;
      }
      const showingResult = !el.discipleBattleResult.classList.contains('hidden');
      if (showingResult && save.disciple.hearts > 0) {
        openDisciplePopup();
      }
      return;
    }
    return;
  }

  if (screen !== 'game') return;
  if (e.repeat) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'Escape') {
    abortSession();
    return;
  }

  if (awaitingStart) {
    if (e.key === ' ') {
      e.preventDefault();
      beginTyping();
    }
    return;
  }

  if (e.key.length !== 1) return;
  e.preventDefault();
  handleTypedChar(e.key);
});

window.addEventListener('beforeunload', persistSave);
window.addEventListener('storage', (e) => {
  if (e.key !== SAVE_KEY || e.newValue === null) return;
  save = loadSave();
  refreshTotalPt();
  renderPlayerCard();
  renderDungeonBadges();
  renderAnnouncements();
  renderDisciple();
});

refreshTotalPt();
refreshMuteBtn();
renderPlayerCard();
renderDungeonBadges();
renderAnnouncements();
renderDisciple();
updateLogos();
setScreen('home');
if (!save.helpPopupSeen) {
  save.helpPopupSeen = true;
  persistSave();
  showHelpPopup();
}
