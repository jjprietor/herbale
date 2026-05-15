import { Hero } from "@/components/Hero";
import { LeavesSection } from "@/components/LeavesSection";
import { FormulasGrid } from "@/components/FormulasGrid";
import { Prices } from "@/components/Prices";
import { Manifesto } from "@/components/Manifesto";
import { FlowingCurves } from "@/components/FlowingCurves";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      <Hero />
      <LeavesSection />
      <FormulasGrid />
      <Manifesto />
      <Prices />
      {/* FlowingCurves rendered LAST so it paints on top of every section.
          mix-blend-overlay makes the curves visible on both cream and dark
          backgrounds without obscuring text. */}
      <FlowingCurves />
    </div>
  );
}
