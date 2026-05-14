import { Hero } from "@/components/Hero";
import { FormulasGrid } from "@/components/FormulasGrid";
import { Prices } from "@/components/Prices";
import { Manifesto } from "@/components/Manifesto";
import { FlowingCurves } from "@/components/FlowingCurves";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="relative">
        <FlowingCurves />
        <div className="relative z-10">
          <Hero />
          <FormulasGrid />
        </div>
      </div>
      <Manifesto />
      <Prices />
    </div>
  );
}
