"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Animation libraries are loaded on demand so they stay out of the initial JS bundle.
let libs: Promise<{ gsap: typeof import("gsap").default; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger; Lenis: typeof Lenis }> | null = null;
const load = () =>
  (libs ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(([g, st, l]) => {
    g.default.registerPlugin(st.ScrollTrigger);
    st.ScrollTrigger.config({ ignoreMobileResize: true });
    return { gsap: g.default, ScrollTrigger: st.ScrollTrigger, Lenis: l.default };
  }));

/** Smooth scrolling + scrollytelling engine. Respects prefers-reduced-motion. */
export default function Motion() {
  const pathname = usePathname();

  // Smooth scroll (once)
  useEffect(() => {
    if (reduced()) return;
    let dead = false;
    let cleanup = () => {};
    load().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (dead) return;
      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: { offset: -90 } });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      };
    }).catch(() => {});
    return () => { dead = true; cleanup(); };
  }, []);

  // Per-page scroll choreography
  useIso(() => {
    if (reduced()) return;
    const root = document.documentElement;
    root.classList.add("js-motion"); // hides reveal targets before paint; removed if the libs fail
    window.scrollTo(0, 0);

    let dead = false;
    let teardown = () => {};

    load().then(({ gsap, ScrollTrigger }) => {
      if (dead) return;
      const ctx = gsap.context(() => {
        // Scroll progress bar
        gsap.to("[data-progress]", {
          scaleX: 1, ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        });

        // Hero intro
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
          if (el.dataset.splitDone) return;
          el.dataset.splitDone = "1";
          const words = (el.textContent || "").trim().split(/\s+/);
          el.setAttribute("aria-label", words.join(" "));
          el.textContent = "";
          words.forEach((w, i) => {
            const ln = document.createElement("span");
            ln.className = "ln"; ln.setAttribute("aria-hidden", "true");
            const s = document.createElement("span"); s.textContent = w;
            ln.appendChild(s);
            el.appendChild(ln);
            if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
          });
        });
        const inHero = (el: Element) => !!el.closest(".hero");
        const splitHero = gsap.utils.toArray<HTMLElement>("[data-split]").filter(inHero);
        splitHero.forEach((h) =>
          heroTl.to(h.querySelectorAll(".ln > span"), { y: 0, duration: 1.1, stagger: 0.06 }, 0.15)
        );
        heroTl.to(".hero [data-reveal]", { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.5);
        heroTl.from(".hero__media img", { scale: 1.18, duration: 2.2, ease: "power2.out" }, 0);

        // Other split headings reveal on scroll
        gsap.utils.toArray<HTMLElement>("[data-split]").filter((e) => !inHero(e)).forEach((h) => {
          gsap.to(h.querySelectorAll(".ln > span"), {
            y: 0, duration: 1, stagger: 0.05, ease: "power3.out",
            scrollTrigger: { trigger: h, start: "top 88%", once: true },
          });
        });

        // Generic reveals (batched for a staggered feel)
        ScrollTrigger.batch("[data-reveal]:not(.hero [data-reveal])", {
          start: "top 90%", once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power3.out", overwrite: true }),
        });

        // Parallax imagery (transform only)
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || "10");
          gsap.fromTo(el, { yPercent: -amt }, {
            yPercent: amt, ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
        gsap.to(".hero__media", {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });

        // Roofline draws as you scroll away from hero
        gsap.utils.toArray<SVGPathElement>(".roofline path").forEach((p) => {
          gsap.fromTo(p, { strokeDasharray: 1, strokeDashoffset: 1 }, {
            strokeDashoffset: 0, ease: "none", duration: 1,
            scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true },
          });
        });

        // Chapter marker
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((sec) => {
          ScrollTrigger.create({
            trigger: sec, start: "top 55%", end: "bottom 55%",
            onToggle: (self) => {
              if (!self.isActive) return;
              const id = sec.getAttribute("data-chapter");
              document.querySelectorAll<HTMLElement>(".chapters a").forEach((a) =>
                a.setAttribute("aria-current", String(a.dataset.target === id))
              );
            },
          });
        });

        // Pinned horizontal process (desktop only)
        const mm = gsap.matchMedia();
        mm.add("(min-width: 901px)", () => {
          const pin = document.querySelector<HTMLElement>(".process__pin");
          const track = document.querySelector<HTMLElement>(".process__track");
          if (!pin || !track) return;
          const steps = gsap.utils.toArray<HTMLElement>(".process__step");
          const bar = document.querySelector<HTMLElement>(".process__bar i");
          const setBar = bar ? gsap.quickSetter(bar, "scaleX") : null;
          const dist = () => Math.max(0, track.scrollWidth - pin.clientWidth + 160);
          let last = -1;
          gsap.to(track, {
            x: () => -dist(), ease: "none",
            scrollTrigger: {
              trigger: pin, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true,
              onUpdate: (self) => {
                setBar?.(self.progress);
                const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999));
                if (idx === last) return; // only touch the DOM when the active step changes
                last = idx;
                steps.forEach((s, i) => s.classList.toggle("is-on", i <= idx));
              },
            },
          });
          steps[0]?.classList.add("is-on");
        });
      });

      const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      document.fonts?.ready.then(() => !dead && ScrollTrigger.refresh());
      teardown = () => {
        window.clearTimeout(t);
        window.removeEventListener("load", onLoad);
        ctx.revert();
      };
    }).catch(() => root.classList.remove("js-motion")); // libs failed: show content normally

    return () => {
      dead = true;
      teardown();
      root.classList.remove("js-motion");
    };
  }, [pathname]);

  return <div className="progress" data-progress aria-hidden="true" />;
}
