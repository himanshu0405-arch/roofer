import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StormChecklist from "@/components/StormChecklist";
import { Arrow, CtaBand, Notice, PageHero, SecHead } from "@/components/ui";
import { projects, reviews, services } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata(props: PageProps<"/roofing-services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: `${s.title} in Columbus, OH`, description: s.summary } : {};
}

export default async function Page(props: PageProps<"/roofing-services/[slug]">) {
  const { slug } = await props.params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = services.filter((x) => x.slug !== slug);
  const work = projects.filter((p) => p.serviceSlug === slug).slice(0, 3);
  const review = reviews.find((r) => r.service === slug) ?? reviews[0];

  return (
    <>
      <PageHero title={s.title} intro={s.intro} image={s.image} crumbs={[{ href: "/roofing-services", label: "Roofing Services" }, { label: s.title }]} />

      <section className="section">
        <div className="wrap split">
          <div className="sticky">
            <span className="label" data-reveal>When to call</span>
            <h2 className="h2" style={{ marginTop: "1rem" }} data-split>Common reasons homeowners reach out.</h2>
          </div>
          <ol className="list-num">
            {s.needs.map((n) => <li key={n} data-reveal>{n}</li>)}
          </ol>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <SecHead label="How it works" title="Our process, step by step." />
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {s.process.map((p, i) => (
              <div key={p.title} data-reveal style={{ borderTop: "1px solid var(--line-dark)", paddingTop: "1.4rem", display: "grid", gap: "0.7rem" }}>
                <span className="label">Step 0{i + 1}</span>
                <h3 className="h3">{p.title}</h3>
                <p className="muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {slug === "storm-and-hail-damage" && (
        <section className="section">
          <div className="wrap split">
            <div>
              <span className="label" data-reveal>Quick self-check</span>
              <h2 className="h2" style={{ margin: "1rem 0" }} data-split>Signs of storm damage to look for.</h2>
              <p className="muted lead" data-reveal>Only check from the ground. We do not promise insurance coverage or any claim outcome; an inspection simply tells you what is there.</p>
            </div>
            <StormChecklist />
          </div>
        </section>
      )}

      {work.length > 0 && (
        <section className="section section--raised">
          <div className="wrap">
            <SecHead label="Recent work" title={`${s.title} projects.`}><Notice>Sample projects shown.</Notice></SecHead>
            <div className="grid grid--3">
              {work.map((p) => (
                <article key={p.slug} className="proj" data-reveal>
                  <div className="proj__img"><Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
                  <div className="proj__meta"><span>{p.location}</span><span>{p.material}</span></div>
                  <h3>{p.title}</h3>
                </article>
              ))}
            </div>
            <div className="rev" style={{ marginTop: "3rem", maxWidth: 640 }} data-reveal><p>{review.text}</p><small>{review.name} &middot; {review.area}</small></div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <SecHead label="Related" title="Other roofing services." />
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/roofing-services/${r.slug}`} className="tile" data-reveal>
                <span className="label">{r.kicker}</span><h3>{r.title}</h3><span className="arrow-link" style={{ justifySelf: "start" }}>View <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={`Interested in ${s.title.toLowerCase()}?`} />
    </>
  );
}
