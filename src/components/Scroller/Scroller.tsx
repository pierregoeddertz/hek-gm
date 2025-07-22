"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './Scroller.module.css';
import Director from '../Director';
import Accordion from '../Accordion';
import Unit from '../Unit';
import Text from '../Text';
import { supabase, ReferenzenItem } from '../../lib/supabase';

export interface AccordionDataType {
  title: string;
  subtitle?: string;
  openLabel?: string;
  closeLabel?: string;
  content: React.ReactNode;
}

interface ScrollerProps {
  accordionData: AccordionDataType[];
}

export default function Scroller({ accordionData }: ScrollerProps) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [openStates, setOpenStates] = useState<boolean[]>(Array(accordionData.length).fill(false));
  const [items, setItems] = useState<ReferenzenItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Lade Referenzen aus Supabase
  useEffect(() => {
    async function loadReferenzen() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('referenzen')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading referenzen:', error);
          return;
        }

        if (data && data.length > 0) {
          setItems(data.filter(item => item.image_url)); // Nur Items mit Bildern
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadReferenzen();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      setIsVisible(true);
    }
  }, [items.length]);

  useEffect(() => {
    if (loading || items.length === 0) return;

    if (items.length <= 1) {
      setIsVisible(false);
      const timeout = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timeout);
    }
    
    setIsVisible(false);
    const fadeInTimeout = setTimeout(() => setIsVisible(true), 100);
    
    const holdDuration = 5000;
    const totalDuration = holdDuration + 750; // 750ms ist die Animation duration
    
    const nextTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % items.length);
      }, 750); // Warten bis fade out complete ist
    }, totalDuration);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(nextTimeout);
    };
  }, [current, items.length, loading]);

  let content = null;
  if (loading) {
    content = (
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--clrA_m)'
      }}>
        <Text>Lädt...</Text>
      </div>
    );
  } else if (items.length === 0) {
    content = null;
  } else {
    const data = items[current];
    const isVideo = /\.(mp4|webm|mov)$/i.test(data.image_url || '');
    content = isVideo ? (
      <video
        className={`${styles.media} ${isVisible ? styles.visible : styles.hidden}`}
        src={data.image_url}
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        draggable={false}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`${styles.media} ${isVisible ? styles.visible : styles.hidden}`}
        src={data.image_url}
        alt={`Referenz ${data.id}`}
        draggable={false}
      />
    );
  }

  return (
    <Director direction="v 2 1" colorDom className={styles.core} >
      {/* Sticky Hintergrundbild */}
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
        {content}
      </div>
        <Unit second={{ spacingT: true, spacingB: true, widthMax: 1, style: { position: 'relative', zIndex: 1 }, className: styles.whiteText }}>
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
        <Unit second={{ spacingT: true, spacingB: true, widthMax: 1, style: { gap: 'var(--vlu_spacing_1)', position: 'relative', zIndex: 1 }, className: styles.whiteText }}>
          <Director as="ol" direction="v 2 1" style={{ gap: '.5rem', listStyle: 'none' }}>
            <Text as="h4" style={{ marginBottom: '.5rem' }}>Mess-, Steuerungs-, Regelungs- & Elektrotechnik</Text>
            <Text as="li" fontLarge>Opel</Text>
            <Text as="li" fontLarge>Amazon Zentrallager</Text>
            <Text as="li" fontLarge>The Squaire</Text>
            <Text as="li" fontLarge>Winx</Text>
            <Text as="li" fontLarge>Grand Tower</Text>
          </Director>
          <Director as="ol" direction="v 1 1" style={{ gap: '.5rem', listStyle: 'none'  }}>
            <Text as="h4" style={{ marginBottom: '.5rem' }}>Kälte-, Klima- & Lüftungstechnik</Text>
            <Text as="li" fontLarge>Porsche Museum</Text>
            <Text as="li" fontLarge>Ostbahnhof</Text>
            <Text as="li" fontLarge>Courtyard bei Marriott Hotel</Text>
            <Text as="li" fontLarge>Deutsche Bahn</Text>
          </Director>
          <Director as="ol" direction="v 1 1" style={{ gap: '.5rem', marginBottom: '5rem', listStyle: 'none'  }}>
            <Text as="h4" style={{ marginBottom: '.5rem' }}>TGA-Planung & Projektleitung</Text>
            <Text as="li" fontLarge>Flughafen BER</Text>
            <Text as="li" fontLarge>Europa Passage</Text>
            <Text as="li" fontLarge>Four</Text>
            <Text as="li" fontLarge>DFB Zentrale</Text>
          </Director>
        </Unit>
    </Director>
  );
}