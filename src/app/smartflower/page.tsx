'use client';

import { useEffect, useState } from 'react';
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
  const [smartflowerItems, setSmartflowerItems] = useState<SmartflowerItem[] | null>(null);
  const [error, setError] = useState<any>(null);

  const accordionData = [
    {
      title: "Was ist die Smartflower?",
      subtitle: "Mehr als nur eine PV-Anlage: Ein Statement für Ihre Werte",
      content: (
        <div>
          <p>Die Smartflower wird als komplettes Plug & Play System geliefert und kann in nur wenigen Stunden installiert werden. Dank des modularen Aufbaus sind keine aufwendigen Dacharbeiten oder komplexe Verkabelungen erforderlich. Das System reinigt sich automatisch und überwacht sich selbst, wodurch der Wartungsaufwand minimal bleibt.<br /><br />
          Unsere zertifizierten Techniker übernehmen die fachgerechte Installation und Inbetriebnahme sowie die regelmäßige Wartung für optimale Leistung.</p>
        </div>
      )
    },
  ];

  useEffect(() => {
    async function fetchSmartflower() {
      const { data, error } = await supabase
        .from('smartflower')
        .select('*')
        .order('promoted', { ascending: false })
        .order('dragger_order', { ascending: true });
      if (error) setError(error);
      setSmartflowerItems(data);
    }
    fetchSmartflower();
  }, []);

  return (
    <>
      <h1 className="visually-hidden">Smartflower</h1>

      {/* Promoter ganz oben */}
      <Unit first={{ colorDom: true }}>
        {/* Promoter zeigt automatisch alle promoted=true an, daher reicht tableName */}
        <Promoter tableName="smartflower" filterMode="position" />
      </Unit>

      {/* Accordion Sektion 2 */}
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

      {/* Dragger mit Smartflower-Artikeln */}
      {smartflowerItems && smartflowerItems.filter(item => item.position === 'Dragger').length > 0 && (
        <Unit second={{ paddingX: false }}>
          <Dragger 
            second={{ direction: 'h 1 3', gapX: true, paddingX: true, style: { paddingBottom: 'var(--hgt_header)' } }}
          >
            {smartflowerItems.filter(item => item.position === 'Dragger').map((item, idx) => (
              <Card
                key={item.id}
                href={item.slug ? `/smartflower/${item.slug}` : `/smartflower/${item.id}`}
                title={item.title}
                imageSrc={item.image_url || 'https://via.placeholder.com/275x155/007acc/ffffff?text=' + encodeURIComponent(item.title)}
                imageAlt={item.title}
                aspectRatio={['9:16','16:9','4:5','1:1'].includes(item.aspect_ratio || '') ? item.aspect_ratio as any : undefined}
                tableName="smartflower"
                recordId={item.id}
                createdAt={item.created_at}
                showDate={false}
              />
            ))}
          </Dragger>
        </Unit>
      )}
    </>
  );
}