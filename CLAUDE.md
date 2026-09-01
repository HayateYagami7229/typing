# Endless Type-loop — working rules & system knowledge

This file exists because conversations about this project get long and get compacted. Compaction
loses fine-grained detail. This file must not. Whenever something important gets established in
conversation — a rule, a correction, a piece of system understanding — it belongs here, not just
in the chat transcript. Treat this as the durable memory for the project; the chat is disposable.

## 1. Game nature & philosophy (why decisions get made the way they do)

- **Never gate progression behind typing speed or accuracy.** Continuation — just keep playing —
  must always be enough to progress. Every mechanic (grace windows, input-ambiguity handling,
  difficulty) is designed around this. Do not introduce speed/accuracy gates.
- **The precise order in which a player discovers things is the actual point of the game**, not a
  minor pacing preference. The user's words: getting the sequencing right is how the game's real
  essence comes through. This is why Phase-gating (below) is treated as launch-blocking severity,
  not cosmetic polish.
- Tone is self-aware and dryly funny in flavor text/achievements (e.g. "見てるからもう祈らないで
  ください", "疑心暗鬼", the compressed-battery joke item that costs 2.5億pt for the same effect as
  one keystroke). Silly/joke content is welcome and intentional — it still must respect Phase-gating
  and the no-speed-gate rule.
- PC-only target: widths ≤1280px are explicitly unsupported (動作保証外). iPad may be acceptable.
- Small-scale solo indie project, live in public Beta at endless-type-loop.online (X: @HayateYagami_X).
  Monetization/analytics groundwork (GA4, X-share virality) is being built alongside core Phase2
  content — both matter, don't treat one as more "real" than the other.

## 2. Phase2-default scope (critical — narrative spoiler risk)

The story has two phases: Phase1 (before defeating the demon lord / 魔王, `save.maouDefeated ===
false`) and Phase2 (`save.maouDefeated === true`). Phase1 is finished/stable; current work is
fine-tuning the overall experience and building out Phase2.

**Any new mechanic, panel, shop item, or announcement defaults to Phase2-only** unless the user
explicitly says it should apply in Phase1 too. If something new ends up visible or usable in
Phase1 without being told to, treat that as a bug, not an acceptable default.

Check *every* entry point when adding a new Phase2 feature, not just the obvious one:
- The main UI panel/window
- Shop item catalog visibility (`requiresMaouDefeated`-style flag in the catalog entry)
- The purchase/effect handler itself — don't rely solely on UI-level gating, guard the underlying
  function too, so a direct call can't bypass the phase check
- Any function that mutates the feature's state (e.g. per-keystroke hooks) should itself refuse to
  act if `!save.maouDefeated`, not just be called conditionally by its caller

When implementing a new Phase2 system, do a final adversarial pass: force `maouDefeated = false`
plus every "already owns / already in progress" flag for the new feature, and confirm nothing
shows up and no function call has any effect. This has caught real bugs more than once — don't skip it.

A real incident: `item_mechanical_egg` (a joke/easter-egg item added long before the Phase2-scope
rule existed) had no phase gate at all and was visible/purchasable in Phase1 on production for an
unknown period. Old features can have this gap even if new ones are built correctly — when auditing
a feature area, check pre-existing catalog entries too, not just what you're actively adding.

## 3. Main game loop (how a player actually progresses)

1. Type words/sentences/long-text in one of 3 dungeon modes (単語の間 / 文章の回廊 / 長文の塔),
   JP or EN, earning pt + EXP per correct keystroke and per word/sentence completion.
2. Spend pt on: disciple (弟子) stat upgrades (HP/STR/DEF/SPD — internal save/data key is still `dex`,
   only the display label reads DEF), shop equipment (sword/shield/armor/
   ring — boost pt multiplier or combo mechanics), one-time system unlocks (heart vessel, eternal
   combo, mechanical egg, etc.).
3. EXP → level → prestige (転生: resets to Lv.1 for permanent bonuses, level cap `MAX_LEVEL = 99`
   per cycle). Repeated prestige unlocks 覚醒 (awakening) tiers at prestige 10/20/30 with cumulative
   bonuses (`PRESTIGE_AWAKENING_TIERS` in progression.js).
4. Disciple battles other disciples using their stats, funded by the player's pt investment; win
   streaks build up (feeds achievements, and a 10,000-streak unlocks 一括対戦 batch-battle).
5. 女神像 (god statue) restoration loop: restore → send to Ragnarok, ×100 times → pivots to 女神の
   園 (garden) system, which feeds rare-monster-emblem drop bonuses for the Maou fight.
6. Disciple reaching 1000 total stats (`classUpped`) reveals the Maou gate. Collect 魔王の紋章
   emblems via typing (drop chance boosted by god-garden/Rico bonuses), then fight and defeat the
   Maou. **This is the Phase1→Phase2 transition** — full story cutscene, world/logo/aesthetic change.
7. Phase2: Rico (リコ) storyline (equip her gear → meet her → max her gear → pray at her tablet),
   封紋章 crafting, and the mechanical egg endgame system (see below). More Phase2 content is being
   actively designed — this is the current focus of development.

## 4. Core systems reference

### Romaji typing engine
- `TypingMatcher`/`TypingTarget` (engine.js) do chunk-based romaji matching against `kana.js`'s
  `TWO_CHAR_TABLE`/`KANA_TABLE`.
- **Design principle for any kana-table entry: match what a real Japanese IME actually expects for
  that input, not a phonetic guess.** Established fixes this way: てぃ=`thi` (not `ti` — `ti`
  resolves to ち in a real IME), でぃ=`dhi`, とぅ=`twu`, どぅ=`dwu`, うぉ=`who` (not `wo` — that's
  を). じゃ/じゅ/じょ accept both `ja`/`zya` and `jya` variants.
- ー (chōonpu, long vowel mark) is typed **only** via the literal hyphen key. Vowel-doubling
  (`paatii` for パーティー) was tried and explicitly reverted — that's not how real IME input
  works, doubling the vowel produces real vowel kana, not ー.
- Word-final ん typed as bare `n`: a 250ms grace-swallow window follows, absorbing one stray `n`
  keystroke (N-key only) without registering it as a miss or a hit — no combo/pt gain either way.
  This distinguishes rapid "nn"-habit typists from genuinely late/wrong keystrokes. `itemStartsWithN`
  in engine.js also avoids picking a next word that starts with N right after a ん-ending word.

### Versioning
- Normal (announced) update: bump the trailing digit of the footer version (`Beta0.66` → `Beta0.67`)
  and add a `CHANGELOG` entry in `game.js` using the user's exact dictated wording, verbatim,
  including apparent typos — it's their authorial voice, not something to fix.
- Silent update (no changelog, no version-number change): append/increment a letter suffix on the
  footer only (`0.67` → `0.67a` → `0.67b`, ...). Reset to no letter on the next real numbered bump.
- Never do a decimal rollover (`0.6` → `0.7`) except on an explicit user-requested milestone.

### Push discipline
- **Never propose pushing** after implementing new/main game content. Verify locally (screenshots,
  direct function tests, a testable save state), then stop and wait for the user to say they're
  ready — they decide when something matches the design in their head, not you.
- Minor system-level fixes (typos, small CSS, a version-footer correction) are fine to just push
  without asking.
- Once a merge to `main` is explicitly authorized, the follow-up push doesn't need re-asking —
  that's the natural completion of the action already approved.
- For a genuinely risky change (e.g. one that touches deploy config), a feature branch + adversarial
  local testing is worth it, but don't over-apply this — it's an exception, not the default workflow.

### Testing hygiene (repeatedly gotten wrong this session — be careful)
- After any local test round that mutates `save`, **always** reset to a clean, known-good testable
  state before ending the turn: `save = defaultSave()`, set only the fields relevant to what the
  user needs to test next, `persistSave()`, and verify via a **persisted** read-back
  (`normalizeSave(decodeSaveData(localStorage.getItem(SAVE_KEY)))`), not just the in-memory `save`
  object — the two can silently diverge if `persistSave()` wasn't actually called after the last
  mutation.
- Don't leave stale/broken state (e.g. a half-finished adversarial test with `maouDefeated: false`)
  sitting in localStorage for the user to stumble into. This has happened multiple times and reads
  as sloppy — double check before saying "ready to test."
- `location.reload()` triggered from injected JS does not behave reliably inside the automated
  Browser-pane testing tool used in this workflow (similar issue to `window.open`/`confirm()`
  behaving oddly under automation) — don't trust automated verification of reload-dependent flows;
  say so plainly and ask the user to do that one step themselves rather than reporting a false pass.

### Hosting & deployment (Cloudflare)
- This is a **Cloudflare Workers** project (Workers Builds, GitHub-integrated), not Cloudflare Pages
  — that distinction matters. Worker name: `endlesstypeloop`. Custom domain: endless-type-loop.online
  (via ムームードメイン nameservers pointed at Cloudflare). Also reachable at
  `endlesstypeloop.yagami-9aa.workers.dev`.
- Production branch is `main`; pushing `main` deploys live immediately.
- **Workers Builds has no per-branch preview URLs** (unlike Pages). Pushing a non-`main` branch
  triggers a build (validates config/bindings, catches errors like a bad R2 binding) but does **not**
  deploy anywhere reachable. Don't expect to "test on a branch" the way Pages allows — the only way
  to see a change live is to merge to `main`.
- `wrangler.jsonc` + `src/worker.js`: a custom Worker script serves the static site (via the `ASSETS`
  binding) and additionally handles the X-share feature's endpoints:
  `POST /api/share` (uploads a PNG to R2, returns a share URL), `GET /s/:id` (serves an HTML page
  with OGP meta tags pointing at the image, for X's link-card crawler), `GET /s/:id.png` (serves the
  raw image from R2). R2 bucket: `endless-type-loop-shares`. Daily upload cap: 300 (cost/abuse guard).
- GA4 measurement ID `G-7W2B8HZERF` is hardcoded in `index.html`, but the actual `gtag.js` script is
  only injected when `location.hostname` is **not** `localhost`/`127.0.0.1` — this exists specifically
  so local debugging never pollutes production analytics. Never remove this guard, and never work
  around it just to "test GA4 locally" — pollution risk is real and already happened once before the
  guard was added.
- GA4 tracking implemented: 21 Phase1 funnel-block events (`funnel_1_1`...`funnel_1_21`, fired once
  each via `save.funnelBlocksSent`) and 14 user_properties sent on every `persistSave()` (max_level,
  prestige_count, etc. — note GA4 user-property **names** have a strict 24-character limit).

### Mechanical egg system (Phase2 endgame, still evolving)
- `item_mechanical_egg` (1,000,000,000pt, Phase2-gated) unlocks `save.mechanicalEggOwned`.
- Charges via typing: each correct keystroke adds `mechanicalEggEffectiveRateUnits()` to
  `save.mechanicalEggChargeKeys`, where 1 unit = 0.001% and target = 100,000 units (100%) to hatch.
- `item_compressed_battery` (250,000,000pt, repeatable, Phase2-gated, unlocks once charge ≥ 0.0001%
  i.e. after 1 keystroke) **permanently increases the charge RATE** by +1 unit per purchase — it is
  not an instant charge injection, despite costing 250x more than one keystroke's worth (the absurd
  price-for-effect ratio is an intentional joke, per the user).
- Every time the raw rate (unaffected by the runaway multiplier) crosses a multiple of 10, an
  escalating "runaway" event doubles the effective multiplier again (`2 ** tier`) and shows a popup.
  This can repeat indefinitely (tier 1 at rate 10, tier 2 at rate 20, tier 3 at rate 30, ...).
- Reaching 100,000 units hatches the egg (`mechanicalEggHatched`) — currently just a flavor-text
  stub with no functional reward yet; that's future work, not a bug.
- All entry points are independently guarded with `!save.maouDefeated` checks (panel visibility,
  shop visibility for both items, both purchase handlers, and the charge/boost functions themselves)
  — see the Phase2-default-scope adversarial-audit note above; this system was the reason that
  practice got formalized.

### Achievement system
- `ACHIEVEMENTS` array in `game.js`: `{ id, icon, label, check(save) => bool, red?, sss? }`.
- Achievements are **not** one-time trigger flags — `check()` is evaluated live every
  `renderAchievements()` call against current save state. A player who already has qualifying
  historical stats (e.g. `bestRankByKey` already SSS from before the achievement existed) sees it
  unlock automatically on next render, no re-triggering needed.
- `red: true` gives a static red-tinted glow (existing pattern, used by `rico_all_owned`).
- `sss: true` gives a pulsing purple/gold radial-gradient aura drawn as a `::before` circle behind
  the icon (`.achievement-icon-sss` in style.css) — deliberately **not** a `filter: drop-shadow` on
  the glyph itself, because drop-shadow traces the emoji's actual alpha silhouette and made
  differently-shaped emoji (🌠/💀 vs 🗡️/⚔️/🗼) look inconsistently bright. The radial-gradient-behind
  approach is uniform regardless of glyph shape — keep it that way if this gets touched again.
  Current aura sizing is tuned small and subtle (user iterated it down from an initial oversized/
  overlapping version) — don't casually enlarge it back.
- Rank achievements (SS and SSS per dungeon, plus "any dungeon SSS") are ordered grouped-by-dungeon
  (any→word SS→word SSS→sentence SS→sentence SSS→long SS→long SSS), not grouped-by-tier. `魔王を
  倒した` also carries `sss: true`.

## 5. How the user works (communication norms, established through direct correction)

- Don't over-confirm or re-ask about things the user already stated plainly (e.g. re-verifying an
  exact name/spelling they already gave) — it reads as tactless and wastes their time. Trust their
  word on straightforward factual claims.
- Don't phrase status reports as "確認できました" in a way that implies you're the one signing off —
  the user is the decision-maker (責任者); frame it as "please confirm/review," not as settled.
- When something is flagged as urgent/live-breaking (e.g. a bug exposed to real production players),
  don't panic into an unreviewed rushed push — assess real urgency (time of day, actual exposure
  window) and communicate options, but don't act unilaterally on main-content changes either way.
- Exact user-dictated text (changelog entries, in-game popups, flavor text) is preserved verbatim.
