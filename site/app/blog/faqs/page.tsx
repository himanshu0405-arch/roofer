import type { Metadata } from "next";
import { CtaBand, Notice, PageHero } from "@/components/ui";
import { faqs } from "@/lib/data";

export const metadata: Metadata = { title: "Roofing FAQs", description: "Answers to common questions about roofing estimates, materials, inspections and timelines." };

export default function Page() {
  const ld = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <PageHero title="Roofing questions, answered." intro="Common questions about estimates, materials, inspections and timelines." image="/images/p08.jpg" crumbs={[{ href: "/blog", label: "Blog" }, { label: "FAQs" }]} cta={false} />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ marginBottom: "2rem" }}><Notice>Confirm each answer against the company&apos;s real policies before launch.</Notice></div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
