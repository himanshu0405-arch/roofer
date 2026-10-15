// Content model. Generic, non-committal copy only: no invented claims, ratings,
// certifications, prices, warranties, insurance promises or response times.

export type Service = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  image: string;
  intro: string;
  needs: string[];
  process: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "roof-repair",
    title: "Roof Repair",
    kicker: "Preservation & Diagnostics",
    summary: "Targeted repairs for leaks, damaged flashing, worn sections and other localized roof problems.",
    image: "/images/p05.jpg",
    intro:
      "A well-made repair protects the roof you already have. We start by finding the true source of the problem, then repair it with care and clean workmanship.",
    needs: [
      "Active or recurring leaks",
      "Damaged, loose or missing roofing materials",
      "Worn or failed flashing around chimneys, vents and valleys",
      "Sagging or soft areas that need assessment",
      "Gutter and edge details that allow water in",
    ],
    process: [
      { title: "Inspect", text: "We examine the roof and surrounding details to locate the source of the issue." },
      { title: "Explain", text: "We walk you through what we found and the repair options." },
      { title: "Repair", text: "The affected area is repaired and sealed with attention to detail." },
      { title: "Clean up", text: "The work area is cleaned and the result reviewed with you." },
    ],
  },
  {
    slug: "roof-replacement",
    title: "Roof Replacement",
    kicker: "Total Envelope Renewal",
    summary: "A complete replacement when repair is no longer the right answer, from assessment through cleanup.",
    image: "/images/p13.jpg",
    intro:
      "When a roof has reached the end of its useful life, a full replacement is a considered investment. We keep the process clear at every stage.",
    needs: [
      "Widespread wear, curling or deterioration",
      "Repeated repairs in different areas",
      "Age of the existing roof",
      "Damage too extensive for a repair",
      "A change of roofing material",
    ],
    process: [
      { title: "Assess", text: "We evaluate the existing roof and the structure beneath it." },
      { title: "Select materials", text: "We discuss material options that suit your home and priorities." },
      { title: "Remove and install", text: "The old roof is removed and the new system installed." },
      { title: "Clean up", text: "The property is cleaned and the finished roof reviewed with you." },
    ],
  },
  {
    slug: "roof-installation",
    title: "Roof Installation",
    kicker: "New Construction",
    summary: "Roof installation for new builds and additions, coordinated with your builder or architect.",
    image: "/images/p16.jpg",
    intro:
      "A new roof sets the character of a home. We work alongside your builder or architect so the roof is installed to the plan.",
    needs: [
      "New home construction",
      "Additions and extensions",
      "Garages and outbuildings",
      "Re-roofing to a new design",
      "Coordination with other trades",
    ],
    process: [
      { title: "Review plans", text: "We review the drawings and specifications for the roof." },
      { title: "Plan", text: "Materials, sequencing and site access are agreed in advance." },
      { title: "Install", text: "The roof system is installed to the agreed specification." },
      { title: "Hand over", text: "We review the finished roof with you and your builder." },
    ],
  },
  {
    slug: "roof-inspection",
    title: "Roof Inspection",
    kicker: "Diagnostic & Reporting",
    summary: "A careful look at the condition of your roof, so you can decide what to do next with confidence.",
    image: "/images/p21.jpg",
    intro:
      "An inspection gives you a clear picture of your roof's condition before small issues become large ones, or before you buy or sell a home.",
    needs: [
      "After a major storm",
      "Before buying or selling a home",
      "When the roof's age is unknown",
      "Stains or moisture on ceilings",
      "Routine condition checks",
    ],
    process: [
      { title: "Request", text: "Tell us about your home and what prompted the inspection." },
      { title: "Inspect", text: "We examine the roof surfaces, flashing, penetrations and drainage." },
      { title: "Report", text: "We explain what we found and what, if anything, needs attention." },
      { title: "Decide", text: "You choose how to proceed, with no pressure." },
    ],
  },
  {
    slug: "storm-and-hail-damage",
    title: "Storm and Hail Damage Repair",
    kicker: "Remediation",
    summary: "Inspection and repair after severe weather. We document what we find and explain your options.",
    image: "/images/p08.jpg",
    intro:
      "Severe weather can damage a roof in ways that are hard to see from the ground. We inspect, explain what we find, and repair what is needed.",
    needs: [
      "Dented, cracked or missing roofing materials",
      "Granule loss or bruising after hail",
      "Lifted or displaced flashing",
      "Debris impact or fallen limbs",
      "Interior water stains after a storm",
    ],
    process: [
      { title: "Inspect", text: "We look for visible and less obvious storm damage." },
      { title: "Document", text: "We record what we find so you have a clear picture." },
      { title: "Repair", text: "We repair the damage with materials suited to your roof." },
      { title: "Clean up", text: "Debris is cleared and the work reviewed with you." },
    ],
  },
];

export type Area = { slug: string; title: string; towns: string[]; image: string; x: number; y: number };

export const areas: Area[] = [
  { slug: "columbus-oh", title: "Columbus, OH", towns: ["Columbus"], image: "/images/p20.jpg", x: 50, y: 52 },
  { slug: "dublin-hilliard", title: "Dublin and Hilliard", towns: ["Dublin", "Hilliard"], image: "/images/p18.jpg", x: 30, y: 36 },
  { slug: "worthington-westerville", title: "Worthington and Westerville", towns: ["Worthington", "Westerville"], image: "/images/p06.jpg", x: 50, y: 22 },
  { slug: "gahanna-new-albany", title: "Gahanna and New Albany", towns: ["Gahanna", "New Albany"], image: "/images/p16.jpg", x: 72, y: 34 },
  { slug: "reynoldsburg", title: "Reynoldsburg", towns: ["Reynoldsburg"], image: "/images/p04.jpg", x: 84, y: 64 },
  { slug: "grove-city-obetz-groveport", title: "Grove City, Obetz, and Groveport", towns: ["Grove City", "Obetz", "Groveport"], image: "/images/p09.jpg", x: 30, y: 72 },
  { slug: "pickerington-canal-winchester", title: "Pickerington and Canal Winchester", towns: ["Pickerington", "Canal Winchester"], image: "/images/p22.jpg", x: 84, y: 84 },
];

export const columbusSections = ["Central", "North", "South", "East", "West"];

export type Project = {
  slug: string;
  title: string;
  location: string;
  service: string;
  serviceSlug: string;
  material: string;
  image: string;
};

// Sample project details: replace with real projects.
export const projects: Project[] = [
  { slug: "p1", title: "Stone manor restoration", location: "Columbus, OH", service: "Roof Replacement", serviceSlug: "roof-replacement", material: "Slate (sample)", image: "/images/p02.jpg" },
  { slug: "p2", title: "Heritage cottage reroof", location: "Columbus, OH", service: "Roof Repair", serviceSlug: "roof-repair", material: "Asphalt composite (sample)", image: "/images/p04.jpg" },
  { slug: "p3", title: "Timber-frame new build", location: "New Albany, OH", service: "Roof Installation", serviceSlug: "roof-installation", material: "Slate (sample)", image: "/images/p07.jpg" },
  { slug: "p4", title: "Chimney and flashing work", location: "Worthington, OH", service: "Roof Repair", serviceSlug: "roof-repair", material: "Copper flashing (sample)", image: "/images/p17.jpg" },
  { slug: "p5", title: "Brick Victorian roof", location: "Columbus, OH", service: "Roof Replacement", serviceSlug: "roof-replacement", material: "Slate (sample)", image: "/images/p09.jpg" },
  { slug: "p6", title: "Gutter and edge detail", location: "Dublin, OH", service: "Roof Repair", serviceSlug: "roof-repair", material: "Metal (sample)", image: "/images/p12.jpg" },
  { slug: "p7", title: "Post-storm inspection", location: "Reynoldsburg, OH", service: "Storm and Hail Damage Repair", serviceSlug: "storm-and-hail-damage", material: "Slate (sample)", image: "/images/p08.jpg" },
  { slug: "p8", title: "Dusk modern estate", location: "Dublin, OH", service: "Roof Installation", serviceSlug: "roof-installation", material: "Standing seam metal (sample)", image: "/images/p18.jpg" },
  { slug: "p9", title: "Dormer and hip roof", location: "Gahanna, OH", service: "Roof Inspection", serviceSlug: "roof-inspection", material: "Slate (sample)", image: "/images/p21.jpg" },
];

// Sample reviews: clearly flagged in the UI while site.placeholderContent is true.
export const reviews = [
  { name: "Sample Customer A", area: "Columbus, OH", service: "roof-repair", text: "Placeholder: replace with an authentic customer review." },
  { name: "Sample Customer B", area: "Dublin, OH", service: "roof-replacement", text: "Placeholder: replace with an authentic customer review." },
  { name: "Sample Customer C", area: "Gahanna, OH", service: "storm-and-hail-damage", text: "Placeholder: replace with an authentic customer review." },
];

export const faqs = [
  { q: "Is the estimate really free?", a: "Our estimates are offered free of charge. Request one using the form and we will follow up to arrange the next step." },
  { q: "How do I request an inspection?", a: "Use the Request a Free Estimate form and choose Roof Inspection as the service. Tell us about your home and what prompted the request." },
  { q: "What roofing materials do you work with?", a: "Material options are discussed during your estimate, based on your home and priorities. Details to be confirmed by the company." },
  { q: "How long does a project take?", a: "Timelines depend on the size and type of the project and on the weather. We will discuss expected timing with you at the estimate." },
  { q: "Do you help with insurance claims?", a: "We can inspect and document storm damage so you have a clear record. We cannot promise insurance coverage or any claim outcome." },
  { q: "Which areas do you serve?", a: "We serve Columbus and surrounding communities, listed on our Service Areas page." },
];

export const guides = [
  {
    slug: "roof-maintenance",
    title: "A simple seasonal roof check",
    category: "Maintenance",
    summary: "Things homeowners can safely look for from the ground each season.",
    body: [
      "Walk around your home and look at the roof from the ground. Binoculars help. Never climb onto a roof to check it.",
      "Look for missing, cracked or lifted roofing materials, sagging lines, and debris in valleys or gutters.",
      "Inside, check ceilings and attic for stains, damp insulation or daylight where there should be none.",
      "If you notice any of these, a professional inspection will tell you whether anything needs attention.",
    ],
  },
  {
    slug: "signs-of-damage",
    title: "Signs your roof may be damaged",
    category: "Storm Damage",
    summary: "After severe weather, these are the common signs that deserve a closer look.",
    body: [
      "After hail or high wind, check gutters and downspouts for granules or debris and look for dents on metal fixtures.",
      "Damage is not always visible from the ground. Some of it only shows up as leaks weeks later.",
      "If you suspect damage, photograph anything you can safely see and request an inspection.",
    ],
  },
  {
    slug: "choosing-materials",
    title: "Thinking about roofing materials",
    category: "Materials",
    summary: "Questions worth asking before you choose a roofing material.",
    body: [
      "Consider the style of your home, how long you plan to stay, and the look you want.",
      "Ask about maintenance needs, expected lifespan and how the material suits Ohio weather.",
      "We discuss the options that suit your home during your estimate.",
    ],
  },
];

export const processSteps = [
  { n: "01", title: "Inspect", text: "We look closely at your roof and explain what we find." },
  { n: "02", title: "Plan", text: "We agree the scope and materials with you before work begins." },
  { n: "03", title: "Build", text: "The work is carried out with care and clear communication." },
  { n: "04", title: "Clean up", text: "We leave the property tidy and review the result with you." },
];
