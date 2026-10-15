"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  "Missing, cracked or lifted roofing materials",
  "Dents on vents, gutters or metal flashing",
  "Granules or debris collecting in gutters",
  "Water stains on ceilings or walls",
  "Daylight visible in the attic",
  "Fallen limbs or debris on the roof",
];

/** Self-check that nudges toward an inspection. Makes no coverage or outcome promises. */
export default function StormChecklist() {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));
  const n = checked.filter(Boolean).length;
  return (
    <div className="checklist" data-reveal>
      {items.map((it, i) => (
        <label key={it}>
          <input type="checkbox" checked={checked[i]} onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))} />
          <span>{it}</span>
        </label>
      ))}
      <div className="checklist__result" aria-live="polite">
        <span>
          {n === 0 ? "Tick anything you have noticed." : `${n} sign${n > 1 ? "s" : ""} noticed. An inspection can confirm what, if anything, needs attention.`}
        </span>
        <Link href="/request-estimate" className="btn btn--copper btn--sm">Request an inspection</Link>
      </div>
    </div>
  );
}
