const SAVE_KEY = 'typingDungeonSave';

const DUNGEONS = {
  word: { label: '単語の間', expFactor: 1, bank: WORD_BANK },
  sentence: { label: '文章の回廊', expFactor: 1.5, bank: SENTENCE_BANK },
  long: { label: '長文の塔', expFactor: 2, bank: LONG_BANK },
};

const LANG_LABELS = { jp: '日本語', en: 'English' };

const GOD_STATUE_RESTORE_COST = 10000;
const GOD_STATUE_MAX = 100;
const GOD_STATUE_HEART_COST_FLOOR = 75;
const GOD_STATUE_RARE_BONUS_CAP = 0.50;
const PRESTIGE_RARE_BONUS_PER = 0.01;
const PRESTIGE_RARE_BONUS_CAP = 0.10;
const HAPPY_GRASS_EXP_PER_STOCK = 500;
const HAPPY_GRASS_MAX_STOCK = 99;

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

const RICO_FIELD = { sword: 'value', shield: 'expBonus', armor: 'capRatio', ring: 'rareChanceBonus' };
const RICO_INCREMENT = 0.01;
const RICO_STRENGTHEN_BASE_COST = { sword: 200, shield: 200, armor: 10000, ring: 10000 };
const RICO_STRENGTHEN_GROWTH = 1.15;
const COMPLETION_TABS = ['sword', 'shield', 'armor', 'ring', 'title', 'icon'];

function defaultSave() {
  return {
    pt: 0,
    totalPtEarned: 0,
    totalPtSpent: 0,
    profile: { name: 'Typer', icon: '🗡️', cardDesign: 'default', iconFrame: 'none' },
    equipment: { swordId: null, shieldId: null, armorId: 'armor_cloth', ringId: null, titleFrontId: null, titleBackId: null, titleConnectiveId: 'conn_no' },
    inventory: { swords: [], shields: [], armors: ['armor_cloth'], rings: [], titleFronts: [], titleBacks: [], icons: [], consumables: {} },
    godStatue: { restoration: 0, sent: 0 },
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
    },
    level: 1,
    maxLevelReached: 1,
    exp: 0,
    prestige: 0,
    muted: false,
    playCount: 0,
    completedRuns: 0,
    abortCount: 0,
    totalKeystrokes: 0,
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
    profile: { ...base.profile, ...(raw.profile || {}) },
    equipment: { ...base.equipment, ...(raw.equipment || {}) },
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
    },
    dungeonPlayCounts: { ...base.dungeonPlayCounts, ...(raw.dungeonPlayCounts || {}) },
    bestRankByKey: { ...(raw.bestRankByKey || {}) },
    missHeatmap: { ...(raw.missHeatmap || {}) },
    history: raw.history || [],
    announcements: raw.announcements || [],
    ricoLevels: { ...base.ricoLevels, ...(raw.ricoLevels || {}) },
  };
}

function loadSave() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!raw) return defaultSave();
    return normalizeSave(raw);
  } catch (e) {
    return defaultSave();
  }
}

function persistSave() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function exportSaveString() {
  return JSON.stringify({ app: 'typing-dungeon', version: 1, exportedAt: Date.now(), save }, null, 2);
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
  const raw = parsed && typeof parsed === 'object' && parsed.save ? parsed.save : parsed;
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
  tone(freq, dur, type = 'sine', gain = 0.05) {
    if (save.muted) return;
    const ctx = this.ensure();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(g).connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
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
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
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
    g.gain.setValueAtTime(0.06, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
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
};

const BGM = {
  gainNode: null,
  timer: null,
  patterns: {
    word: { notes: [523, 659, 784, 659, 523, 392, 523, 659], step: 220 },
    sentence: { notes: [440, 523, 587, 523, 440, 392, 349, 392], step: 260 },
    long: { notes: [220, 262, 220, 196, 220, 262, 294, 262], step: 320 },
  },
  ensureGain() {
    const ctx = SFX.ensure();
    if (!this.gainNode) {
      this.gainNode = ctx.createGain();
      this.gainNode.gain.value = 0.03;
      this.gainNode.connect(ctx.destination);
    }
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
let currentShopTab = 'sword';
let awaitingStart = false;

const el = {
  totalPt: document.getElementById('totalPt'),
  topbar: document.getElementById('topbar'),
  muteBtn: document.getElementById('muteBtn'),
  screens: {
    home: document.getElementById('screen-home'),
    game: document.getElementById('screen-game'),
    result: document.getElementById('screen-result'),
    stats: document.getElementById('screen-stats'),
    history: document.getElementById('screen-history'),
    shop: document.getElementById('screen-shop'),
  },
  playerCard: document.getElementById('playerCard'),
  profileIconBtn: document.getElementById('profileIconBtn'),
  iconPicker: document.getElementById('iconPicker'),
  playerName: document.getElementById('playerName'),
  renameBtn: document.getElementById('renameBtn'),
  playerTitle: document.getElementById('playerTitle'),
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
  discipleIconBtn: document.getElementById('discipleIconBtn'),
  discipleIconPicker: document.getElementById('discipleIconPicker'),
  discipleName: document.getElementById('discipleName'),
  discipleRenameBtn: document.getElementById('discipleRenameBtn'),
  discipleHearts: document.getElementById('discipleHearts'),
  discipleStats: document.getElementById('discipleStats'),
  discipleBattleBtn: document.getElementById('discipleBattleBtn'),
  discipleStreakSummary: document.getElementById('discipleStreakSummary'),
  disciplePopup: document.getElementById('disciplePopup'),
  discipleOpponents: document.getElementById('discipleOpponents'),
  discipleBattleResult: document.getElementById('discipleBattleResult'),
  disciplePopupCloseBtn: document.getElementById('disciplePopupCloseBtn'),
  godStatueBuffPopup: document.getElementById('godStatueBuffPopup'),
  godBuffOptions: document.getElementById('godBuffOptions'),
  announcementsList: document.getElementById('announcementsList'),
  dungeonGrid: document.getElementById('dungeonGrid'),
  startBtn: document.getElementById('startBtn'),
  openStatsBtn: document.getElementById('openStatsBtn'),
  openHistoryBtn: document.getElementById('openHistoryBtn'),
  openShopBtn: document.getElementById('openShopBtn'),
  shopBackBtn: document.getElementById('shopBackBtn'),
  shopTabs: document.getElementById('shopTabs'),
  shopPt: document.getElementById('shopPt'),
  shopItemList: document.getElementById('shopItemList'),
  timerDisplay: document.getElementById('timerDisplay'),
  wordsDisplay: document.getElementById('wordsDisplay'),
  comboCount: document.getElementById('comboCount'),
  comboGaugeFill: document.getElementById('comboGaugeFill'),
  comboGaugeText: document.getElementById('comboGaugeText'),
  nextPreview: document.getElementById('nextPreview'),
  readyOverlay: document.getElementById('readyOverlay'),
  rareMonsterBadge: document.getElementById('rareMonsterBadge'),
  fairyDustBadge: document.getElementById('fairyDustBadge'),
  rareBonusPopup: document.getElementById('rareBonusPopup'),
  levelUpBanner: document.getElementById('levelUpBanner'),
  accuracyDisplay: document.getElementById('accuracyDisplay'),
  kpmDisplay: document.getElementById('kpmDisplay'),
  sessionPt: document.getElementById('sessionPt'),
  sessionExp: document.getElementById('sessionExp'),
  gameExpBarFill: document.getElementById('gameExpBarFill'),
  gameExpText: document.getElementById('gameExpText'),
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
  openSaveDataBtn: document.getElementById('openSaveDataBtn'),
  saveDataPopup: document.getElementById('saveDataPopup'),
  saveDataCloseBtn: document.getElementById('saveDataCloseBtn'),
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
  return { ...item, [field]: item[field] + lvl * RICO_INCREMENT };
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
  return Math.round(RICO_STRENGTHEN_BASE_COST[slot] * Math.pow(RICO_STRENGTHEN_GROWTH, lvl));
}

function strengthenRicoItem(slot) {
  const cost = ricoStrengthenCost(slot);
  if (save.ricoShards < cost) return;
  save.ricoShards -= cost;
  save.ricoLevels[slot] = (save.ricoLevels[slot] || 0) + 1;
  SFX.correct();
  persistSave();
  renderPlayerCard();
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
  const total = base * (1 + swordBonus);
  return { levelBonus, prestigeBonus, swordBonus, total };
}

function renderPlayerCard() {
  el.profileIconBtn.textContent = save.profile.icon;
  el.playerName.textContent = save.profile.name;
  const titleText = getEquippedTitleText();
  el.playerTitle.textContent = titleText ? `称号：${titleText}` : '称号：未設定';
  el.playerLevel.textContent = `Lv.${save.level}`;
  el.playerPrestige.textContent = save.prestige > 0 ? `+${save.prestige}` : '';

  const need = expToNextLevel(save.level);
  const atMax = save.level >= MAX_LEVEL;
  const pct = atMax ? 100 : Math.min(100, Math.round((save.exp / need) * 100));
  el.expBarFill.style.width = `${pct}%`;
  el.expText.textContent = atMax ? `${save.exp} / ${need} EXP (MAX)` : `${save.exp} / ${need} EXP`;
  const mult = fullPtMultiplier();
  const swordPart = mult.swordBonus > 0 ? ` 剣+${Math.round(mult.swordBonus * 100)}%` : '';
  el.ptMultiplier.textContent = `pt倍率 x${mult.total.toFixed(1)}（Lv+${mult.levelBonus.toFixed(1)} プレ+${mult.prestigeBonus.toFixed(1)}${swordPart}）`;
  el.prestigeBtn.classList.toggle('hidden', !canPrestige(save));

  el.playerCard.className = `player-card design-${save.profile.cardDesign}`;
  el.profileIconBtn.className = `profile-icon frame-${save.profile.iconFrame}`;

  renderEquipmentSummary();
  renderGodStatue();
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

function renderGodStatueBuffOptions() {
  el.godBuffOptions.innerHTML = '';
  GOD_STATUE_BUFFS.forEach((buff) => {
    const card = document.createElement('div');
    card.className = 'god-buff-card';
    card.innerHTML = `
      <div class="god-buff-name">${buff.name}</div>
      <div class="god-buff-desc">${buff.desc}</div>
      <button class="shop-btn" data-buff="${buff.id}">選ぶ</button>
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
  persistSave();
  refreshTotalPt();
  renderDisciple();
}

function effectiveHeartExpCost() {
  return Math.max(GOD_STATUE_HEART_COST_FLOOR, DISCIPLE_HEART_EXP_COST - (save.godStatueBuffs.heartCostReduction || 0));
}

function gainDiscipleHeartExp(exp) {
  if (save.disciple.hearts >= DISCIPLE_HEART_MAX) {
    save.disciple.heartExpProgress = 0;
    return;
  }
  save.disciple.heartExpProgress += exp;
  const cost = effectiveHeartExpCost();
  while (save.disciple.heartExpProgress >= cost && save.disciple.hearts < DISCIPLE_HEART_MAX) {
    save.disciple.heartExpProgress -= cost;
    save.disciple.hearts += 1;
  }
  if (save.disciple.hearts >= DISCIPLE_HEART_MAX) save.disciple.heartExpProgress = 0;
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

function gainExp(amount) {
  const boosted = Math.round(amount * godStatueExpMultiplier());
  gainHappyGrassStock(boosted);
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
    save.pt += earned;
    save.totalPtEarned += earned;
    save.disciple.ptEarned += earned;
  } else {
    save.disciple.streaks[opp.tierKey] = 0;
  }
  persistSave();
  refreshTotalPt();
  renderDisciple();
  showDiscipleBattleResult(result, earned, opp, streakAfter);
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

el.discipleBattleBtn.addEventListener('click', openDisciplePopup);
el.disciplePopupCloseBtn.addEventListener('click', () => el.disciplePopup.classList.add('hidden'));
el.ricoCompleteCloseBtn.addEventListener('click', () => {
  el.ricoCompletePopup.classList.add('hidden');
  renderShopList();
});

el.openSaveDataBtn.addEventListener('click', () => {
  el.exportSaveText.value = exportSaveString();
  el.importSaveText.value = '';
  el.saveDataPopup.classList.remove('hidden');
});
el.saveDataCloseBtn.addEventListener('click', () => el.saveDataPopup.classList.add('hidden'));
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

  if (save.ricoUnlocked) {
    const shardRow = document.createElement('div');
    shardRow.className = 'equip-row rico-shard-row';
    shardRow.innerHTML = `<span class="equip-label">✨ リコの欠片</span><span class="equip-value">${Math.floor(save.ricoShards).toLocaleString()}</span>`;
    el.equipmentSummary.appendChild(shardRow);
  }

  rows.forEach(([label, item, text, slot]) => {
    const row = document.createElement('div');
    row.className = 'equip-row';
    let strengthenHtml = '';
    if (item && item.rico) {
      const cost = ricoStrengthenCost(slot);
      const canAfford = save.ricoShards >= cost;
      strengthenHtml = `<button class="equip-strengthen-btn" data-slot="${slot}" ${canAfford ? '' : 'disabled'}>✨強化（${cost.toLocaleString()}）</button>`;
    }
    row.innerHTML = `<span class="equip-label">${label}</span><span class="equip-right"><span class="equip-value">${text}</span>${strengthenHtml}</span>`;
    el.equipmentSummary.appendChild(row);
  });
}

el.equipmentSummary.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-slot]');
  if (!btn) return;
  strengthenRicoItem(btn.dataset.slot);
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
  if (save.announcements.length > 30) save.announcements.length = 30;
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

el.prestigeBtn.addEventListener('click', () => {
  if (!canPrestige(save)) return;
  const ok = window.confirm('プレステージすると Lv.1 に戻ります。pt・実績・履歴は引き継がれます。よろしいですか？');
  if (!ok) return;
  doPrestige(save);
  pushAnnouncement('🌟', `プレステージ +${save.prestige} を達成しました`);
  persistSave();
  renderPlayerCard();
  renderAnnouncements();
  SFX.prestige();
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
});

const SHOP_CATALOGS = {
  sword: SWORD_CATALOG,
  shield: SHIELD_CATALOG,
  armor: ARMOR_CATALOG,
  ring: RING_CATALOG,
  titleFront: TITLE_FRONT_CATALOG,
  titleBack: TITLE_BACK_CATALOG,
};
const SHOP_INVENTORY_KEYS = { sword: 'swords', shield: 'shields', armor: 'armors', ring: 'rings', titleFront: 'titleFronts', titleBack: 'titleBacks' };
const SHOP_EQUIP_KEYS = { sword: 'swordId', shield: 'shieldId', armor: 'armorId', ring: 'ringId', titleFront: 'titleFrontId', titleBack: 'titleBackId' };

function shopItemEffectLabel(tab, item) {
  if (tab === 'sword') return swordEffectLabel(item);
  if (tab === 'shield') return shieldEffectLabel(item);
  if (tab === 'armor') return armorEffectLabel(item);
  if (tab === 'ring') return ringEffectLabel(item);
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

function buyConsumableItem(itemId) {
  const item = ITEM_CATALOG.find((i) => i.id === itemId);
  if (!item) return;

  if (item.stackable) {
    const owned = save.inventory.consumables[itemId] || 0;
    if (owned >= item.maxStack) return;
    if (save.pt < item.price) return;
    save.pt -= item.price;
    save.totalPtSpent += item.price;
    save.inventory.consumables[itemId] = owned + 1;
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

  if (item.effect === 'exp') {
    const levelBefore = save.level;
    const levelsGained = gainExp(item.value);
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

function itemEffectLabel(item) {
  if (item.effect === 'exp') return `即座にEXP+${item.value}`;
  if (item.effect === 'rare_chance_next_game') return `次のゲームでレア出現率+${Math.round(item.value * 100)}%`;
  return '';
}

function renderItemShop() {
  el.shopItemList.innerHTML = '';
  ITEM_CATALOG.forEach((item) => {
    const owned = item.stackable ? (save.inventory.consumables[item.id] || 0) : 0;
    const maxed = item.stackable && owned >= item.maxStack;
    const outOfStock = item.hasShopStock && save.happyGrassStock <= 0;
    const canAfford = save.pt >= item.price;
    const disabled = maxed || outOfStock || !canAfford;
    let btnLabel = '購入';
    if (maxed) btnLabel = '所持上限';
    else if (outOfStock) btnLabel = '在庫切れ';
    else if (!canAfford) btnLabel = 'pt不足';
    const row = document.createElement('div');
    row.className = 'shop-item';
    row.innerHTML = `
      <div class="shop-item-main">
        <span class="shop-item-name">${item.name}</span>
        <span class="shop-item-effect">（${itemEffectLabel(item)}）</span>
        ${item.stackable ? `<span class="shop-item-owned">所持: ${owned}/${item.maxStack}</span>` : ''}
        ${item.hasShopStock ? `<span class="shop-item-owned">在庫: ${save.happyGrassStock}/${HAPPY_GRASS_MAX_STOCK}</span>` : ''}
      </div>
      <div class="shop-item-side">
        <span class="shop-item-price">${item.price.toLocaleString()} pt</span>
        <button class="shop-btn" data-action="use-item" data-item-id="${item.id}" ${disabled ? 'disabled' : ''}>${btnLabel}</button>
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

  if (currentShopTab === 'design') {
    el.shopItemList.innerHTML = '<div class="shop-empty">近日公開予定です。お楽しみに。</div>';
  } else if (currentShopTab === 'title') {
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
  const need = expToNextLevel(save.level);
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

function updateHud() {
  el.timerDisplay.textContent = formatTime(session.remainingMs);
  el.wordsDisplay.textContent = session.wordsCompleted;
  el.comboCount.textContent = session.combo;
  el.accuracyDisplay.textContent = `${session.accuracy}%`;
  el.kpmDisplay.textContent = session.kpm;
  el.sessionPt.textContent = Math.floor(sessionPtEarned + session.wordclearPtGained);
  el.sessionExp.textContent = session.expGained;

  const progress = session.combo % session.comboStep;
  const pct = Math.round((progress / session.comboStep) * 100);
  el.comboGaugeFill.style.width = `${pct}%`;
  el.comboGaugeText.textContent = `${progress}/${session.comboStep}`;
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
  const stage = document.getElementById('typingStage');
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
function showRareBonusPopup(rareBonus) {
  el.rareBonusPopup.textContent = `🐲 レアボーナス！ +${rareBonus.pt}pt +${rareBonus.exp}EXP 💗+${rareBonus.heart}`;
  el.rareBonusPopup.classList.remove('show');
  void el.rareBonusPopup.offsetWidth;
  el.rareBonusPopup.classList.add('show');
  clearTimeout(rareBonusTimer);
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
  } else {
    const gain = fullPtMultiplier().total;
    save.pt += gain;
    save.totalPtEarned += gain;
    sessionPtEarned += gain;
    save.totalCorrect++;
    save.totalKeystrokes++;
    if (save.ricoUnlocked) save.ricoShards = (save.ricoShards || 0) + 1;
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
      if (res.rareBonus) {
        save.pt += res.rareBonus.pt;
        save.totalPtEarned += res.rareBonus.pt;
        sessionPtEarned += res.rareBonus.pt;
        const levelsGainedFromRare = gainExp(res.rareBonus.exp);
        renderGameExpBar();
        if (levelsGainedFromRare.length > 0) showLevelUpPopup(save.level);
        save.disciple.hearts = Math.min(DISCIPLE_HEART_MAX, save.disciple.hearts + res.rareBonus.heart);
        save.rareMonstersDefeated += 1;
        refreshTotalPt();
        showRareBonusPopup(res.rareBonus);
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

  levelsGained.forEach((lvl) => pushAnnouncement('🎉', `Lv.${lvl} に到達しました`));
  if (isRankBetterThan(rank, prevBestRank)) {
    pushAnnouncement('🏆', `自己ベストランク ${rank}(${rankTitle(rank)})を達成しました`);
  }
  if (isRankBetterThan(rank, prevBestRankForKey)) {
    pushAnnouncement('🗝️', `「${DUNGEONS[currentMode].label}」で自己ベストランク ${rank} を達成しました`);
  }
  if (session.maxCombo > prevBestCombo) {
    pushAnnouncement('🔥', `最大コンボ記録を更新！ ${session.maxCombo}コンボ`);
  }
  if (session.kpm > prevBestKpm) {
    pushAnnouncement('⚡', `最高KPM記録を更新！ ${session.kpm}KPM`);
  }

  refreshTotalPt();
  persistSave();
  renderPlayerCard();
  renderDungeonBadges();
  renderAnnouncements();
  renderResult({ rank, levelsGained, levelBefore: levelAtSessionStart });
  setScreen('result');
}

function abortSession() {
  stopTimerLoop();
  BGM.stop();
  save.abortCount++;
  persistSave();
  session = null;
  goHome();
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
    el.resultPrestigeBanner.textContent = '★ プレステージが可能になりました！ホーム画面から挑戦できます';
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

  const need = expToNextLevel(save.level);
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

function renderStats() {
  const totalAttempts = save.totalCorrect + save.totalMistakes;
  const overallAccuracy = totalAttempts === 0 ? 100 : Math.round((save.totalCorrect / totalAttempts) * 1000) / 10;
  const avgKpm = save.completedRuns === 0 ? 0 : Math.round(save.kpmSum / save.completedRuns);
  const avgRank = save.completedRuns === 0 ? '-' : RANK_ORDER[Math.round(save.rankIndexSum / save.completedRuns)];

  const rows = [
    ['総タイプ数', save.totalCorrect.toLocaleString()],
    ['__sub__', `📄 ${formatTypeVolume(save.totalCorrect)}`],
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
    const date = new Date(h.ts);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
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
    pushAnnouncement('🍀', '裏技発動！しあわせ草が大量入荷した');
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

refreshTotalPt();
refreshMuteBtn();
renderPlayerCard();
renderDungeonBadges();
renderAnnouncements();
renderDisciple();
setScreen('home');
