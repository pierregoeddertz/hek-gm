'use client';

import { Unit } from '@/components/Layout/Unit';
import Promoter from "@/components/Entities/Promoter";
import Scroller from "@/components/Entities/Scroller";
import Explorer from "@/components/Layout/Unit/Explorer";
import Arm from "@/components/Foundations/Button/Arm";
import Headline from '@/components/Foundations/Headline';
import Accordion from "@/components/Entities/Accordion";
import { useState, useRef, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import Director from "@/components/Layout/Director";

function handleClick(type: string) {
  // Replace with your navigation or logic
  alert(`Clicked: ${type}`);
}

export default function Home() {
  // Accordion-Daten als Array
  const accordionData = [
    {
      title: "HEK GmbH",
      subtitle: "Innovation mit Tradition: Ihre Experten für zukunftsweisende Gebäude- & Klimatechnik",
      openLabel: "Mehr anzeigen",
      closeLabel: "Zurück",
      content: (
        <div>
          <p>Seit 1986 steht die HEK Gebäudemanagement GmbH für Kompetenz im Bereich der technischen Gebäudeplanung. Wir sind Ihr Ansprechpartner für Heizung, Klima-, Lüftungs- und Elektrotechnik. Was uns auszeichnet? Wir vereinen traditionelles Handwerk mit zukunftsweisenden Innovationen.<br /><br />
          Als Ihr Partner installieren, warten und reparieren wir nicht nur klassische Gewerke, sondern bieten Ihnen vor allem nachhaltige und energieeffiziente Lösungen, die Maßstäbe setzen. Wir verstehen uns als Ihr Problemlöser, fokussieren unter Berücksichtigung innovativer Ansätze stets das optimale Ergebnis und betreuen Sie durch den gesamten Prozess hinweg auf Augenhöhe.<br /><br />
          Nutzen Sie unsere jahrzehntelange Branchenerfahrung als Fundament für Ihr Bauprojekt!</p>
        </div>
      )
    },
    {
      title: "Partner & Sponsoring",
      subtitle: "Gemeinsam mehr erreichen: Partner, die unsere Visionen teilen",
      openLabel: "Mehr anzeigen",
      closeLabel: "Zurück",
      content: (
        <div>
          <p>Gemeinsam stark: Die HEK Gebäudemanagement GmbH kooperiert mit ausgewählten Partnern, die unseren strikten Qualitätsstandard entsprechen, Innovationen fördern sowie im Alltag integrieren und unsere Visionen teilen. Gemeinsam gestalten wir die Zukunft der Gebäude- und Energietechnik für unsere Kunden.</p>
        </div>
      )
    },
    {
      title: "Referenzen",
      subtitle: "Mit mehr als 28 Jahren Branchenerfahrung kann die HEK Gebäudemanagement GmbH nicht nur auf eine umfangreiche Expertise, sondern auch auf zahlreiche Referenzen zurückgreifen",
      openLabel: "Mehr anzeigen",
      closeLabel: "Zurück",
      content: (
        <div>
          <p>Die Entwicklung von anspruchsvollen Sonderlösungen bestimmt unseren Alltag. Setzen Sie mit der HEK auf ein stabiles Fundament für Ihr Bauvorhaben und lassen Sie sich von unseren zufriedenen Kunden überzeugen.</p>
        </div>
      )
    }
  ];
  const [openStates, setOpenStates] = useState<boolean[]>(Array(accordionData.length).fill(false));
  const [armHeight, setArmHeight] = useState<number | null>(null);
  const armRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (armRef.current) {
      setArmHeight(armRef.current.getBoundingClientRect().height);
    }
    const handleResize = () => {
      if (armRef.current) {
        setArmHeight(armRef.current.getBoundingClientRect().height);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <main>
      <Headline level="h1" text="Ich bin die Seitenüberschrift" />
      <Unit identity="colorD">
        <Promoter />
      </Unit>
      <Unit identity="vertical 1 a widthMax paddingX spacingTop">
        {/* Zweites Accordion unten */}
        <Accordion
          title={accordionData[0].title}
          subtitle={accordionData[0].subtitle}
          open={openStates[0]}
          openLabel={accordionData[0].openLabel}
          closeLabel={accordionData[0].closeLabel}
          onClick={() => setOpenStates(states => {
            const copy = [...states];
            copy[0] = !copy[0];
            return copy;
          })}
        >
          {accordionData[0].content}
        </Accordion>
      </Unit>
      <Unit identity="vertical 1 a spacingTop spacingBottom"  style={{ maxWidth: '338px' }}>
      <Explorer>
        {/* Heizung */}
        <Director identity="vertical 3 a" style={{ gap: '2.5rem' }}>
          <div style={{ minHeight: armHeight || undefined  }}/>
          <svg viewBox="0 0 322 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)', marginRight: '60px' }}>
            <path d="M0.607178 51.6413V380.625H85.6488V148.646V0.625L0.607178 51.6413Z" fill="var(--clrL_b)" />
            <path d="M235.823 148.646H85.6488L138.746 222.375H235.823V380.625L321.399 329.276V0.625H235.823V148.646Z" fill="var(--clrL_b)" />
          </svg>
          <Arm ref={armRef} side="right" label="Heizung" onClick={() => handleClick('heizung')} style={{ width: '140%', marginRight: '60px' }}></Arm>
        </Director>
        {/* Elektrik */}
        <Director identity="vertical 1 a" style={{ gap: '2.5rem' }}>
          <Arm direction="down" label="Elektrik" onClick={() => handleClick('elektrik')} style={{ width: '140%' }}></Arm>
          <svg viewBox="0 0 275 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)', marginRight: '50px' }}>
            <path d="M254.99 222.375V150.799H85.4408L136.992 222.375H254.99Z" fill="var(--clrL_b)" />
            <path d="M85.4408 150.799V73.8192H271.143V0.625H53.1059L0.39917 73.8192V380.625H221.658L274.364 307.416H85.4408V150.799Z" fill="var(--clrL_b)" />
          </svg>
          <div style={{ minHeight: armHeight || undefined }}/>
        </Director>
        {/* Klima */}
        <Director identity="vertical 1 a" style={{ gap: '2.5rem' }}>
        <div style={{ minHeight: armHeight || undefined }}/>
          <svg viewBox="0 0 333 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)'}}>
            <path d="M190.4 208.591H89.7402L85.4203 208.62L227.705 380.625H332.714L190.4 208.591Z" fill="var(--clrL_b)" />
            <path d="M316.576 0.625H213.589L85.4202 120.4V0.625H0.364014V380.625H85.4202L85.4203 208.62L316.576 0.625Z" fill="var(--clrL_b)" />
          </svg>
          <Arm side="left" label="Klima" onClick={() => handleClick('klima')} style={{ width: '140%' }}></Arm>
        </Director>
      </Explorer>
      </Unit>
      <Unit overflowVisible identity="colorD">
        <Scroller />
      </Unit>
      <Unit identity="vertical 1 a widthMax paddingX spacingTop">
        {/* Erstes Accordion oben */}
        <Accordion
          title={accordionData[1].title}
          subtitle={accordionData[1].subtitle}
          open={openStates[1]}
          openLabel={accordionData[1].openLabel}
          closeLabel={accordionData[1].closeLabel}
          onClick={() => setOpenStates(states => {
            const copy = [...states];
            copy[1] = !copy[1];
            return copy;
          })}
        >
          {accordionData[1].content}
        </Accordion>
      </Unit>
      <Unit identity="vertical 2 a spacingBottom spacingTop">
        <Marquee speed={50} gradient={false} autoFill>
          <span style={{ marginRight: 32 }}>Marquee-Inhalt 1</span>
          <span style={{ marginRight: 32 }}>Marquee-Inhalt 2</span>
          <span style={{ marginRight: 32 }}>Marquee-Inhalt 3</span>
        </Marquee>
      </Unit> 
    </main>
  );
}
