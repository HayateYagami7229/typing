const MAX_LEVEL = 99;

const RANK_DEFS = [
  { code: 'E', title: '村人A(戦闘力ゼロ)', min: 0 },
  { code: 'D', title: '勇者じゃない……かも？', min: 40 },
  { code: 'C', title: 'しがない見習い冒険者', min: 90 },
  { code: 'B', title: '一人前の冒険者', min: 150 },
  { code: 'A', title: '頼れる勇者', min: 220 },
  { code: 'S', title: '選ばれし勇者', min: 300 },
  { code: 'SS', title: '英雄', min: 400 },
  { code: 'SSS', title: '伝説の勇者', min: 520 },
];
const RANK_ORDER = RANK_DEFS.map((r) => r.code);

function rankTitle(code) {
  const def = RANK_DEFS.find((r) => r.code === code);
  return def ? def.title : '';
}

const PRESTIGE_AWAKENING_AT = 10;
const PRESTIGE_AWAKENING_PT_BONUS = 1000;
const PRESTIGE_AWAKENING_EXP_MULTIPLIER = 2;

function expToNextLevel(level, multiplier = 1) {
  return (20 + (level - 1) * 8) * multiplier;
}

function addExp(save, amount) {
  const levelsGained = [];
  const expMultiplier = save.prestigeAwakened ? PRESTIGE_AWAKENING_EXP_MULTIPLIER : 1;
  save.exp += amount;
  while (save.level < MAX_LEVEL && save.exp >= expToNextLevel(save.level, expMultiplier)) {
    save.exp -= expToNextLevel(save.level, expMultiplier);
    save.level += 1;
    levelsGained.push(save.level);
  }
  if (save.level >= MAX_LEVEL) {
    save.exp = Math.min(save.exp, expToNextLevel(MAX_LEVEL, expMultiplier));
  }
  save.maxLevelReached = Math.max(save.maxLevelReached || 1, save.level);
  return levelsGained;
}

function canPrestige(save) {
  return save.level >= MAX_LEVEL;
}

function doPrestige(save) {
  if (!canPrestige(save)) return false;
  save.prestige += 1;
  save.level = 1;
  save.exp = 0;
  const justAwakened = save.prestige >= PRESTIGE_AWAKENING_AT && !save.prestigeAwakened;
  if (justAwakened) save.prestigeAwakened = true;
  return { success: true, justAwakened };
}

function ptMultiplierBreakdown(save) {
  const levelSteps = Math.floor((save.maxLevelReached || save.level) / 5);
  const perStepBonus = 0.2 * (1 + save.prestige * 0.5);
  const levelBonus = levelSteps * perStepBonus;
  const prestigeBonus = save.prestige * 10.0;
  return { levelBonus, prestigeBonus };
}

function ptMultiplier(save) {
  const { levelBonus, prestigeBonus } = ptMultiplierBreakdown(save);
  const base = 1 + levelBonus + prestigeBonus;
  return save.prestigeAwakened ? base + PRESTIGE_AWAKENING_PT_BONUS : base;
}

function computeRank(kpm, accuracy) {
  const score = kpm * Math.pow(accuracy / 100, 2);
  let result = RANK_DEFS[0].code;
  for (const def of RANK_DEFS) {
    if (score >= def.min) result = def.code;
  }
  return result;
}

function isRankBetterThan(candidate, current) {
  if (!current) return true;
  if (!candidate) return false;
  return RANK_ORDER.indexOf(candidate) > RANK_ORDER.indexOf(current);
}
