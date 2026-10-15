"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, services } from "@/lib/data";

export default function ProjectsGrid() {
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => projects.filter((p) => filter === "all" || p.serviceSlug === filter), [filter]);

  return (
    <>
      <div className="chip-row" role="group" aria-label="Filter projects by service">
        <button className="chip" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All</button>
        {services.map((s) => (
          <button key={s.slug} className="chip" aria-pressed={filter === s.slug} onClick={() => setFilter(s.slug)}>{s.title}</button>
        ))}
      </div>
      <div className="grid grid--3">
        {list.map((p) => (
          <article key={p.slug} className="proj">
            <div className="proj__img">
              <Image src={p.image} alt={`${p.title}, ${p.location}`} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="proj__meta"><span>{p.location}</span><span>{p.material}</span></div>
            <h3>{p.title}</h3>
            <Link className="arrow-link" href={`/roofing-services/${p.serviceSlug}`} style={{ justifySelf: "start" }}>{p.service}</Link>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="muted">No projects in this category yet.</p>}
    </>
  );
}
