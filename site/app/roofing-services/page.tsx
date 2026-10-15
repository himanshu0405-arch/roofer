import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, CtaBand, PageHero } from "@/components/ui";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Roofing Services in Columbus, OH",
  description: "Roof repair, replacement, installation, inspection and storm and hail damage repair for Columbus, Ohio homes.",
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Roofing services for Columbus homes."
        intro="Five services, one standard of craft. Choose the one that fits, or request an inspection and we will help you decide."
        image="/images/p06.jpg"
        crumbs={[{ label: "Roofing Services" }]}
      />
      <section className="section">
        <div className="wrap">
          {services.map((s, i) => (
            <article key={s.slug} className="edit">
              <div className="edit__img" data-reveal="fade">
                <Image src={s.image} alt={s.title} fill sizes="(max-width: 900px) 100vw, 60vw" style={{ objectFit: "cover" }} data-parallax="7" />
              </div>
              <div className="edit__txt">
                <span className="num" data-reveal>0{i + 1}</span>
                <span className="label" data-reveal>{s.kicker}</span>
                <h2 className="h2" data-split>{s.title}</h2>
                <p className="muted" data-reveal>{s.summary}</p>
                <Link data-reveal className="arrow-link" style={{ justifySelf: "start" }} href={`/roofing-services/${s.slug}`}>Learn more <Arrow /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
