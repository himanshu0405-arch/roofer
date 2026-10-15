# Scroll plan: Home

Story: a roofline at dusk, then the craft is revealed (services, process, proof, community), ending on the CTA. Implemented in `site/components/Motion.tsx`; hooks are `data-*` attributes in the markup.

| # | Chapter | Purpose | Signature motion | Supporting |
|---|---------|---------|------------------|------------|
| 1 | Hero (`top`) | Calm, confident first impression | Word-by-word headline mask reveal + image settle (scale 1.18 to 1) | Roofline SVG draws on scroll-away, hero image parallax 12% |
| 2 | Trust strip | Quick reassurance | Staggered fade-up | none |
| 3 | Services | Show the five services clearly | Split-heading reveal | Batched row reveals |
| 4 | Process | Disciplined execution | **Pinned horizontal scroll** (desktop), step highlight + progress bar | Stacks vertically under 901px |
| 5 | Work | Proof of craft | Lead image parallax (6%) | Tile reveals |
| 6 | Reviews | Social proof (placeholders) | Staggered reveal | none |
| 7 | Areas | Community | Split-heading reveal | Map reveal |
| 8 | CTA band | Convert | Reveal | none |

Global: top scroll-progress bar, chapter marker (`aria-current`), Lenis smooth scroll.

Rules honoured: transform/opacity only; one pin per page; `prefers-reduced-motion` disables everything and shows content; libraries lazy-loaded; ScrollTriggers reverted on route change; refresh after fonts/load.
