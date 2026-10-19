import type { Metadata } from "next";
import BeforeAfter from "@/components/BeforeAfter";
import ProjectsGrid from "@/components/ProjectsGrid";
import { CtaBand, Notice, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Roofing Projects", description: "Completed roofing work across Columbus, Ohio." };

export default function Page() {
  return (
    <>
      <PageHero title="Roofs we have worked on." intro="Filter by service to see completed work across Central Ohio." image="/images/p13.jpg" crumbs={[{ label: "Projects" }]} cta={false} />
      <section className="section">
        <div className="wrap">
          <div style={{ marginBottom: "2rem" }}><Notice>Sample projects shown. Replace with real projects, locations, materials and before-and-after photos.</Notice></div>
          <ProjectsGrid />
        </div>
      </section>
      <section className="section section--raised">
        <div className="wrap split">
          <div className="sticky" style={{ display: "grid", gap: "1.2rem" }}>
            <span className="label" data-reveal>Before &amp; after</span>
            <h2 className="h2" data-split>See the difference.</h2>
            <p className="muted" data-reveal>Drag the handle to compare a worn roof with a new one.</p>
            <Notice>Illustration only. Replace with real before-and-after photos of completed jobs.</Notice>
          </div>
          <div data-reveal>
            <BeforeAfter before="/images/samples/sample-before.svg" after="/images/samples/sample-after.svg" alt="Sample illustration of a roof replacement" aspect="4 / 3" />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
