import type { Metadata } from "next";
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
      <CtaBand />
    </>
  );
}
