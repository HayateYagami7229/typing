# Endless Type-loop — working rules

These are standing rules for this project. They take priority over inferring conventions from
code alone, and they must not get lost to conversation compaction.

## Phase2-default scope (critical — narrative spoiler risk)

The story has two phases: Phase1 (before defeating the demon lord / 魔王, `save.maouDefeated === false`)
and Phase2 (`save.maouDefeated === true`). Phase1 is finished/stable; current work is fine-tuning
the overall experience and building out Phase2.

The precise order in which a player experiences reveals is core to what this game is — not a minor
pacing preference. Getting that sequencing right is how the game's real point comes through. Treat
"what shows up when" with the same care as correctness, not as an afterthought to polish later.

**Any new mechanic, panel, shop item, or announcement defaults to Phase2-only** unless the user
explicitly says it should apply in Phase1 too. If something new ends up visible or usable in
Phase1 without being told to, treat that as a bug, not an acceptable default.

This is not just a gameplay-balance preference — showing Phase2 content in Phase1 is a major
narrative spoiler and breaks the intended experience. When adding a new feature, check *every*
entry point, not just the obvious one:
- The main UI panel/window
- Shop item catalog visibility (`requiresMaouDefeated`-style flag)
- The purchase/effect handler itself (don't rely solely on UI-level gating — guard the underlying
  function too, so a direct call can't bypass the phase check)
- Any function that mutates the feature's state (e.g. per-keystroke hooks) should itself refuse to
  act if `!save.maouDefeated`, not just be called conditionally by its caller

When implementing a new Phase2 system, do a final adversarial pass: force `maouDefeated = false`
plus every "already owns / already in progress" flag for the new feature, and confirm nothing
shows up and no function call has any effect.

## Versioning

- Normal (announced) update: bump the trailing digit of the footer version (e.g. `Beta0.65` →
  `Beta0.66`) and add a `CHANGELOG` entry in `game.js` using the user's exact dictated wording.
  Never do a decimal rollover (`0.6` → `0.7`) except on an explicit user-requested milestone.
- Silent update (no changelog, no version-number change): append/increment a letter suffix on the
  footer only (`0.66` → `0.66a` → `0.66b`, ...). Reset to no letter on the next real numbered bump.
- **Never propose pushing** after implementing new/main game content. Verify locally (screenshots,
  direct function tests, a testable save state), then stop and wait for the user to say they're
  ready — they decide when something matches the design in their head. Minor system-level fixes
  (typos, small CSS, a version-footer correction) are fine to just push without asking.

## Local dev / analytics hygiene

- `index.html` skips loading real GA4 (`gtag.js`) when `location.hostname` is `localhost`/`127.0.0.1`
  — this exists so local debugging never pollutes production analytics. Don't remove this guard.
- When testing locally in the browser tab, leave the tab in a clean, testable state when done
  (reset `save` via `defaultSave()` plus whatever fields the user needs to test from, then
  `persistSave()` and confirm the persisted value, not just the in-memory one) — don't leave stale
  debug state (e.g. `save = defaultSave()` with no explicit fields set, or a mid-test mutation)
  sitting in localStorage for the user to stumble into.

## Design philosophy

- Never gate a goal behind typing speed or accuracy. Continuation (just keep playing) should always
  be enough to progress — see [[typing_game_design_philosophy]] in Claude's memory for more.
- PC-only: widths ≤1280px are explicitly unsupported (動作保証外). iPad may be acceptable.

## Other standing conventions

- Exact user-dictated text (changelog entries, in-game flavor text, popup copy) is preserved
  verbatim, including quirks/typos — it's the user's authorial voice, not something to "fix".
