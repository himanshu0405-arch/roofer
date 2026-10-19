"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
  initial?: number;
  aspect?: string; // CSS aspect-ratio, fixed to avoid layout shift
};

export default function BeforeAfter({
  before, after, alt, beforeLabel = "Before", afterLabel = "After", initial = 50, aspect = "4 / 3",
}: Props) {
  const [pos, setPos] = useState(initial);
  const box = useRef<HTMLDivElement>(null);
  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  const fromPointer = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r && r.width) setPos(clamp(((clientX - r.left) / r.width) * 100));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => clamp(p - step));
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => clamp(p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <figure className="ba" style={{ aspectRatio: aspect }}>
      <div
        ref={box}
        className="ba__box"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e.clientX); }}
        onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e.clientX); }}
      >
        <Image src={after} alt={`${alt} (${afterLabel})`} unoptimized={after.endsWith(".svg")} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} draggable={false} />
        <div className="ba__top" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={`${alt} (${beforeLabel})`} unoptimized={before.endsWith(".svg")} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} draggable={false} />
        </div>
        <span className="ba__tag ba__tag--l">{beforeLabel}</span>
        <span className="ba__tag ba__tag--r">{afterLabel}</span>
        <div className="ba__line" style={{ left: `${pos}%` }}>
          <button
            type="button"
            role="slider"
            aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% ${beforeLabel}`}
            className="ba__handle"
            onKeyDown={onKey}
          />
        </div>
      </div>
    </figure>
  );
}
