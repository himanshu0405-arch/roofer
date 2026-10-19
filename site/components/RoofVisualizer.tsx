"use client";

import Link from "next/link";
import { useState } from "react";
import { BEFORE_HEX, roofLabel, roofMaterials, type RoofType } from "@/lib/roof-materials";

type House = "gable" | "hip";
const houses: { id: House; label: string }[] = [
  { id: "gable", label: "Gable" },
  { id: "hip", label: "Hip" },
];

// Subtle per-material texture drawn on top of the flat roof color.
function Textures() {
  const common = { patternUnits: "userSpaceOnUse" as const };
  return (
    <defs>
      <pattern id="tx-asphalt" width="24" height="12" {...common}><path d="M0 11.5h24M12 0v11.5" stroke="#000" strokeOpacity=".22" strokeWidth="1" fill="none" /></pattern>
      <pattern id="tx-metal" width="28" height="10" {...common}><path d="M0 0v10M1.5 0v10" stroke="#fff" strokeOpacity=".22" strokeWidth="1" fill="none" /><path d="M28 0v10" stroke="#000" strokeOpacity=".3" strokeWidth="1" /></pattern>
      <pattern id="tx-tile" width="26" height="14" {...common}><path d="M0 14q13-10 26 0" stroke="#000" strokeOpacity=".26" strokeWidth="1.4" fill="none" /></pattern>
      <pattern id="tx-slate" width="30" height="16" {...common}><path d="M0 15.5h30M15 0v15.5" stroke="#000" strokeOpacity=".3" strokeWidth="1" fill="none" /></pattern>
    </defs>
  );
}

function HouseSvg({ house, hex, type }: { house: House; hex: string; type: RoofType }) {
  const roof = house === "gable" ? "M60 190 L300 60 L540 190 Z" : "M60 190 L170 85 L430 85 L540 190 Z";
  return (
    <svg viewBox="0 0 600 380" role="img" aria-label="Illustration of a house with the selected roof" className="viz__svg">
      <Textures />
      <rect width="600" height="380" fill="#dfe6ea" />
      <rect y="320" width="600" height="60" fill="#b9bfa8" />
      {/* walls */}
      <rect x="95" y="190" width="410" height="140" fill="#efe7d8" />
      <rect x="95" y="190" width="410" height="140" fill="none" stroke="#14181f" strokeOpacity=".15" />
      {/* door + windows */}
      <rect x="270" y="245" width="60" height="85" fill="#4a3a2e" />
      <rect x="135" y="235" width="80" height="55" fill="#a9c1cf" stroke="#14181f" strokeOpacity=".3" />
      <rect x="385" y="235" width="80" height="55" fill="#a9c1cf" stroke="#14181f" strokeOpacity=".3" />
      {/* roof: flat color (multiply over the sky/wall tone) + texture */}
      <path d={roof} fill={hex} style={{ transition: "fill .4s" }} />
      <path d={roof} fill={`url(#tx-${type})`} />
      <path d={roof} fill="none" stroke="#14181f" strokeOpacity=".35" strokeWidth="2" />
    </svg>
  );
}

export default function RoofVisualizer() {
  const [materialId, setMaterialId] = useState(roofMaterials[0].id);
  const [colorId, setColorId] = useState(roofMaterials[0].colors[0].id);
  const [house, setHouse] = useState<House>("gable");
  const [before, setBefore] = useState(false);

  const material = roofMaterials.find((m) => m.id === materialId)!;
  const color = material.colors.find((c) => c.id === colorId) ?? material.colors[0];
  const label = roofLabel(material.id, color.id)!;

  const pickMaterial = (id: string) => {
    if (id === materialId) { setBefore(false); return; }
    const m = roofMaterials.find((x) => x.id === id)!;
    setMaterialId(id);
    setColorId(m.colors[0].id);
    setBefore(false);
  };

  return (
    <div className="viz">
      <div className="viz__stage">
        <HouseSvg house={house} hex={before ? BEFORE_HEX : color.hex} type={material.type} />
        <button
          type="button"
          className="chip viz__toggle"
          aria-pressed={before}
          onClick={() => setBefore((b) => !b)}
        >
          {before ? "Showing: current roof" : "Showing: new roof"}
        </button>
      </div>

      <div className="viz__panel">
        <div>
          <span className="label">House style</span>
          <div className="chip-row" role="group" aria-label="House style" style={{ marginTop: ".8rem", marginBottom: 0 }}>
            {houses.map((h) => (
              <button key={h.id} type="button" className="chip viz__btn" aria-pressed={house === h.id} onClick={() => { setHouse(h.id); setBefore(false); }}>{h.label}</button>
            ))}
          </div>
        </div>

        <div>
          <span className="label">Material</span>
          <div className="chip-row" role="group" aria-label="Roofing material" style={{ marginTop: ".8rem", marginBottom: 0 }}>
            {roofMaterials.map((m) => (
              <button key={m.id} type="button" className="chip viz__btn" aria-pressed={m.id === materialId} onClick={() => pickMaterial(m.id)}>{m.name}</button>
            ))}
          </div>
        </div>

        <div>
          <span className="label">Color</span>
          <div className="viz__swatches" role="group" aria-label="Roof color" style={{ marginTop: ".8rem" }}>
            {material.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                className="viz__swatch"
                aria-label={c.name}
                aria-pressed={c.id === color.id}
                title={c.name}
                style={{ background: c.hex }}
                onClick={() => { setColorId(c.id); setBefore(false); }}
              />
            ))}
          </div>
        </div>

        <p className="viz__sel" aria-live="polite"><strong>{label}</strong></p>
        <p className="muted" style={{ fontSize: 13 }}>
          Illustration only. Colors vary by screen and by manufacturer, and available options depend on the product. We will confirm real samples during your estimate.
        </p>
        <Link
          href={`/request-estimate?roof=${material.id}.${color.id}`}
          className="btn btn--copper"
        >
          Request a Free Estimate with this roof
        </Link>
      </div>
    </div>
  );
}
