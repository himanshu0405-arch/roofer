"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { guides } from "@/lib/data";

const cats = ["All", ...Array.from(new Set(guides.map((g) => g.category))), "FAQs"];

export default function BlogList() {
  const [cat, setCat] = useState("All");
  const list = useMemo(() => guides.filter((g) => cat === "All" || g.category === cat), [cat]);
  return (
    <>
      <div className="chip-row" role="group" aria-label="Filter articles">
        {cats.map((c) => (
          <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      {cat === "FAQs" ? (
        <p>Browse our <Link href="/blog/faqs" className="arrow-link">Roofing FAQs</Link>.</p>
      ) : (
        <div>
          {list.map((g) => (
            <article key={g.slug} className="article">
              <span className="label">{g.category}</span>
              <div>
                <h3>{g.title}</h3>
                <p>{g.summary}</p>
                <Link className="arrow-link" style={{ marginTop: "1rem" }} href={`/blog/roofing-guides#${g.slug}`}>Read guide</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
