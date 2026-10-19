import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
);

export function Roofline() {
  const d = "M0 112 L180 112 L360 52 L540 112 L760 112 L960 24 L1160 112 L1300 112 L1380 70 L1440 112";
  return (
    <>
      <svg className="roofline" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" height="120">
        <path pathLength={1} d={d} />
      </svg>
      {/* Ambient light that travels along the skyline. Separate svg so the scroll-drawn line is untouched. */}
      <svg className="roofglint" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" height="120">
        <path pathLength={1} d={d} />
      </svg>
    </>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  if (!site.placeholderContent) return null;
  return <p className="notice" role="note">{children}</p>;
}

export function SecHead({ label, title, children, split }: { label: string; title: string; children?: ReactNode; split?: boolean }) {
  return (
    <div className={`sec-head${split ? " sec-head--split" : ""}`}>
      <div style={{ display: "grid", gap: "1.1rem" }}>
        <span className="label" data-reveal>{label}</span>
        <h2 className="h2" data-split>{title}</h2>
      </div>
      {children && <div data-reveal>{children}</div>}
    </div>
  );
}

export function PageHero({
  title, intro, image, crumbs, cta = true,
}: { title: string; intro?: string; image: string; crumbs: { href?: string; label: string }[]; cta?: boolean }) {
  return (
    <section className="hero hero--page">
      <div className="hero__media">
        <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <Roofline />
      <div className="wrap hero__in">
        <nav className="crumbs" aria-label="Breadcrumb" data-reveal>
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>/ {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</span>
          ))}
        </nav>
        <h1 className="display" data-split>{title}</h1>
        {intro && <p className="lead" data-reveal>{intro}</p>}
        {cta && (
          <div className="hero__cta" data-reveal>
            <Link href="/request-estimate" className="btn btn--copper">Request a Free Estimate <Arrow /></Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Let's look at your roof.", text = "Tell us about your home and we'll arrange a free estimate." }: { title?: string; text?: string }) {
  return (
    <section className="section cta">
      <div className="wrap">
        <div>
          <span className="label">Free estimate</span>
          <h2 style={{ marginTop: "1rem" }} data-split>{title}</h2>
          <p data-reveal>{text}</p>
        </div>
        <div data-reveal style={{ display: "grid", gap: "0.8rem" }}>
          <Link href="/request-estimate" className="btn btn--copper">Request a Free Estimate <Arrow /></Link>
          <a href={site.phoneHref} className="btn btn--light">Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}

export function Chapters({ items, light }: { items: { id: string; label: string }[]; light?: boolean }) {
  return (
    <nav className={`chapters${light ? " chapters--light" : ""}`} aria-label="Page chapters">
      {items.map((c) => (
        <a key={c.id} href={`#${c.id}`} data-target={c.id} aria-current="false">
          <b>{c.label}</b><i />
        </a>
      ))}
    </nav>
  );
}
