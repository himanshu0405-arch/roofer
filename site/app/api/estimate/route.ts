import { NextResponse } from "next/server";
import { estimateSchema } from "@/lib/estimate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 8 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // in-memory limiter: use a shared store (e.g. Redis) when running multiple instances

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: object, status = 200, extra: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...extra } });

export async function POST(req: Request) {
  // CSRF / cross-site protection: require same-origin and JSON
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  let originHost = "";
  try { originHost = origin ? new URL(origin).host : ""; } catch { /* malformed or "null" origin */ }
  if (!originHost || !host || originHost !== host) return json({ error: "Forbidden" }, 403);
  if (!(req.headers.get("content-type") || "").startsWith("application/json")) return json({ error: "Unsupported" }, 415);
  if (Number(req.headers.get("content-length") || 0) > MAX_BODY) return json({ error: "Request too large" }, 413);

  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (limited(ip)) return json({ error: "Too many requests. Please try again later or call us." }, 429, { "Retry-After": "600" });

  const raw = await req.text();
  if (Buffer.byteLength(raw) > MAX_BODY) return json({ error: "Request too large" }, 413);

  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return json({ error: "Invalid request" }, 400); }

  const result = estimateSchema.safeParse(parsed);
  if (!result.success) return json({ error: "Please check the form and try again." }, 422);

  const { website, ...lead } = result.data;
  if (website) return json({ ok: true }); // honeypot tripped: pretend success, send nothing

  const hook = process.env.ESTIMATE_WEBHOOK_URL;
  if (!hook) {
    if (process.env.NODE_ENV === "production") {
      return json({ error: "Online requests are temporarily unavailable. Please call us." }, 503);
    }
    console.info("[estimate:dev] lead received (no ESTIMATE_WEBHOOK_URL set)");
    return json({ ok: true });
  }

  try {
    if (new URL(hook).protocol !== "https:") throw new Error("webhook must be https");
    const res = await fetch(hook, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return json({ ok: true });
  } catch {
    return json({ error: "We could not send your request. Please call us." }, 502);
  }
}

export function GET() {
  return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
}
