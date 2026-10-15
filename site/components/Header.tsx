"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const cur = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined);

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className={`header${hidden && !open ? " header--hidden" : ""}`}>
        <div className="wrap header__in">
          <Link href="/" className="logo" aria-label={`${site.name} home`}>
            {site.name}<span>Columbus, Ohio</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={cur(n.href)}>{n.label}</Link>
            ))}
          </nav>
          <div className="header__actions">
            <a className="header__phone" href={site.phoneHref}>{site.phone}</a>
            <Link className="btn btn--copper btn--sm" href="/request-estimate">Request a Free Estimate</Link>
            <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="drawer" onClick={() => setOpen((o) => !o)}>
              <span />
            </button>
          </div>
        </div>
      </header>
      <div id="drawer" className="drawer" data-open={open} aria-hidden={!open}>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="drawer__link" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{n.label}</Link>
        ))}
        <Link href="/request-estimate" className="btn btn--copper" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Request a Free Estimate</Link>
        <a href={site.phoneHref} className="btn btn--outline" tabIndex={open ? 0 : -1}>Call {site.phone}</a>
      </div>
    </>
  );
}
