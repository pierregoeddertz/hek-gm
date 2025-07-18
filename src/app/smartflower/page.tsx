'use client';


import { Unit } from "@/components/Layout/Unit";
import Promoter from "@/components/Entities/Promoter";
import Headline from '@/components/Foundations/Headline';
import Accordion from "@/components/Entities/Accordion";
import { useState, useEffect } from 'react';
import { Explorer } from '@/components/Layout/Unit';
import Card from '@/components/Foundations/Card';
import { NewsService } from '@/lib/services/news';


export default function SmartflowerPage() {
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

  // News-Logik wie in news/page.tsx
  type NewsType = { id: string; title?: string; content?: string; image_url?: string; created_at?: string; aspect_ratio?: '9:16' | '16:9' | '4:5' | '1:1' };
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    NewsService.getAll()
      .then(setNews)
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
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
      <Unit identity="vertical 2 c heightMin widthMax spacingTop spacingBottom">
        {error && <div>Fehler: {error}</div>}
        {loading && <div>Lädt…</div>}
        {!loading && !error && (
          <Explorer>
            {[...news, ...news, ...news].map((item, idx) => {
              const dateObj = item.created_at ? new Date(item.created_at) : null;
              const date = dateObj ? dateObj.toLocaleDateString('de-DE') : '';
              const time = dateObj ? dateObj.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
              return (
                <Card
                  key={item.id + '-' + idx}
                  title={item.title || 'Ohne Titel'}
                  date={date}
                  time={time}
                  image={item.image_url || '/placeholder.png'}
                  aspectRatio={item.aspect_ratio}
                />
              );
            })}
          </Explorer>
        )}
      </Unit>
    </main>
  );
}