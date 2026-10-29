import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, COLOR_NAME, LOGOS, PRIMARY_COLOR, BRAND, fontLabel, fontStack, type Category, type LogoVariation } from "@/lib/logos";
import { downloadLogoPng, downloadLogoSvg } from "@/lib/download";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHOLOK Premium Logo Studio" },
      { name: "description", content: "Explore and download professional SHOLOK wordmarks in SVG and PNG, crafted with premium typography." },
      { property: "og:title", content: "SHOLOK Premium Logo Studio" },
      { property: "og:description", content: "Professional SHOLOK wordmarks in Premium Purple — download SVG and PNG." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [cat, setCat] = useState<Category | "All">("All");
  const list = cat === "All" ? LOGOS : LOGOS.filter((l) => l.category === cat);
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-12 sm:px-10 sm:py-16">
      <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.4em] text-primary">SHOLOK</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Premium Logo Studio</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Explore professional SHOLOK wordmarks crafted with premium typography.</p>
        </div>
        <p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">{LOGOS.length}</span> variations</p>
      </header>

      <nav aria-label="Typography categories" className="mb-14 flex flex-wrap gap-x-6 gap-y-2">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`text-link py-1 text-sm ${cat === c ? "text-primary underline underline-offset-8" : "text-muted-foreground hover:text-primary"}`}
          >
            {c === "All" ? "All Logos" : c}
          </button>
        ))}
      </nav>

      <ul className="grid grid-cols-1 gap-x-10 gap-y-16 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {list.map((l) => <LogoItem key={l.id} logo={l} />)}
      </ul>
    </main>
  );
}

function LogoItem({ logo }: { logo: LogoVariation }) {
  const [error, setError] = useState<string | null>(null);
  const run = async (fn: (l: LogoVariation) => Promise<void>, kind: string) => {
    setError(null);
    try { await fn(logo); } catch { setError(`Could not create the ${kind} file. Please try again.`); }
  };
  return (
    <li className="flex flex-col">
      <div className="flex h-36 items-center justify-center overflow-hidden" aria-label={`SHOLOK wordmark in ${logo.fontFamily}`}>
        <span
          className="whitespace-nowrap text-primary"
          style={{ fontFamily: fontStack(logo), fontWeight: logo.fontWeight, letterSpacing: `${logo.letterSpacing}em`, fontSize: "clamp(2rem, 4.2vw, 3.25rem)", marginRight: `-${logo.letterSpacing}em` }}
        >
          {BRAND}
        </span>
      </div>
      <dl className="mt-4 space-y-1 text-xs">
        <div className="flex gap-1"><dt className="text-muted-foreground">Color Name:</dt><dd>{COLOR_NAME}</dd></div>
        <div className="flex gap-1"><dt className="text-muted-foreground">Font:</dt><dd className="font-medium">{fontLabel(logo)}</dd></div>
        <div className="flex gap-1"><dt className="text-muted-foreground">Primary Brand Color:</dt><dd className="font-mono">{PRIMARY_COLOR}</dd></div>
      </dl>
      <div className="mt-4 flex gap-6">
        <button onClick={() => run(downloadLogoSvg, "SVG")} aria-label={`Download SVG of ${fontLabel(logo)} logo`} className="text-link text-sm font-medium text-primary hover:underline underline-offset-4">Download SVG</button>
        <button onClick={() => run(downloadLogoPng, "PNG")} aria-label={`Download PNG of ${fontLabel(logo)} logo`} className="text-link text-sm font-medium text-primary hover:underline underline-offset-4">Download PNG</button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
    </li>
  );
}
