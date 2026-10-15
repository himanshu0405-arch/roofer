"use client";

import Link from "next/link";
import { useState } from "react";
import { areas } from "@/lib/data";

/** Stylised service-area map (schematic, not to scale) linked with the area list. */
export default function AreaMap() {
  const [hot, setHot] = useState<string | null>(null);
  const h = (slug: string | null) => ({ onMouseEnter: () => setHot(slug), onMouseLeave: () => setHot(null), onFocus: () => setHot(slug), onBlur: () => setHot(null) });

  return (
    <div className="areas">
      <div className="map" data-reveal>
        <svg viewBox="0 0 100 100" role="img" aria-label="Schematic map of the Columbus service area">
          <circle className="ring" cx="50" cy="52" r="14" />
          <circle className="ring" cx="50" cy="52" r="28" />
          <circle className="ring" cx="50" cy="52" r="44" />
          <path className="river" d="M-2 60 C 20 50, 30 66, 48 58 S 80 40, 102 46" />
          <path className="road" d="M50 4 L50 96 M4 52 L96 52 M14 14 L86 90 M86 14 L14 90" />
          {areas.map((a) => (
            <Link key={a.slug} href={`/locations/${a.slug}`} aria-label={a.title} data-hot={hot === a.slug} {...h(a.slug)}>
              <circle className="halo" cx={a.x} cy={a.y} r="9" />
              <circle className="pin" cx={a.x} cy={a.y} r="1.3" />
              <text x={a.x > 60 ? a.x - 2.6 : a.x + 2.6} y={a.y + 1} textAnchor={a.x > 60 ? "end" : "start"}>{a.towns[0]}</text>
            </Link>
          ))}
        </svg>
      </div>
      <ul className="area-list" data-reveal>
        {areas.map((a) => (
          <li key={a.slug}>
            <Link href={`/locations/${a.slug}`} data-hot={hot === a.slug} {...h(a.slug)}>
              {a.title}
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
