# Story Review

Verdict: Solid, restrained editorial site with no console errors, no horizontal overflow at 1440/768/390, and reduced-motion works (0 hidden elements). The story is held back by a few polish problems: a chapter nav that collides with content, a wrong active chapter near the end, and a clipped/dead-zone process pin. Good, not yet award-level.

Method: production build, Chrome via Playwright, screenshots at 1440/768/390, programmatic fast jumps, reduced-motion context. Not tested: real touch scrolling, FPS profiling.

## Chapter scorecard
| Chapter | Status | Note |
|---|---|---|
| Hero | Works | Strong dusk image, clear focal point, readable headline, CTAs clear. Chapter label "WELCOME" sits on the image edge. |
| Trust strip | Works | Fine, simple. |
| Services | Works | Clean numbered list. |
| Process | Needs work | Pinned horizontal scroll works on desktop, but numerals clip under the header and a ~240px empty dark band follows the progress line. |
| Work | Needs work | Good imagery; the chapter label overlaps the right-hand image. |
| Reviews | Works | Placeholder-marked as required. |
| Areas | Works | Not scored in detail. |
| CTA / footer | Needs work | Chapter nav reads "Welcome" here (wrong) and its dots overlap the dark band. |

## Problems (most severe first)
1. [Major] Chapter nav - active chapter is wrong after a fast jump to the bottom (shows "Welcome" at the page end) - `1440-end-fastjump.png` - the `onToggle` handler only acts when a section becomes active, so skipping sections leaves a stale state. Use `onUpdate`/`onEnter`/`onEnterBack` per section, or compute the active section on `ScrollTrigger` refresh; clear the marker (or hide `.chapters`) once past the last chapter (`areas`).
2. [Major] Process - step numerals "03/04" clip under the 76px sticky header during the pin - `1440-process-mid.png` - add `padding-top: 76px` to `.process__pin` (or `start: "top 76px"`) so content is centred in the visible area.
3. [Major] Process - ~240px empty dark band below the progress line at the end of the pin, a dead zone - `1440-process-mid.png` - set `.process__pin` height to `calc(100vh - 76px)` and `align-items: center`, or reduce bottom padding to ~4rem.
4. [Minor] Chapter nav - the label text ("WELCOME", "WORK") overlaps hero and project imagery with poor contrast - `1440-hero.png`, `1440-work.png` - show labels only on hover/focus, keeping just the dots, or add a 1px text-shadow `0 0 8px rgba(0,0,0,.4)`.
5. [Minor] Mobile process - the "01/02" numerals are near-invisible dark grey on ink - `390-process.png` - raise to `rgba(184,105,58,.45)` (copper at 45%) on the dark background.
6. [Minor] Mobile - no motion in the process section (static stack). Acceptable, but the pinned chapter loses its identity; add a simple `data-reveal` stagger per step.

## What's working (keep)
- Hero: split-word headline, image settle, and one clear CTA pair.
- One pin per page, scrubbed at 0.6, with a progress line.
- Transform/opacity only; libraries lazy-loaded; no console errors.
- Reduced-motion: all content visible, no transforms.
- Sticky mobile "Call / Free Estimate" bar; no horizontal overflow at any width.
- Placeholder notices are visible and honest, matching the brief.

## Fix status (re-verified in Chrome at 1440 and via scripted fast jumps)
- Problem 1 fixed: chapter marker uses enter/enter-back callbacks and clears past the last chapter. Verified across jumps and reverse scrolling.
- Problems 2 and 3 fixed: `.process__pin` padding is now `8rem 4rem`; numerals no longer clip under the header and the dead band is gone.
- Problem 4 fixed: chapter labels have a bone background chip.
- Problems 5 and 6 fixed: mobile numerals use copper at 50%; mobile process steps reveal one by one. The mobile changes were built and type-checked but not re-screenshotted.
