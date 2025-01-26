
import Countdown from "@/components/countdown";
import Hero from "@/components/hero";
import ParkingInfo from "@/components/parking-info";
import ProgramBlock from "@/components/program-block";
import StickyButtons from "@/components/sticky-buttons";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Countdown eventDate={"2025-02-07T19:00:00"} />
      <ProgramBlock/>
      <ParkingInfo/>
      <StickyButtons/>
    </div>
  );
}
