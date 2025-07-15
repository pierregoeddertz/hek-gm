import { Unit } from '@/components/Layout/Unit';
import Promoter from "@/components/Entities/Promoter";
import Introducer from "@/components/Entities/Introducer";

export default function Home() {
  return (
    <main>
      <Unit >
        <Promoter />
      </Unit>
      <Unit layout="widthMax paddingX paddingY">
        <Introducer
          index="01"
          label="Intro"
          title="Willkommen auf unserer Seite!"
          subtitle="Hier findest du spannende Inhalte und mehr."
        >
          <p>Dies ist der ausklappbare Bereich des Introducer-Components. Du kannst hier beliebigen Content einfügen.</p>
        </Introducer>
      </Unit>
    </main>
  );
}
