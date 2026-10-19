"use client";

import Link from "next/link";
import { useState } from "react";
import { estimateSchema, serviceOptions } from "@/lib/estimate";

type Errors = Record<string, string>;

export default function EstimateForm({ defaultService = "", defaultMessage = "" }: { defaultService?: string; defaultMessage?: string }) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const read = (form: HTMLFormElement) => {
    const f = new FormData(form);
    return {
      name: String(f.get("name") || ""), phone: String(f.get("phone") || ""), email: String(f.get("email") || ""),
      address: String(f.get("address") || ""), service: String(f.get("service") || ""),
      message: String(f.get("message") || ""), consent: f.get("consent") === "on", website: String(f.get("website") || ""),
    };
  };

  const fieldsFor = (s: number) => (s === 0 ? ["name", "phone", "email"] : s === 1 ? ["address", "service"] : ["message", "consent"]);

  const validate = (form: HTMLFormElement, only?: string[]) => {
    const r = estimateSchema.safeParse(read(form));
    const errs: Errors = {};
    if (!r.success) for (const i of r.error.issues) { const k = String(i.path[0]); if (!only || only.includes(k)) errs[k] ||= i.message; }
    setErrors(errs);
    return { ok: Object.keys(errs).length === 0, data: r.success ? r.data : null };
  };

  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form!;
    if (validate(form, fieldsFor(step)).ok) setStep((s) => s + 1);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ok, data } = validate(e.currentTarget);
    if (!ok || !data) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await res.json().catch(() => ({}));
      if (res.ok) { setStatus("done"); }
      else { setStatus("error"); setMsg(j.error || "Something went wrong. Please call us instead."); }
    } catch { setStatus("error"); setMsg("Network error. Please try again or call us."); }
  };

  if (status === "done")
    return (
      <div className="ok" role="status">
        <h3 className="h3">Thank you. Your request has been received.</h3>
        <p style={{ marginTop: "0.8rem" }}>We will be in touch to arrange your free estimate.</p>
      </div>
    );

  const err = (k: string) => errors[k] && <span className="err" id={`${k}-e`} role="alert">{errors[k]}</span>;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-e` : undefined });

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="steps" aria-hidden="true">{[0, 1, 2].map((i) => <i key={i} className={i <= step ? "on" : ""} />)}</div>
      <p className="label">Step {step + 1} of 3</p>
      {/* Honeypot: hidden from people, bots tend to fill it */}
      <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <fieldset style={{ display: step === 0 ? "grid" : "none", gap: "1.6rem", border: 0, padding: 0, margin: 0 }}>
        <div className="field"><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" maxLength={100} {...aria("name")} />{err("name")}</div>
        <div className="row">
          <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} {...aria("phone")} />{err("phone")}</div>
          <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={160} {...aria("email")} />{err("email")}</div>
        </div>
      </fieldset>

      <fieldset style={{ display: step === 1 ? "grid" : "none", gap: "1.6rem", border: 0, padding: 0, margin: 0 }}>
        <div className="field"><label htmlFor="address">Property address or city</label><input id="address" name="address" autoComplete="street-address" maxLength={200} {...aria("address")} />{err("address")}</div>
        <div className="field">
          <label htmlFor="service">Service needed</label>
          <select id="service" name="service" defaultValue={defaultService} {...aria("service")}>
            <option value="" disabled>Choose a service</option>
            {serviceOptions.map((s) => <option key={s}>{s}</option>)}
          </select>{err("service")}
        </div>
      </fieldset>

      <fieldset style={{ display: step === 2 ? "grid" : "none", gap: "1.6rem", border: 0, padding: 0, margin: 0 }}>
        <div className="field"><label htmlFor="message">Message (optional)</label><textarea key={defaultMessage} id="message" name="message" maxLength={2000} defaultValue={defaultMessage} /></div>
        <div className="field">
          <label className="check" style={{ textTransform: "none", letterSpacing: 0, fontSize: 13, fontWeight: 400 }}>
            <input type="checkbox" name="consent" {...aria("consent")} />
            <span>I agree to be contacted about my request. See our <Link href="/privacy-policy" style={{ textDecoration: "underline" }}>Privacy Policy</Link>.</span>
          </label>{err("consent")}
        </div>
      </fieldset>

      {status === "error" && <p className="err" role="alert">{msg}</p>}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {step > 0 && <button type="button" className="btn btn--outline" onClick={() => setStep((s) => s - 1)}>Back</button>}
        {step < 2 ? (
          <button type="button" className="btn btn--copper" onClick={next}>Continue</button>
        ) : (
          <button type="submit" className="btn btn--copper" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Request a Free Estimate"}</button>
        )}
      </div>
    </form>
  );
}
