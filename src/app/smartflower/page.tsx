'use client';

import { useState } from 'react';
import { supabase, SmartflowerItem } from '../../lib/supabase';
import Card from '../../components/Card';
import Dragger from '../../components/Dragger';
import Unit from '../../components/Unit';
import Promoter from '../../components/Promoter';
import Director from '../../components/Director';
import Text from '../../components/Text';
import Accordion from '../../components/Accordion';
import '../globals.css';

export default function SmartflowerPage() {
  const [openStates, setOpenStates] = useState<boolean[]>([false, false]);

  const accordionData = [
    {
      title: "Installation & Wartung",
      subtitle: "Einfache Installation und wartungsfreier Betrieb",
      content: (
        <div>
          <p>Die Smartflower wird als komplettes Plug & Play System geliefert und kann in nur wenigen Stunden installiert werden. Dank des modularen Aufbaus sind keine aufwendigen Dacharbeiten oder komplexe Verkabelungen erforderlich. Das System reinigt sich automatisch und überwacht sich selbst, wodurch der Wartungsaufwand minimal bleibt.<br /><br />
          Unsere zertifizierten Techniker übernehmen die fachgerechte Installation und Inbetriebnahme sowie die regelmäßige Wartung für optimale Leistung.</p>
        </div>
      )
    },
    {
      title: "Wirtschaftlichkeit & Förderung",
      subtitle: "Investition in eine nachhaltige und rentable Energiezukunft",
      content: (
        <div>
          <p>Die Smartflower amortisiert sich durch ihre hohe Effizienz und den minimalen Wartungsaufwand bereits nach wenigen Jahren. Zusätzlich profitieren Sie von attraktiven staatlichen Förderungen und Einspeisevergütungen. Die Kombination aus Energiekosteneinsparung und Einnahmen durch Stromeinspeisung macht die Smartflower zu einer lohnenden Investition.<br /><br />
          Gerne beraten wir Sie individuell zu Finanzierungsmöglichkeiten und verfügbaren Förderprogrammen.</p>
        </div>
      )
    }
  ];

  return (
    <>
      <h1 className="visually-hidden">Smartflower</h1>

      {/* Promoter ganz oben */}
      <Unit first={{ colorDom: true }}>
        <Promoter tableName="smartflower" />
      </Unit>

      {/* Accordion Sektion 2 */}
      <Unit second={{ spacingT: true, spacingB: true, widthMax: 1 }}>
        <Accordion
          title={accordionData[1].title}
          subtitle={accordionData[1].subtitle}
          open={openStates[1]}
          onClick={() => setOpenStates(states => {
            const copy = [...states];
            copy[1] = !copy[1];
            return copy;
          })}
        >
          {accordionData[1].content}
        </Accordion>
      </Unit>
    </>
  );
}