import { Hero } from "@/components/Hero";
import { FormulasGrid } from "@/components/FormulasGrid";
import { Prices } from "@/components/Prices";
import { Manifesto } from "@/components/Manifesto";

export default function Home() {
  return (
    <>
      <Hero />
      <FormulasGrid />
      <Manifesto />
      <Prices />
    </>
  );
}
