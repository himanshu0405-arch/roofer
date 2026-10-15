"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { services } from "@/lib/data";

/** Numbered service list with a cursor-following image preview (hover devices only). */
export default function ServiceList() {
  const prev = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState(services[0].image);
  const [on, setOn] = useState(false);

  const move = (e: React.MouseEvent) => {
    const el = prev.current;
    if (el) { el.style.left = e.clientX + 40 + "px"; el.style.top = e.clientY + "px"; }
  };

  return (
    <>
      <ul className="svc-list" onMouseMove={move} onMouseLeave={() => setOn(false)}>
        {services.map((s, i) => (
          <li key={s.slug} data-reveal>
            <Link
              href={`/roofing-services/${s.slug}`}
              className="svc-row"
              onMouseEnter={() => { setImg(s.image); setOn(true); }}
              onFocus={() => { setImg(s.image); }}
            >
              <span className="num">0{i + 1}</span>
              <div><h3>{s.title}</h3><small>{s.kicker}</small></div>
              <p>{s.summary}</p>
              <span className="go" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={prev} className="svc-preview" data-on={on} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" />
      </div>
    </>
  );
}
