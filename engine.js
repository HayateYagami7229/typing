class TypingMatcher {
  constructor(chunks, opts = {}) {
    this.chunks = chunks;
    this.chunkIndex = 0;
    this.typedInChunk = '';
    this.caseInsensitive = !!opts.caseInsensitive;
    this.log = [];
  }

  norm(s) {
    return this.caseInsensitive ? s.toLowerCase() : s;
  }

  get isComplete() {
    return this.chunkIndex >= this.chunks.length;
  }

  get currentChunk() {
    return this.chunks[this.chunkIndex];
  }

  currentRemainingOptions() {
    const chunk = this.currentChunk;
    if (!chunk) return [];
    const t = this.norm(this.typedInChunk);
    return chunk.options.filter((o) => this.norm(o).startsWith(t));
  }

  input(rawChar) {
    if (this.isComplete) return { result: 'already-complete' };
    const chunk = this.currentChunk;
    const attempt = this.typedInChunk + rawChar;
    const nAttempt = this.norm(attempt);
    const matching = chunk.options.filter((o) => this.norm(o).startsWith(nAttempt));

    if (matching.length > 0) {
      this.typedInChunk = attempt;
      const exact = chunk.options.some((o) => this.norm(o) === nAttempt);
      const isLastChunk = this.chunkIndex === this.chunks.length - 1;
      const hasLongerOption = !isLastChunk && matching.some((o) => this.norm(o).length > nAttempt.length);
      if (exact && !hasLongerOption) {
        this.log.push(attempt);
        this.chunkIndex++;
        this.typedInChunk = '';
        return { result: this.isComplete ? 'complete-all' : 'complete-chunk' };
      }
      return { result: 'correct' };
    }

    const alreadyExact = this.typedInChunk.length > 0
      && chunk.options.some((o) => this.norm(o) === this.norm(this.typedInChunk));
    if (alreadyExact) {
      this.log.push(this.typedInChunk);
      this.chunkIndex++;
      this.typedInChunk = '';
      if (this.isComplete) return { result: 'incorrect' };
      return this.input(rawChar);
    }

    return { result: 'incorrect' };
  }

  renderParts() {
    const typed = this.log.join('');
    const currentTypedPart = this.typedInChunk;
    let currentRemainderPart = '';
    const chunk = this.currentChunk;
    if (chunk) {
      const opts = this.currentRemainingOptions();
      const guideOption = opts[0] || chunk.options[0];
      currentRemainderPart = guideOption.slice(this.typedInChunk.length);
    }
    let upcoming = '';
    for (let i = this.chunkIndex + 1; i < this.chunks.length; i++) {
      upcoming += this.chunks[i].options[0];
    }
    return { typed, currentTypedPart, currentRemainderPart, upcoming };
  }
}

class TypingTarget {
  constructor({ display, reading, chunks, caseInsensitive }) {
    this.display = display;
    this.reading = reading;
    this.chunks = chunks;
    this.matcher = new TypingMatcher(chunks, { caseInsensitive });
  }

  get isComplete() {
    return this.matcher.isComplete;
  }

  input(ch) {
    return this.matcher.input(ch);
  }

  renderChunkParts() {
    return this.chunks.map((c, i) => ({
      text: c.kana,
      state: i < this.matcher.chunkIndex ? 'done' : i === this.matcher.chunkIndex ? 'current' : 'upcoming',
    }));
  }

  renderRomajiParts() {
    return this.matcher.renderParts();
  }
}

function buildJpTarget(item) {
  const chunks = tokenizeKana(item.kana);
  return new TypingTarget({ display: item.kanji || item.kana, reading: item.kana, chunks, caseInsensitive: false });
}

function buildEnTarget(text) {
  const chunks = Array.from(text).map((ch) => ({ kana: ch, options: [ch] }));
  return new TypingTarget({ display: text, reading: null, chunks, caseInsensitive: true });
}

function itemStartsWithN(item) {
  if (typeof item === 'string') return false;
  const kana = item && item.kana;
  if (!kana) return false;
  const chunks = tokenizeKana(kana);
  if (!chunks.length) return false;
  return chunks[0].options.some((o) => o.toLowerCase().startsWith('n'));
}

const DEFAULT_COMBO_STEP = 20;
const DEFAULT_COMBO_SECONDS = 2;
const DEFAULT_COMBO_CAP_RATIO = 0.5;
const RARE_ENCOUNTER_CHANCE = 0.03;
const RARE_BONUS_PT = 100;
const RARE_BONUS_EXP = 30;
const RARE_BONUS_HEART = 1;

class TimeAttackSession {
  constructor(pool, buildTarget, durationSec, opts = {}) {
    this.pool = pool;
    this.buildTarget = buildTarget;
    this.durationMs = durationSec * 1000;
    this.expFactor = opts.expFactor || 1;
    this.shieldExpBonus = opts.shieldExpBonus || 0;
    this.wordclearPtBonus = opts.wordclearPtBonus || 0;
    this.comboStep = opts.comboStep || DEFAULT_COMBO_STEP;
    this.comboSeconds = opts.comboSeconds || DEFAULT_COMBO_SECONDS;
    this.capRatio = opts.capRatio || DEFAULT_COMBO_CAP_RATIO;
    this.rareChance = RARE_ENCOUNTER_CHANCE + (opts.rareChanceBonus || 0);
    this.bonusMs = 0;
    this.maxBonusMs = this.durationMs * this.capRatio;
    this.startTime = null;
    this.endTime = null;
    this.wordsCompleted = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.expGained = 0;
    this.wordclearPtGained = 0;
    this.rareEncountersWon = 0;
    this.currentIsRare = false;
    this.recentIndices = [];
    this.avoidRepeatWindow = Math.min(10, this.pool.length - 1);
    this.current = null;
    this.nextItem = this._pickItem();
    this._advance();
  }

  _pickItem(avoidNStart) {
    if (this.pool.length === 1) return this.pool[0];
    let idx;
    let attempts = 0;
    do {
      idx = Math.floor(Math.random() * this.pool.length);
      attempts++;
    } while (
      (this.recentIndices.includes(idx) || (avoidNStart && itemStartsWithN(this.pool[idx])))
      && attempts < 200
    );
    this.recentIndices.push(idx);
    if (this.recentIndices.length > this.avoidRepeatWindow) this.recentIndices.shift();
    return this.pool[idx];
  }

  _advance() {
    this.current = this.buildTarget(this.nextItem);
    this.currentIsRare = Math.random() < this.rareChance;
    const avoidNStart = !!(this.current.reading && this.current.reading.endsWith('ん'));
    this.nextItem = this._pickItem(avoidNStart);
  }

  get nextDisplay() {
    const item = this.nextItem;
    if (typeof item === 'string') return item;
    return (item && (item.kanji || item.kana)) || '';
  }

  get remainingMs() {
    if (!this.startTime) return this.durationMs;
    const total = this.durationMs + this.bonusMs;
    const elapsed = (this.endTime || Date.now()) - this.startTime;
    return Math.max(0, total - elapsed);
  }

  get isTimeUp() {
    return this.startTime !== null && this.remainingMs <= 0;
  }

  finish() {
    if (!this.endTime) this.endTime = Date.now();
  }

  handleKey(ch) {
    if (this.endTime) return { result: 'already-complete', comboBonus: 0 };
    if (!this.startTime) this.startTime = Date.now();
    const res = this.current.input(ch);
    let comboBonus = 0;
    let expDelta = 0;
    let ptDelta = 0;
    let rareBonus = null;

    if (res.result === 'incorrect') {
      this.incorrect++;
      this.combo = 0;
    } else {
      this.correct++;
      this.combo++;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      if (this.combo % this.comboStep === 0) {
        const available = this.maxBonusMs - this.bonusMs;
        if (available > 0) {
          comboBonus = Math.min(this.comboSeconds, available / 1000);
          this.bonusMs += comboBonus * 1000;
        }
      }
      if (res.result === 'complete-all') {
        this.wordsCompleted++;
        expDelta = Math.round(this.current.chunks.length * this.expFactor * (1 + this.shieldExpBonus));
        this.expGained += expDelta;
        if (this.wordclearPtBonus > 0) {
          ptDelta = Math.round(this.current.chunks.length * this.wordclearPtBonus);
          this.wordclearPtGained += ptDelta;
        }
        if (this.currentIsRare) {
          rareBonus = { pt: RARE_BONUS_PT, exp: RARE_BONUS_EXP, heart: RARE_BONUS_HEART };
          this.rareEncountersWon += 1;
        }
        this._advance();
      }
    }

    return { ...res, comboBonus, expDelta, ptDelta, rareBonus };
  }

  get accuracy() {
    const total = this.correct + this.incorrect;
    return total === 0 ? 100 : Math.round((this.correct / total) * 1000) / 10;
  }

  get elapsedMs() {
    if (!this.startTime) return 0;
    return (this.endTime || Date.now()) - this.startTime;
  }

  get kpm() {
    const minutes = this.elapsedMs / 60000;
    if (minutes <= 0) return 0;
    return Math.round(this.correct / minutes);
  }
}
