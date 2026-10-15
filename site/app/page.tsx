import Image from "next/image";
import Link from "next/link";
import ServiceList from "@/components/ServiceList";
import AreaMap from "@/components/AreaMap";
import { Arrow, Chapters, CtaBand, Notice, Roofline, SecHead } from "@/components/ui";
import { processSteps, projects, reviews } from "@/lib/data";
import { site } from "@/lib/site";

const chapters = [
  { id: "top", label: "Welcome" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "reviews", label: "Reviews" },
  { id: "areas", label: "Areas" },
];

const trust = [
  ["Licensed and Insured", "Details to be confirmed"],
  ["Locally Based", "Serving Columbus, Ohio"],
  ["Workmanship Warranty", "Details to be confirmed"],
  ["Free Estimates", "No obligation to proceed"],
];

export default function Home() {
  const [lead, ...rest] = projects.slice(0, 3);
  return (
    <>
      <Chapters items={chapters} />

      <section id="top" className="hero" data-chapter="top">
        <div className="hero__media">
          <Image src="/images/p23.jpg" alt="Stone home with a dark slate roof at dusk" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <Roofline />
        <div className="wrap hero__in">
          <span className="label" data-reveal>Columbus, Ohio &middot; Roofing</span>
          <h1 className="display" data-split>Protecting Columbus homes with architectural precision and enduring craftsmanship.</h1>
          <p className="lead" data-reveal>Repair, replacement, installation and inspection for homes across Central Ohio.</p>
          <div className="hero__cta" data-reveal>
            <Link href="/request-estimate" className="btn btn--copper">Request a Free Estimate <Arrow /></Link>
            <Link href="/projects" className="btn btn--light">View Our Work</Link>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">Scroll <i /></div>
      </section>

      <div className="trust">
        <div className="wrap trust__grid">
          {trust.map(([a, b]) => (
            <div key={a} className="trust__item" data-reveal><small>{a}</small><span>{b}</span></div>
          ))}
        </div>
      </div>

      <section id="services" className="section" data-chapter="services">
        <div className="wrap">
          <SecHead split label="Scope of craft" title="Roofing services, done properly.">
            <p className="muted lead">Five core services, each handled with the same attention to detail, from the first inspection to the final cleanup.</p>
          </SecHead>
          <ServiceList />
        </div>
      </section>

      <section id="process" className="process" data-chapter="process" aria-label="Our process">
        <div className="process__pin">
          <div className="wrap" style={{ width: "100%" }}>
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <span className="label" data-reveal>Disciplined execution</span>
              <h2 className="h2" data-split>Four steps from first look to final clean-up.</h2>
            </div>
            <div className="process__track">
              {processSteps.map((s) => (
                <div key={s.n} className="process__step">
                  <span className="n" aria-hidden="true">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <div className="process__bar" aria-hidden="true"><i /></div>
          </div>
        </div>
      </section>

      <section id="work" className="section" data-chapter="work">
        <div className="wrap">
          <SecHead split label="Selected work" title="A look at recent roofs.">
            <Notice>Sample project details shown. Replace with real projects before launch.</Notice>
          </SecHead>
          <div className="feature-grid">
            <article className="proj proj--lead" data-reveal>
              <div className="proj__img"><Image src={lead.image} alt={lead.title} fill sizes="(max-width: 900px) 100vw, 60vw" style={{ objectFit: "cover" }} data-parallax="6" /></div>
              <div className="proj__meta"><span>{lead.location}</span><span>{lead.service}</span></div>
              <h3>{lead.title}</h3>
            </article>
            <div className="stack">
              {rest.map((p) => (
                <article key={p.slug} className="proj" data-reveal>
                  <div className="proj__img"><Image src={p.image} alt={p.title} fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover" }} /></div>
                  <div className="proj__meta"><span>{p.location}</span><span>{p.service}</span></div>
                  <h3>{p.title}</h3>
                </article>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "3rem" }} data-reveal><Link href="/projects" className="arrow-link">All projects <Arrow /></Link></div>
        </div>
      </section>

      <section id="reviews" className="section section--stone" data-chapter="reviews">
        <div className="wrap">
          <SecHead label="In their words" title="What homeowners say.">
            <Notice>Placeholder reviews. Replace with authentic customer feedback. No ratings are claimed.</Notice>
          </SecHead>
          <div className="quote">
            <blockquote data-reveal>{reviews[0].text}<footer className="label" style={{ marginTop: "1.5rem" }}>{reviews[0].name} &middot; {reviews[0].area}</footer></blockquote>
            <div className="grid">
              {reviews.slice(1).map((r) => (
                <div key={r.name} className="rev" data-reveal><p>{r.text}</p><small>{r.name} &middot; {r.area}</small></div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "3rem" }} data-reveal><Link href="/reviews" className="arrow-link">All reviews <Arrow /></Link></div>
        </div>
      </section>

      <section id="areas" className="section" data-chapter="areas">
        <div className="wrap">
          <SecHead split label="Where we work" title="Serving Columbus and its neighbours.">
            <p className="muted lead">Seven service areas across Central Ohio. Select one to see how we work in your community.</p>
          </SecHead>
          <AreaMap />
        </div>
      </section>

      <CtaBand title="Ready to protect your home?" text={`Request a free estimate, or call ${site.phone}.`} />
    </>
  );
}
