
import Countdown from "@/components/countdown";
import Hero from "@/components/hero";
import ProgramBlock from "@/components/program-block";
import StickyButtons from "@/components/sticky-buttons";
import BorderPattern from '@/public/branding/border-pattern.svg';

export default function Home() {
  return (
    <div>
      <Hero/>
      <Countdown eventDate={"2025-01-01T23:59:59"} />
      <ProgramBlock/>
      <BorderPattern/>
      <StickyButtons/>
    </div>
  );
}
