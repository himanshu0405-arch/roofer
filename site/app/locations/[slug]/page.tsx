import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, CtaBand, Notice, PageHero, SecHead } from "@/components/ui";
import { areas, columbusSections, projects, reviews, services } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => areas.map((a) => ({ slug: a.slug }));

export async function generateMetadata(props: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const a = areas.find((x) => x.slug === slug);
  return a ? { title: `Roofing in ${a.title}`, description: `Roof repair, replacement, installation and inspection for homes in ${a.title}.` } : {};
}

export default async function Page(props: PageProps<"/locations/[slug]">) {
  const { slug } = await props.params;
  const a = areas.find((x) => x.slug === slug);
  if (!a) notFound();
  const others = areas.filter((x) => x.slug !== slug);
  const towns = a.towns.join(" and ");
  const work = projects.filter((p) => a.towns.some((t) => p.location.startsWith(t))).slice(0, 3);
  const shown = work.length ? work : projects.slice(0, 3);

  return (
    <>
      <PageHero
        title={`Roofing in ${a.title}.`}
        intro={`Roof repair, replacement, installation, inspection and storm damage repair for homes in ${towns}.`}
        image={a.image}
        crumbs={[{ href: "/locations", label: "Service Areas" }, { label: a.title }]}
      />

      {slug === "columbus-oh" && (
        <section className="section">
          <div className="wrap">
            <SecHead split label="Across the city" title="Central, North, South, East and West.">
              <Notice>Neighborhood lists to be added. Include only areas the company genuinely covers.</Notice>
            </SecHead>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {columbusSections.map((c, i) => (
                <div key={c} className="tile" data-reveal>
                  <span className="label">0{i + 1}</span><h3>{c} Columbus</h3>
                  <p className="muted" style={{ fontSize: 14 }}>Neighborhoods to be confirmed.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`section${slug === "columbus-oh" ? " section--raised" : ""}`}>
        <div className="wrap split">
          <div className="sticky">
            <span className="label" data-reveal>Our work in {towns}</span>
            <h2 className="h2" style={{ marginTop: "1rem" }} data-split>Local service, done carefully.</h2>
            <div style={{ marginTop: "1.5rem" }}><Notice>Add original, verified information about service in {towns}.</Notice></div>
          </div>
          <div className="grid" style={{ gap: 0 }}>
            {services.map((s) => (
              <Link key={s.slug} href={`/roofing-services/${s.slug}`} className="svc-row" style={{ gridTemplateColumns: "1fr 48px", padding: "1.5rem 0" }} data-reveal>
                <div><h3>{s.title}</h3><small>{s.kicker}</small></div>
                <span className="go" aria-hidden="true"><Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--raised">
        <div className="wrap">
          <SecHead label="Projects & reviews" title={`Recent work near ${towns}.`}><Notice>Sample content. Replace with verified local projects and reviews.</Notice></SecHead>
          <div className="grid grid--3">
            {shown.map((p) => (
              <article key={p.slug} className="proj" data-reveal>
                <div className="proj__img"><Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
                <div className="proj__meta"><span>{p.location}</span><span>{p.service}</span></div>
                <h3>{p.title}</h3>
              </article>
            ))}
          </div>
          <div className="rev" style={{ marginTop: "3rem", maxWidth: 640 }} data-reveal><p>{reviews[0].text}</p><small>{reviews[0].name} &middot; {reviews[0].area}</small></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SecHead label="Nearby" title="Other service areas." />
          <div className="rel" data-reveal>
            {others.map((o) => <Link key={o.slug} href={`/locations/${o.slug}`} className="chip">{o.title}</Link>)}
          </div>
        </div>
      </section>
      <CtaBand title={`Roofing help in ${a.title}.`} />
    </>
  );
}
