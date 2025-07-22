'use client';

import { useState, useRef, useEffect } from 'react';
import Unit from '../components/Unit';
import Promoter from '../components/Promoter';
import Director from '../components/Director';

import { supabase, HekItem } from '../lib/supabase';
import Arm from '../components/Arm/Arm';
import Accordion from '../components/Accordion';
import Dragger from '../components/Dragger'; // Explorer = Dragger
import Scroller from '../components/Scroller/Scroller';
import Text from '../components/Text';
// import Explorer, Scroller, Headline, Marquee falls vorhanden
// import Explorer from '../components/Explorer';
// import Scroller from '../components/Scroller';
// import Headline from '../components/Headline';
import Marquee from 'react-fast-marquee';

export default function Home() {
  const accordionData = [
    {
      title: "HEK GmbH",
      subtitle: "Innovation mit Tradition: Ihre Experten für zukunftsweisende Gebäude- & Klimatechnik",
      openLabel: "Mehr anzeigen",
      closeLabel: "Zurück",
      content: (
        <div>
          <p>HEK steht seit über 40 Jahren als Garant für Sicherheit und Zuverlässigkeit in der Beratung, Planung, Installation und Wartung von moderner technischer Gebäudeausrüstung. Innovativ, vielseitig und umweltorientiert bietet HEK maßgeschneiderte Lösungen, Planung, Montage, Instandhaltung und Wartung aus den Gewerken Heizung, Elektro, Kälte, Klima, Lüftung und Sanitär an. Kurz: Die komplette Haustechnik aus einer Hand- das ist HEK.<br /><br />
          Selbstverständlich ist HEK auch Mitglied der Handwerkskammern, erfolgreicher Ausbildungsbetrieb und autorisierter Kundendienstbetrieb vieler namhafter Marktanbieter<br /><br />
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
  const [hekIds, setHekIds] = useState<string[]>([]);
  const armRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (armRef.current) {
      setArmHeight(armRef.current.getBoundingClientRect().height);
    }

    // Lade die ersten 3 HEK-Artikel einmalig
    (async () => {
      const { data, error } = await supabase
        .from('hek')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(3);
      
      console.log('HEK Data loaded:', data, 'Error:', error);
      
      if (!error && data) {
        setHekIds((data as { id: string }[]).map(d => d.id));
      }
    })();

    const handleResize = () => {
      if (armRef.current) {
        setArmHeight(armRef.current.getBoundingClientRect().height);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <h1 className="visually-hidden">HEK</h1>

      {/* Promoter ganz oben */}
      <Unit first={{}}>
        <Promoter tableName="news" />
      </Unit>

      <Unit second={{ spacingT: true, spacingB: true, widthMax: 1 }}>
        <Accordion
          title={accordionData[0].title}
          subtitle={accordionData[0].subtitle}
          open={openStates[0]}
          onClick={() => setOpenStates(states => {
            const copy = [...states];
            copy[0] = !copy[0];
            return copy;
          })}
        >
          {accordionData[0].content}
        </Accordion>
      </Unit>
      {/* Explorer/Arm-Demo */}
      <Unit second={{ spacingB: true, style: { paddingLeft: '0', paddingRight: '0' } }}>
        <Dragger style={{ paddingLeft: 'calc((100vw - 296px) / 2)', paddingRight: 'calc((100vw - 306px) / 2)' }}>
          {/* Heizung */}
          {hekIds.length >= 3 && (
          <Director direction="v 3 1" style={{ gap: '2.5rem' }}>
            <div style={{ minHeight: armHeight || undefined  }}/>
            <svg viewBox="0 0 322 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)', marginRight: '60px' }}>
              <path d="M0.607178 51.6413V380.625H85.6488V148.646V0.625L0.607178 51.6413Z" fill="var(--clrL_b)" />
              <path d="M235.823 148.646H85.6488L138.746 222.375H235.823V380.625L321.399 329.276V0.625H235.823V148.646Z" fill="var(--clrL_b)" />
            </svg>
            <Arm
              ref={armRef}
              side="right"
              label="Heizung"
              {...(hekIds[0] ? { href: `/hek/${hekIds[0]}` } : { onClick: () => console.log('No HEK data for Heizung') })}
              style={{ width: '140%', marginLeft: '-60px' }}
            />
          </Director>
          )}
          {/* Elektrik */}
          {hekIds.length >= 3 && (
          <Director direction="v 1 1" style={{ gap: '2.5rem' }}>
            <Arm
              direction="down"
              label="Elektrik"
              {...(hekIds[1] ? { href: `/hek/${hekIds[1]}` } : { onClick: () => console.log('No HEK data for Elektrik') })}
              style={{ width: '140%' }}
            />
            <svg viewBox="0 0 275 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)', marginRight: '50px' }}>
              <path d="M254.99 222.375V150.799H85.4408L136.992 222.375H254.99Z" fill="var(--clrL_b)" />
              <path d="M85.4408 150.799V73.8192H271.143V0.625H53.1059L0.39917 73.8192V380.625H221.658L274.364 307.416H85.4408V150.799Z" fill="var(--clrL_b)" />
            </svg>
            <div style={{ minHeight: armHeight || undefined }}/>
          </Director>
          )}
          {/* Klima */}
          {hekIds.length >= 3 && (
          <Director direction="v 1 1" style={{ gap: '2.5rem' }}>
            <div style={{ minHeight: armHeight || undefined }}/>
            <svg viewBox="0 0 333 381" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--max_3)'}}>
              <path d="M190.4 208.591H89.7402L85.4203 208.62L227.705 380.625H332.714L190.4 208.591Z" fill="var(--clrL_b)" />
              <path d="M316.576 0.625H213.589L85.4202 120.4V0.625H0.364014V380.625H85.4202L85.4203 208.62L316.576 0.625Z" fill="var(--clrL_b)" />
            </svg>
            <Arm
              side="left"
              label="Klima"
              {...(hekIds[2] ? { href: `/hek/${hekIds[2]}` } : { onClick: () => console.log('No HEK data for Klima') })}
              style={{ width: '140%' }}
            />
          </Director>
          )}
        </Dragger>
      </Unit>
      <Unit second={{ spacingT: true, spacingB: true, style: { padding: '0' } }}>
        <Scroller accordionData={[accordionData[2]]} />
      </Unit>
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

      {/* Marquee am Ende */}
      <Unit second={{ spacingT: true, spacingB: true, style: { overflow: 'hidden' } }}>
        <Marquee 
          speed={50}
          pauseOnHover={true}
          gradient={false}
          style={{ color: 'var(--clrA_z)' }}
        >
          <Text style={{ fontSize: '1.2rem' }}>
            HEK Gebäudemanagement • Heizung • Elektro • Klima • Lüftung • Sanitär • HEK Gebäudemanagement • Heizung • Elektro • Klima • Lüftung • Sanitär • HEK Gebäudemanagement • Heizung • Elektro • Klima • Lüftung • Sanitär • 
          </Text>
        </Marquee>
      </Unit>
    </>
  );
}
