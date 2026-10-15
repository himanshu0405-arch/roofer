"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function MobileCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="mcta" data-show={show}>
      <a className="btn btn--outline" href={site.phoneHref}>Call</a>
      <Link className="btn btn--copper" href="/request-estimate">Free Estimate</Link>
    </div>
  );
}
