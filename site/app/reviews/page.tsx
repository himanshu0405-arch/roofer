import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, Notice, PageHero } from "@/components/ui";
import { areas, reviews, services } from "@/lib/data";

export const metadata: Metadata = { title: "Customer Reviews", description: "What Columbus homeowners say about working with us." };

export default function Page() {
  return (
    <>
      <PageHero title="In our customers' words." intro="Honest feedback from homeowners we have worked with." image="/images/p09.jpg" crumbs={[{ label: "Reviews" }]} cta={false} />
      <section className="section">
        <div className="wrap">
          <div style={{ marginBottom: "2.5rem" }}><Notice>Placeholder reviews. Use authentic customer feedback only. Do not invent testimonials or ratings.</Notice></div>
          <div className="grid grid--3">
            {reviews.map((r) => {
              const s = services.find((x) => x.slug === r.service);
              const a = areas.find((x) => r.area.startsWith(x.towns[0]));
              return (
                <article key={r.name} className="rev" data-reveal>
                  <p>{r.text}</p>
                  <small>{r.name} &middot; {r.area}</small>
                  <div className="rel">
                    {s && <Link className="chip" href={`/roofing-services/${s.slug}`}>{s.title}</Link>}
                    {a && <Link className="chip" href={`/locations/${a.slug}`}>{a.title}</Link>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
