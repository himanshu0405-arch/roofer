import type { Metadata } from "next";
import Image from "next/image";
import EstimateForm from "@/components/EstimateForm";
import { roofLabel } from "@/lib/roof-materials";

export const metadata: Metadata = { title: "Request a Free Estimate", description: "Request a free roofing estimate in Columbus, Ohio." };

const expect = ["Tell us about your home and what you need.", "We get in touch to arrange the next step.", "We look at your roof and explain your options.", "You decide how to proceed, with no pressure."];

export default async function Page(props: PageProps<"/request-estimate">) {
  // Prefill from the roof visualizer. Allowlist lookup only; raw query text is never echoed.
  const { roof } = await props.searchParams;
  const [m, c] = (typeof roof === "string" ? roof : roof?.[0] ?? "").split(".");
  const picked = roofLabel(m, c);
  const defaultMessage = picked ? `I'm interested in a ${picked} roof.` : "";
  return (
    <section className="section" style={{ paddingTop: "calc(var(--header-h) + 4rem)" }}>
      <div className="wrap split">
        <div className="sticky" style={{ display: "grid", gap: "1.6rem" }}>
          <span className="label" data-reveal>Free estimate</span>
          <h1 className="display" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }} data-split>Let&apos;s look at your roof.</h1>
          <p className="lead muted" data-reveal>Fill in a few details and we will be in touch. There is no obligation to proceed.</p>
          <ol className="list-num" data-reveal>{expect.map((e) => <li key={e} style={{ fontSize: "0.95rem" }}>{e}</li>)}</ol>
          <div className="proj__img" style={{ aspectRatio: "16/9" }} data-reveal="fade"><Image src="/images/p22.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover" }} /></div>
        </div>
        <div style={{ background: "var(--bone-raised)", border: "1px solid var(--line)", padding: "clamp(1.5rem, 4vw, 3rem)" }} data-reveal>
          <EstimateForm defaultMessage={defaultMessage} />
        </div>
      </div>
    </section>
  );
}
