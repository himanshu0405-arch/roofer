---
name: scrollytelling
description: Use when building or adding scroll-driven storytelling to a website - chapter-based scroll narratives, pinned sections, parallax, horizontal scroll, scroll progress, and scroll animation with GSAP/ScrollTrigger or CSS. Use after a design exists (e.g. from Stitch) and brief.md defines the story.
---

# Scrollytelling

Turn a static, already-designed site into a story that unfolds as the user scrolls. Every motion must serve the story in `brief.md`; if it doesn't, cut it.

## Inputs
- `brief.md` (story chapters, mood) - read it first. If missing, ask the user to create one.
- `DESIGN.md` / the built site. Do not change the visual design, only add motion.

## Process
1. **Map chapters.** List each section of the page as a chapter: purpose, emotion, the one thing it must communicate. Write this to `.stitch/scroll-plan.md` (or `scroll-plan.md`).
2. **Assign one signature motion per chapter** (see menu). At most one hero effect per chapter; supporting motion stays subtle.
3. **Implement** with the stack's idiom. Default: GSAP + ScrollTrigger (+ Lenis only if smooth scroll is requested). Pure CSS `animation-timeline: scroll()/view()` is fine for simple reveals with a fallback.
4. **Verify** at desktop (1440), tablet (768), phone (390) widths, with fast scrolling, and with reduced motion on.

## Effect menu
- **Reveal**: fade/translate-up on enter (16-40px, 0.5-0.8s, ease-out). Default for text and cards.
- **Pin + scrub**: pin a section while an inner timeline scrubs with scroll (`scrub: 0.5-1`). Use for key moments, max ~3 per page.
- **Parallax**: background layers move 5-25% slower than content. Never parallax text.
- **Horizontal scroll**: pin a section and translate a track on X (timelines, galleries). Disable or convert to vertical stack on narrow screens.
- **Progress / chapter marker**: a fixed indicator tied to the active chapter.
- **Counter / draw / mask**: number count-ups, SVG path draw, clip-path reveals for emphasis.
- **Ambient motion** (stars, particles): capped counts, low contrast; speed may react to scroll velocity but clamp it.

## Rules
- **Restraint.** Animation is seasoning. If two effects compete in a viewport, remove one.
- **Performance.** Animate only `transform` and `opacity`. Use `will-change` sparingly. Cap particle/canvas counts (<= ~150 on desktop, <= ~60 on mobile). Throttle velocity-driven effects and clamp the max.
- **Pacing.** Pinned sections should last 1-3 viewport heights. No dead scroll: something meaningful must change within every ~100vh.
- **Accessibility.** Honor `prefers-reduced-motion: reduce` (disable pin/scrub/parallax, show content immediately). Content must be readable with JS animations failed. Keep focus order and anchors working; never hijack native scroll unless asked.
- **Responsive.** Re-create ScrollTriggers per breakpoint with `gsap.matchMedia()`. No horizontal page overflow. Test touch scrolling.
- **Cleanup.** Kill ScrollTriggers/timelines on unmount (React/Next: `gsap.context()` + `ctx.revert()`); call `ScrollTrigger.refresh()` after fonts/images load.
- **No layout shift.** Reserve space for pinned sections (`pinSpacing`), set explicit image dimensions.

## GSAP skeleton
```js
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();
mm.add({ ok: "(prefers-reduced-motion: no-preference)" }, () => {
  gsap.utils.toArray("[data-reveal]").forEach((el) =>
    gsap.from(el, { y: 32, opacity: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true } }));
});
```

## Done when
- Every chapter in the plan has its motion and the transitions between chapters feel continuous.
- No console errors, no jank on a mid-range phone, reduced-motion works.
- Then run `/story-review`.
