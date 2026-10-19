import type { Metadata } from "next";
import { CtaBand, Notice } from "@/components/ui";
import RoofVisualizer from "@/components/RoofVisualizer";

export const metadata: Metadata = {
  title: "Roof Visualizer",
  description: "Preview roofing materials and colors on a sample home, then request a free estimate in Columbus, Ohio.",
};

export default function Page() {
  return (
    <>
      <section className="section" style={{ paddingTop: "calc(var(--header-h) + 4rem)" }}>
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <div style={{ display: "grid", gap: "1.1rem" }}>
              <span className="label" data-reveal>Roof visualizer</span>
              <h1 className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }} data-split>Try a new roof on for size.</h1>
            </div>
            <div data-reveal><Notice>Sample materials and colors. Replace with the products the company actually installs.</Notice></div>
          </div>
          <RoofVisualizer />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
