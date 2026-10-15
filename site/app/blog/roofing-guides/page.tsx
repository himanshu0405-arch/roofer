import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/ui";
import { guides } from "@/lib/data";

export const metadata: Metadata = { title: "Roofing Guides", description: "Practical roofing guides: maintenance, materials and signs of damage." };

export default function Page() {
  return (
    <>
      <PageHero title="Practical roofing guides." intro="Short, accurate guides for homeowners." image="/images/p10.jpg" crumbs={[{ href: "/blog", label: "Blog" }, { label: "Roofing Guides" }]} cta={false} />
      <section className="section">
        <div className="wrap">
          {guides.map((g) => (
            <article key={g.slug} id={g.slug} className="article" data-reveal>
              <span className="label">{g.category}</span>
              <div>
                <h2 className="h3" style={{ marginBottom: "0.8rem" }}>{g.title}</h2>
                {g.body.map((p) => <p key={p}>{p}</p>)}
                <p style={{ marginTop: "1rem" }}><Link href="/roofing-services/roof-inspection" className="arrow-link">Roof inspection</Link></p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
