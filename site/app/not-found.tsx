import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: "calc(var(--header-h) + 6rem)", minHeight: "70svh" }}>
      <div className="wrap" style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
        <span className="label">404</span>
        <h1 className="display">This page has slipped off the roof.</h1>
        <Link href="/" className="btn btn--copper">Back to home</Link>
      </div>
    </section>
  );
}
