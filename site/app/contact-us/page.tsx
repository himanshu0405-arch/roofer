import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero } from "@/components/ui";
import EstimateForm from "@/components/EstimateForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Us", description: `Contact ${site.name} in Columbus, Ohio.` };

export default function Page() {
  return (
    <>
      <PageHero title="Get in touch." intro="Call, email, or send us a message." image="/images/p18.jpg" crumbs={[{ label: "Contact Us" }]} cta={false} />
      <section className="section">
        <div className="wrap split">
          <div style={{ display: "grid", gap: "1.6rem" }}>
            <Notice>Contact details are placeholders. Replace with verified information.</Notice>
            <dl style={{ display: "grid", gap: "1.4rem", margin: 0 }}>
              {[["Phone", <a key="p" href={site.phoneHref}>{site.phone}</a>], ["Email", <a key="e" href={`mailto:${site.email}`}>{site.email}</a>], ["Address", site.address], ["Hours", site.hours]].map(([k, v]) => (
                <div key={String(k)} data-reveal style={{ borderTop: "1px solid var(--line)", paddingTop: "1rem" }}>
                  <dt className="label">{k}</dt><dd style={{ margin: "0.3rem 0 0", fontFamily: "var(--serif)", fontSize: "1.4rem" }}>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="muted">Looking for a quote? <Link href="/request-estimate" className="arrow-link">Request a free estimate</Link></p>
          </div>
          <div data-reveal><h2 className="h3" style={{ marginBottom: "1.5rem" }}>Send us a message</h2><EstimateForm /></div>
        </div>
      </section>
    </>
  );
}
