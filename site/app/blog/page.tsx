import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { CtaBand, Notice, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Roofing Blog", description: "Roofing advice, maintenance tips, storm damage guidance and FAQs." };

export default function Page() {
  return (
    <>
      <PageHero title="Roofing advice, plainly put." intro="Maintenance, materials, storm damage and answers to common questions." image="/images/p21.jpg" crumbs={[{ label: "Blog" }]} cta={false} />
      <section className="section">
        <div className="wrap">
          <div style={{ marginBottom: "2rem" }}><Notice>Starter articles. Have the company review all content for accuracy before launch.</Notice></div>
          <BlogList />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
