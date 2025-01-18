
import Countdown from "@/components/countdown";
import Hero from "@/components/hero";
import StickyButtons from "@/components/sticky-buttons";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Countdown eventDate={"2025-01-01T23:59:59"} />
      <StickyButtons/>
    </div>
  );
}
