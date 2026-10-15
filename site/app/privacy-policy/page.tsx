import type { Metadata } from "next";
import { Notice, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <>
      <PageHero title="Privacy Policy" image="/images/p17.jpg" crumbs={[{ label: "Privacy Policy" }]} cta={false} />
      <section className="section">
        <div className="wrap prose">
          <Notice>Insert the company&apos;s approved legal text here. Legal terms must not be invented.</Notice>
          <p>This page will contain the company&apos;s privacy policy.</p>
        </div>
      </section>
    </>
  );
}
