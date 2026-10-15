import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, Notice, PageHero, SecHead } from "@/components/ui";
import { processSteps } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About Us", description: `About ${site.name}, a Columbus, Ohio roofing company.` };

export default function Page() {
  return (
    <>
      <PageHero title="Craftsmanship, up close." intro="Who we are, how we work, and what you can expect from us." image="/images/p02.jpg" crumbs={[{ label: "About Us" }]} />

      <section className="section">
        <div className="wrap split">
          <div className="sticky"><span className="label" data-reveal>Company background</span><h2 className="h2" style={{ marginTop: "1rem" }} data-split>A Columbus roofing company.</h2></div>
          <div className="prose">
            <Notice>Placeholder. Add verified company history, founding details and values.</Notice>
            <p className="lead" data-reveal>{site.name} serves homeowners across Columbus, Ohio and nearby communities with roof repair, replacement, installation, inspection and storm damage repair.</p>
            <p data-reveal>We believe a roof should be built with care, explained clearly and finished cleanly.</p>
          </div>
        </div>
      </section>

      <section className="section section--raised">
        <div className="wrap">
          <SecHead label="Team" title="The people behind the work."><Notice>Add verified team members and photos.</Notice></SecHead>
          <div className="grid grid--3">
            {["Team member", "Team member", "Team member"].map((t, i) => (
              <div key={i} className="tile" data-reveal><span className="label">Role to be added</span><h3>{t}</h3><p className="muted" style={{ fontSize: 14 }}>Short bio to be added.</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <SecHead label="Service process" title="How we work with you." />
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {processSteps.map((s) => (
              <div key={s.n} data-reveal style={{ borderTop: "1px solid var(--line-dark)", paddingTop: "1.4rem", display: "grid", gap: "0.7rem" }}>
                <span className="label">{s.n}</span><h3 className="h3">{s.title}</h3><p className="muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div><span className="label" data-reveal>Credentials</span><h2 className="h2" style={{ marginTop: "1rem" }} data-split>Licensing and insurance.</h2></div>
          <div className="prose"><Notice>Add verified licences, insurance and certifications. Do not publish any until confirmed.</Notice>
            <div className="edit__img" style={{ aspectRatio: "16/9", gridColumn: "auto" }} data-reveal="fade"><Image src="/images/p05.jpg" alt="Roofer fitting slate" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} data-parallax="6" /></div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
