"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { guides } from "@/lib/data";

const cats = ["All", ...Array.from(new Set(guides.map((g) => g.category))), "FAQs"];

export default function BlogList() {
  const [cat, setCat] = useState("All");
  const list = useMemo(() => guides.filter((g) => cat === "All" || g.category === cat), [cat]);
  const featured = list[0];
  const remaining = list.slice(1);
  return (
    <>
      <div className="chip-row" role="group" aria-label="Filter articles">
        {cats.map((c) => (
          <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      {cat === "FAQs" ? (
        <div className="guide-empty">
          <p>Looking for a quick answer? Browse common questions from homeowners.</p>
          <Link href="/blog/faqs" className="arrow-link">Browse roofing FAQs</Link>
        </div>
      ) : (
        <div className="guide-library" key={cat}>
          {featured && (
            <article className="guide-feature" data-blog-reveal>
              <Link className="guide-feature__image" href={`/blog/roofing-guides#${featured.slug}`} tabIndex={-1} aria-hidden="true">
                <Image src="/images/p04.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 56vw" />
                <span className="guide-feature__index">Field note / 01</span>
              </Link>
              <div className="guide-feature__copy">
                <span className="label">{featured.category} · Featured guide</span>
                <h2>{featured.title}</h2>
                <p>{featured.summary}</p>
                <Link className="arrow-link" href={`/blog/roofing-guides#${featured.slug}`}>Read the guide</Link>
              </div>
            </article>
          )}
          {remaining.length > 0 && (
            <div className="guide-list" aria-label="More roofing guides">
              <div className="guide-list__head"><span className="label">The library</span><span>{remaining.length} more {remaining.length === 1 ? "guide" : "guides"}</span></div>
              {remaining.map((g) => (
                <article key={g.slug} className="guide-row" data-blog-reveal>
                  <span className="guide-row__category">{g.category}</span>
                  <div className="guide-row__copy">
                    <h3>{g.title}</h3>
                    <p>{g.summary}</p>
                  </div>
                  <Link className="guide-row__link" href={`/blog/roofing-guides#${g.slug}`} aria-label={`Read ${g.title}`}>
                    <span>Read guide</span><i aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M4 12 12 4M5 4h7v7" /></svg></i>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
