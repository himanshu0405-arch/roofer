// Sample roofing materials for the visualizer. Colors are generic approximations,
// not manufacturer products. Replace with the company's real offerings before launch.
export type RoofType = "asphalt" | "metal" | "tile" | "slate";

export type RoofMaterial = {
  id: string;
  name: string;
  type: RoofType;
  colors: { id: string; name: string; hex: string }[];
};

export const roofMaterials: RoofMaterial[] = [
  {
    id: "asphalt", name: "Asphalt Shingle", type: "asphalt",
    colors: [
      { id: "charcoal", name: "Charcoal", hex: "#3b3d40" },
      { id: "weathered-wood", name: "Weathered Wood", hex: "#6f6558" },
      { id: "driftwood", name: "Driftwood", hex: "#8a8274" },
      { id: "brown", name: "Warm Brown", hex: "#5a4333" },
    ],
  },
  {
    id: "metal", name: "Standing Seam Metal", type: "metal",
    colors: [
      { id: "slate-grey", name: "Slate Grey", hex: "#59636b" },
      { id: "bronze", name: "Bronze", hex: "#6b4f3a" },
      { id: "forest", name: "Forest Green", hex: "#33463a" },
      { id: "matte-black", name: "Matte Black", hex: "#22252a" },
    ],
  },
  {
    id: "tile", name: "Tile", type: "tile",
    colors: [
      { id: "terracotta", name: "Terracotta", hex: "#a8573a" },
      { id: "sand", name: "Sand", hex: "#b99d77" },
      { id: "umber", name: "Umber", hex: "#6a4a3a" },
    ],
  },
  {
    id: "slate", name: "Slate", type: "slate",
    colors: [
      { id: "blue-grey", name: "Blue Grey", hex: "#4a5560" },
      { id: "graphite", name: "Graphite", hex: "#33363a" },
      { id: "plum", name: "Heather Plum", hex: "#5a4a58" },
    ],
  },
];

export const BEFORE_HEX = "#7d7a74"; // generic weathered-roof grey for the "before" view

export const roofLabel = (materialId: string, colorId: string) => {
  const m = roofMaterials.find((x) => x.id === materialId);
  const c = m?.colors.find((x) => x.id === colorId);
  return m && c ? `${c.name} ${m.name}` : null;
};
