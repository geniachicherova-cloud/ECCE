import type { ReactNode } from "react";
import { CTAAct } from "@/components/home/CTAAct";
import { HeroAct } from "@/components/home/HeroAct";
import { HypothesisAct } from "@/components/home/HypothesisAct";
import { MicrobiomeAct } from "@/components/home/MicrobiomeAct";
import { NetworkAct } from "@/components/home/NetworkAct";
import { NewsTeaserAct } from "@/components/home/NewsTeaserAct";
import { ProblemAct } from "@/components/home/ProblemAct";
import { SampleJourneyAct } from "@/components/home/SampleJourneyAct";
import { ScrollProgressRail } from "@/components/home/ScrollProgressRail";
import { SignatureAct } from "@/components/home/SignatureAct";
import { WorkPackagesAct } from "@/components/home/WorkPackagesAct";

export default function Home(): ReactNode {
  return (
    <main id="main">
      <ScrollProgressRail />
      <HeroAct />
      <ProblemAct />
      <HypothesisAct />
      <SignatureAct />
      <MicrobiomeAct />
      <NetworkAct />
      <WorkPackagesAct />
      <SampleJourneyAct />
      <NewsTeaserAct />
      <CTAAct />
    </main>
  );
}
