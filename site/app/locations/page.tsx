import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AreaMap from "@/components/AreaMap";
import { Arrow, CtaBand, PageHero } from "@/components/ui";
import { areas } from "@/lib/data";

export const metadata: Metadata = {
  title: "Service Areas | Columbus, Ohio and Nearby",
  description: "We serve Columbus, Dublin, Hilliard, Worthington, Westerville, Gahanna, New Albany, Reynoldsburg, Grove City, Obetz, Groveport, Pickerington and Canal Winchester.",
};

export default function Page() {
  return (
    <>
      <PageHero title="Serving Columbus and nearby communities." intro="Seven service areas across Central Ohio. Select yours to learn more." image="/images/p20.jpg" crumbs={[{ label: "Service Areas" }]} />
      <section className="section"><div className="wrap"><AreaMap /></div></section>
      <section className="section section--raised">
        <div className="wrap">
          <div className="grid grid--3">
            {areas.map((a, i) => (
              <Link key={a.slug} href={`/locations/${a.slug}`} className="proj" data-reveal>
                <div className="proj__img"><Image src={a.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
                <div className="proj__meta"><span>Area 0{i + 1}</span><span>{a.towns.length > 1 ? `${a.towns.length} communities` : "Community"}</span></div>
                <h3>{a.title}</h3>
                <span className="arrow-link" style={{ justifySelf: "start" }}>View area <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
