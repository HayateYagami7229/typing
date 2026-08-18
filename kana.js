const SMALL_KANA = new Set(['ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ']);

const TWO_CHAR_TABLE = {
  'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'],
  'しゃ': ['sha', 'sya'], 'しゅ': ['shu', 'syu'], 'しょ': ['sho', 'syo'],
  'ちゃ': ['cha', 'tya'], 'ちゅ': ['chu', 'tyu'], 'ちょ': ['cho', 'tyo'],
  'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'],
  'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'],
  'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'],
  'じゃ': ['ja', 'zya'], 'じゅ': ['ju', 'zyu'], 'じょ': ['jo', 'zyo'],
  'ぢゃ': ['dya'], 'ぢゅ': ['dyu'], 'ぢょ': ['dyo'],
  'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],
  'ふぁ': ['fa', 'fuxa', 'fula'], 'ふぃ': ['fi', 'fuxi', 'fuli'], 'ふぇ': ['fe', 'fuxe', 'fule'], 'ふぉ': ['fo', 'fuxo', 'fulo'],
  'てぃ': ['ti', 'texi', 'teli'], 'でぃ': ['di', 'dexi', 'deli'],
  'とぅ': ['tu', 'toxu', 'tolu'], 'どぅ': ['du', 'doxu', 'dolu'],
  'ちぇ': ['che', 'chixe', 'chile'], 'じぇ': ['je', 'jixe', 'jile'], 'しぇ': ['she', 'shixe', 'shile'],
  'うぃ': ['wi', 'uxi', 'uli'], 'うぇ': ['we', 'uxe', 'ule'], 'うぉ': ['wo', 'who', 'uxo', 'ulo'],
};

const KANA_TABLE = {
  'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
  'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
  'さ': ['sa'], 'し': ['shi', 'si'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
  'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  'わ': ['wa'], 'ゐ': ['wi'], 'ゑ': ['we'], 'を': ['wo'], 'ん': ['n', 'nn'],
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'],
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
  'ぁ': ['xa', 'la'], 'ぃ': ['xi', 'li'], 'ぅ': ['xu', 'lu'], 'ぇ': ['xe', 'le'], 'ぉ': ['xo', 'lo'],
  'ゃ': ['xya', 'lya'], 'ゅ': ['xyu', 'lyu'], 'ょ': ['xyo', 'lyo'],
  '、': [','], '。': ['.'], '!': ['!'], '?': ['?'], ' ': [' '],
  '！': ['!'], '？': ['?'], '「': ['['], '」': [']'], '・': ['/'], '〜': ['-'],
};

function normalizeKana(str) {
  return str.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

function tokenizeKana(raw) {
  const kana = normalizeKana(raw);
  const chars = Array.from(kana);
  const tokens = [];
  let i = 0;
  while (i < chars.length) {
    const c = chars[i];
    const next = chars[i + 1];
    if (c === 'っ') {
      tokens.push({ type: 'sokuon', kana: c });
      i++;
      continue;
    }
    if (c === 'ー') {
      tokens.push({ type: 'chouon', kana: c });
      i++;
      continue;
    }
    if (next && SMALL_KANA.has(next) && TWO_CHAR_TABLE[c + next]) {
      tokens.push({ type: 'kana', kana: c + next, options: TWO_CHAR_TABLE[c + next].slice() });
      i += 2;
      continue;
    }
    if (KANA_TABLE[c]) {
      tokens.push({ type: 'kana', kana: c, options: KANA_TABLE[c].slice() });
      i++;
      continue;
    }
    tokens.push({ type: 'kana', kana: c, options: [c] });
    i++;
  }

  const merged = [];
  for (let j = 0; j < tokens.length; j++) {
    const t = tokens[j];
    if (t.type === 'sokuon') {
      const nextTok = tokens[j + 1];
      if (nextTok && nextTok.type === 'kana') {
        const doubled = nextTok.options.map((o) => o[0] + o);
        merged.push({ kana: t.kana + nextTok.kana, options: [...new Set([...doubled, 'ltu', 'xtu'])] });
        j++;
      } else {
        merged.push({ kana: t.kana, options: ['ltu', 'xtu'] });
      }
      continue;
    }
    if (t.type === 'chouon') {
      merged.push({ kana: t.kana, options: ['-'] });
      continue;
    }
    merged.push({ kana: t.kana, options: t.options });
  }

  for (let i = 0; i < merged.length; i++) {
    const chunk = merged[i];
    if (chunk.kana !== 'ん' || chunk.options.length <= 1) continue;
    const next = merged[i + 1];
    const nextStartsWithN = next && next.options.some((o) => o[0] === 'n');
    if (nextStartsWithN) {
      chunk.options = chunk.options.filter((o) => o !== 'n');
      if (chunk.options.length === 0) chunk.options = ['nn'];
    }
  }

  return merged;
}
