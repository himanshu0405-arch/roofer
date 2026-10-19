import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import MobileCta from "@/components/MobileCta";
import { site } from "@/lib/site";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: `${site.name} | Roofing in Columbus, Ohio`, template: `%s | ${site.name}` },
  description:
    "Premium roofing for Columbus, Ohio homes: roof repair, replacement, installation, inspection and storm damage repair. Request a free estimate.",
  alternates: { canonical: "./" }, // resolved per page against metadataBase
  robots: site.live ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
};

export const viewport: Viewport = { themeColor: "#f6f2ea", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {/* Only emitted once the site is live, so placeholder contact details never reach search engines. No ratings: add only with real, visible reviews. */}
        {site.live && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "RoofingContractor",
                name: site.name,
                url: site.domain,
                telephone: site.phone,
                email: site.email,
                address: { "@type": "PostalAddress", addressLocality: "Columbus", addressRegion: "OH", addressCountry: "US" },
                areaServed: "Columbus, Ohio",
              }).replace(/</g, "\\u003c"),
            }}
          />
        )}
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
        <Motion />
      </body>
    </html>
  );
}
