import { Hero } from "@/components/Hero";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { ValuesStrip } from "@/components/ValuesStrip";
import { StoryBlock } from "@/components/StoryBlock";

export default function Home() {
  return (
    <>
      <Hero />
      <ValuesStrip />
      <FeaturedGrid />
      <StoryBlock />
    </>
  );
}
