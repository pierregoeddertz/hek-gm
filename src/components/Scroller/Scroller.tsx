"use client";

import { useState, useEffect } from 'react';
import styles from './Scroller.module.css';
import Director from '../Director';
import Accordion from '../Accordion/Accordion';
import Unit from '../Unit';
import Text from '../Text/Text';

export interface AccordionDataType {
  title: string;
  subtitle?: string;
  openLabel?: string;
  closeLabel?: string;
  content: React.ReactNode;
}

export interface ScrollerItem {
  id: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  content?: string;
  index?: string;
  label?: string;
}

interface ScrollerProps {
  accordionData: AccordionDataType[];
}

const scrollerItems: ScrollerItem[] = [
  { id: '1', image_url: 'https://picsum.photos/seed/heizung/1920/1080', title: 'Heizung Headline', subtitle: 'Heizung Subtext' },
  { id: '2', image_url: 'https://picsum.photos/seed/elektrik/1920/1080', title: 'Elektrik Headline', subtitle: 'Elektrik Subtext' },
  { id: '3', image_url: 'https://picsum.photos/seed/klima/1920/1080', title: 'Klima Headline', subtitle: 'Klima Subtext' },
  { id: '4', image_url: 'https://picsum.photos/seed/lueftung/1920/1080', title: 'Lüftung Headline', subtitle: 'Lüftung Subtext' },
  { id: '5', image_url: 'https://picsum.photos/seed/sanitaer/1920/1080', title: 'Sanitär Headline', subtitle: 'Sanitär Subtext' },
  { id: '6', image_url: 'https://picsum.photos/seed/smarthome/1920/1080', title: 'Smart Home Headline', subtitle: 'Smart Home Subtext' },
];

export default function Scroller({ accordionData }: ScrollerProps) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [openStates, setOpenStates] = useState<boolean[]>(Array(accordionData.length).fill(false));
  const [items] = useState<ScrollerItem[]>(scrollerItems);

  useEffect(() => {
    if (items.length > 0) {
      setIsVisible(true);
    }
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 50);
      return;
    }
    setIsVisible(false);
    const fadeInTimeout = setTimeout(() => setIsVisible(true), 50);
    const holdDuration = 5000;
    const totalDuration = holdDuration + 750;
    const nextTimeout = setTimeout(() => {
      setIsVisible(false);
      setCurrent((p) => (p + 1) % items.length);
    }, totalDuration);
    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(nextTimeout);
    };
  }, [current, items.length]);

  let content = null;
  if (items.length === 0) {
    content = null;
  } else {
    const data = items[current];
    const isVideo = /\.(mp4|webm|mov)$/i.test(data.image_url || '');
    content = isVideo ? (
      <video
        className={styles.media + ' ' + (isVisible ? styles.visible : styles.hidden)}
        src={data.image_url}
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        draggable={false}
      />
    ) : (
      <img
        className={styles.media + ' ' + (isVisible ? styles.visible : styles.hidden)}
        src={data.image_url}
        alt={data.title || 'Scroller Slide'}
        draggable={false}
      />
    );
  }

  return (
    <Director direction="v 2 1" className={styles.core}>
      {/* Sticky Hintergrundbild */}
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
        {content}
      </div>
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
        <Unit second={{ spacingT: true, spacingB: true, widthMax: 1, style: { gap: 'var(--vlu_spacing_1)' } }}>
          <Director as="ol" direction="v 2 1" style={{ gap: '.5rem' }}>
            <Text as="h4" style={{ marginBottom: '.5rem' }}>Mess-, Steuerungs-, Regelungs- & Elektrotechnik</Text>
            <Text as="li" fontLarge>Opel</Text>
            <Text as="li" fontLarge>Amazon Zentrallager</Text>
            <Text as="li" fontLarge>The Squaire</Text>
            <Text as="li" fontLarge>Winx</Text>
            <Text as="li" fontLarge>Grand Tower</Text>
          </Director>
          <Director as="ol" direction="v 1 1" style={{ gap: '.5rem' }}>
            <Text as="h4" style={{ marginBottom: '.5rem' }}>Kälte-, Klima- & Lüftungstechnik</Text>
            <Text as="li" fontLarge>Porsche Museum</Text>
            <Text as="li" fontLarge>Ostbahnhof</Text>
            <Text as="li" fontLarge>Courtyard bei Marriott Hotel</Text>
            <Text as="li" fontLarge>Deutsche Bahn</Text>
          </Director>
          <Director as="ol" direction="v 1 1" style={{ gap: '.5rem', marginBottom: '5rem' }}>
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