// Single source of truth for company details.
// Everything marked PLACEHOLDER must be replaced with verified information before launch.
export const site = {
  name: "Your Roofing Company", // PLACEHOLDER
  domain: "https://www.yourroofingcompany.com",
  phone: "(614) 555-0100", // PLACEHOLDER
  phoneHref: "tel:+16145550100", // PLACEHOLDER
  email: "hello@yourroofingcompany.com", // PLACEHOLDER
  address: "Columbus, Ohio", // PLACEHOLDER - add verified street address
  hours: "Mon-Fri 8:00-17:00", // PLACEHOLDER
  // Placeholder content (reviews, project details, trust items) shows a visible
  // "sample content" notice until this is switched to false.
  placeholderContent: true,
  // Search engines are told NOT to index the site until this is true.
  live: process.env.NEXT_PUBLIC_SITE_LIVE === "true",
};

export const nav = [
  { href: "/roofing-services", label: "Services" },
  { href: "/locations", label: "Service Areas" },
  { href: "/projects", label: "Projects" },
  { href: "/roof-visualizer", label: "Visualizer" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about-us", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
];
