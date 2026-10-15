import type { MetadataRoute } from "next";
import { areas, services } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/roofing-services", ...services.map((s) => `/roofing-services/${s.slug}`),
    "/locations", ...areas.map((a) => `/locations/${a.slug}`),
    "/about-us", "/projects", "/reviews", "/blog", "/blog/roofing-guides", "/blog/faqs",
    "/contact-us", "/request-estimate", "/privacy-policy",
  ];
  return paths.map((p) => ({ url: site.domain + p, lastModified: new Date() }));
}
