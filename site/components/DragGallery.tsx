"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { Arrow } from "@/components/ui";

type Item = { slug: string; title: string; location: string; service: string; image: string };

/** Horizontal gallery: grab and drag with a mouse (with momentum), swipe on touch, arrows for keyboard. */
export default function DragGallery({ items }: { items: Item[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const raf = useRef(0);

  const syncBar = useCallback(() => {
    const t = track.current;
    if (!t || !bar.current) return;
    const max = t.scrollWidth - t.clientWidth;
    bar.current.style.transform = `scaleX(${max > 0 ? Math.max(0.08, t.scrollLeft / max) : 1})`;
  }, []);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let down = false, moved = false, startX = 0, startLeft = 0, lastX = 0, vel = 0;

    const glide = () => {
      if (Math.abs(vel) < 0.3) return;
      t.scrollLeft -= vel;
      vel *= 0.94;
      raf.current = requestAnimationFrame(glide);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return; // touch uses native swipe
      cancelAnimationFrame(raf.current);
      down = true; moved = false; startX = lastX = e.clientX; startLeft = t.scrollLeft; vel = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = root.current;
      if (r) { const b = r.getBoundingClientRect(); r.style.setProperty("--x", `${e.clientX - b.left}px`); r.style.setProperty("--y", `${e.clientY - b.top}px`); }
      if (!down) return;
      if (!moved && Math.abs(e.clientX - startX) > 4) { moved = true; t.classList.add("is-dragging"); t.setPointerCapture(e.pointerId); }
      if (!moved) return;
      t.scrollLeft = startLeft - (e.clientX - startX);
      vel = e.clientX - lastX; lastX = e.clientX;
    };
    const onUp = () => {
      if (!down) return;
      down = false; t.classList.remove("is-dragging");
      if (moved && !reduced) raf.current = requestAnimationFrame(glide);
    };

    t.addEventListener("pointerdown", onDown);
    t.addEventListener("pointermove", onMove);
    t.addEventListener("pointerup", onUp);
    t.addEventListener("pointercancel", onUp);
    t.addEventListener("pointerleave", onUp);
    t.addEventListener("scroll", syncBar, { passive: true });
    window.addEventListener("resize", syncBar);
    syncBar();
    return () => {
      cancelAnimationFrame(raf.current);
      t.removeEventListener("pointerdown", onDown);
      t.removeEventListener("pointermove", onMove);
      t.removeEventListener("pointerup", onUp);
      t.removeEventListener("pointercancel", onUp);
      t.removeEventListener("pointerleave", onUp);
      t.removeEventListener("scroll", syncBar);
      window.removeEventListener("resize", syncBar);
    };
  }, [syncBar]);

  const step = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * Math.max(280, track.current.clientWidth * 0.7), behavior: "smooth" });

  return (
    <div className="dragger" ref={root}>
      <div className="dragger__track" ref={track} tabIndex={0} role="group" aria-label="Selected projects, scroll horizontally">
        {items.map((p) => (
          <article key={p.slug} className="dragger__card">
            <div className="dragger__img">
              <Image src={p.image} alt={p.title} fill sizes="(max-width: 900px) 70vw, 32vw" draggable={false} style={{ objectFit: "cover" }} />
            </div>
            <div className="proj__meta"><span>{p.location}</span><span>{p.service}</span></div>
            <h3>{p.title}</h3>
          </article>
        ))}
      </div>
      <span className="dragger__cursor" aria-hidden="true">Drag</span>
      <div className="dragger__foot">
        <div className="dragger__bar" aria-hidden="true"><i ref={bar} /></div>
        <div className="dragger__btns">
          <button type="button" onClick={() => step(-1)} aria-label="Previous projects"><span style={{ display: "inline-block", transform: "scaleX(-1)" }}><Arrow /></span></button>
          <button type="button" onClick={() => step(1)} aria-label="Next projects"><Arrow /></button>
        </div>
      </div>
    </div>
  );
}
