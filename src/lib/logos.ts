export type Category =
  | "Luxury Serif"
  | "Modern Sans-Serif"
  | "Geometric"
  | "Editorial"
  | "Bold"
  | "Minimalist"
  | "Display";

export const CATEGORIES: Category[] = [
  "Luxury Serif",
  "Modern Sans-Serif",
  "Geometric",
  "Editorial",
  "Bold",
  "Minimalist",
  "Display",
];

export const BRAND = "SHOLOK";
export const PRIMARY_COLOR = "#5D0096";
export const COLOR_NAME = "Premium Purple";

export interface LogoVariation {
  id: string;
  fontFamily: string;
  fontWeight: number;
  letterSpacing: number; // em
  italic?: boolean;
  category: Category;
  fallbackFont: string;
}

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "system-ui, Arial, sans-serif";

const v = (
  id: string,
  fontFamily: string,
  fontWeight: number,
  letterSpacing: number,
  category: Category,
  fallbackFont = SANS,
  italic = false,
): LogoVariation => ({ id, fontFamily, fontWeight, letterSpacing, category, fallbackFont, italic });

export const LOGOS: LogoVariation[] = [
  v("playfair-display", "Playfair Display", 700, 0.04, "Luxury Serif", SERIF),
  v("cormorant-garamond", "Cormorant Garamond", 600, 0.12, "Luxury Serif", SERIF),
  v("libre-baskerville", "Libre Baskerville", 400, 0.08, "Luxury Serif", SERIF),
  v("cinzel", "Cinzel", 600, 0.18, "Luxury Serif", SERIF),
  v("lora", "Lora", 500, 0.06, "Luxury Serif", SERIF),
  v("gfs-didot", "GFS Didot", 400, 0.1, "Luxury Serif", SERIF),
  v("eb-garamond", "EB Garamond", 500, 0.14, "Luxury Serif", SERIF),
  v("inter", "Inter", 600, 0.02, "Modern Sans-Serif"),
  v("manrope", "Manrope", 700, 0.06, "Modern Sans-Serif"),
  v("montserrat", "Montserrat", 600, 0.16, "Modern Sans-Serif"),
  v("poppins", "Poppins", 600, 0.04, "Modern Sans-Serif"),
  v("plus-jakarta-sans", "Plus Jakarta Sans", 700, 0.03, "Modern Sans-Serif"),
  v("dm-sans", "DM Sans", 600, 0.08, "Modern Sans-Serif"),
  v("sora", "Sora", 600, 0.05, "Modern Sans-Serif"),
  v("space-grotesk", "Space Grotesk", 500, 0.1, "Modern Sans-Serif"),
  v("syne", "Syne", 700, 0.06, "Geometric"),
  v("jost", "Jost", 500, 0.22, "Geometric"),
  v("league-spartan", "League Spartan", 600, 0.08, "Geometric"),
  v("archivo", "Archivo", 600, 0.12, "Geometric"),
  v("ibm-plex-sans", "IBM Plex Sans", 500, 0.14, "Geometric"),
  v("figtree", "Figtree", 600, 0.06, "Geometric"),
  v("albert-sans", "Albert Sans", 700, 0.04, "Geometric"),
  v("bodoni-moda", "Bodoni Moda", 700, 0.08, "Editorial", SERIF),
  v("cormorant", "Cormorant", 500, 0.3, "Editorial", SERIF),
  v("prata", "Prata", 400, 0.12, "Editorial", SERIF),
  v("dm-serif-display", "DM Serif Display", 400, 0.04, "Editorial", SERIF),
  v("libre-caslon-display", "Libre Caslon Display", 400, 0.16, "Editorial", SERIF),
  v("instrument-serif", "Instrument Serif", 400, 0.06, "Editorial", SERIF),
  v("anton", "Anton", 400, 0.04, "Bold"),
  v("oswald", "Oswald", 700, 0.08, "Bold"),
  v("bebas-neue", "Bebas Neue", 400, 0.14, "Bold"),
  v("archivo-black", "Archivo Black", 400, 0.02, "Bold"),
  v("barlow-condensed", "Barlow Condensed", 800, 0.1, "Bold"),
  v("montserrat-extrabold", "Montserrat", 800, 0.02, "Bold"),
  v("inter-black", "Inter", 900, -0.02, "Bold"),
  v("roboto-condensed", "Roboto Condensed", 700, 0.12, "Bold"),
  v("manrope-light", "Manrope", 300, 0.28, "Minimalist"),
  v("inter-light", "Inter", 300, 0.32, "Minimalist"),
  v("raleway", "Raleway", 300, 0.36, "Minimalist"),
  v("outfit", "Outfit", 300, 0.24, "Minimalist"),
  v("urbanist", "Urbanist", 400, 0.3, "Minimalist"),
  v("work-sans", "Work Sans", 300, 0.26, "Minimalist"),
  v("unbounded", "Unbounded", 600, 0.04, "Display"),
  v("audiowide", "Audiowide", 400, 0.08, "Display"),
  v("michroma", "Michroma", 400, 0.12, "Display"),
  v("chakra-petch", "Chakra Petch", 600, 0.1, "Display"),
  v("orbitron", "Orbitron", 700, 0.12, "Display"),
  v("oxanium", "Oxanium", 600, 0.08, "Display"),
  v("exo-2", "Exo 2", 700, 0.06, "Display"),
];

export function fontStack(l: LogoVariation) {
  return `'${l.fontFamily}', ${l.fallbackFont}`;
}

export function fontLabel(l: LogoVariation) {
  const names: Record<number, string> = { 300: "Light", 400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black" };
  return `${l.fontFamily} ${names[l.fontWeight] ?? l.fontWeight}`;
}

export function createLogoFilename(l: LogoVariation, ext: "svg" | "png") {
  return `sholok-premium-purple-${l.id}.${ext}`;
}

export function googleFontsHref() {
  const map = new Map<string, Set<number>>();
  for (const l of LOGOS) {
    if (!map.has(l.fontFamily)) map.set(l.fontFamily, new Set());
    map.get(l.fontFamily)!.add(l.fontWeight);
  }
  const single = new Set(["GFS Didot", "Prata", "DM Serif Display", "Libre Caslon Display", "Instrument Serif", "Anton", "Bebas Neue", "Archivo Black", "Audiowide", "Michroma"]);
  const fams = [...map.entries()].map(([f, w]) => {
    const name = f.replace(/ /g, "+");
    if (single.has(f)) return `family=${name}`;
    return `family=${name}:wght@${[...w, 400].filter((x, i, a) => a.indexOf(x) === i).sort((a, b) => a - b).join(";")}`;
  });
  return `https://fonts.googleapis.com/css2?${fams.join("&")}&display=swap`;
}
