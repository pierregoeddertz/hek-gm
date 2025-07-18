"use client";

import { useState, useEffect } from 'react';
import styles from './Scroller.module.css';
import Director from '@/components/Layout/Director';
import Accordion from '@/components/Entities/Accordion';

export interface ScrollerItem {
  id: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  content?: string;
  index?: string;
  label?: string;
}

const scrollerItems: ScrollerItem[] = [
  { id: '1', image_url: 'https://picsum.photos/seed/heizung/1920/1080', title: 'Heizung Headline', subtitle: 'Heizung Subtext' },
  { id: '2', image_url: 'https://picsum.photos/seed/elektrik/1920/1080', title: 'Elektrik Headline', subtitle: 'Elektrik Subtext' },
  { id: '3', image_url: 'https://picsum.photos/seed/klima/1920/1080', title: 'Klima Headline', subtitle: 'Klima Subtext' },
  { id: '4', image_url: 'https://picsum.photos/seed/lueftung/1920/1080', title: 'Lüftung Headline', subtitle: 'Lüftung Subtext' },
  { id: '5', image_url: 'https://picsum.photos/seed/sanitaer/1920/1080', title: 'Sanitär Headline', subtitle: 'Sanitär Subtext' },
  { id: '6', image_url: 'https://picsum.photos/seed/smarthome/1920/1080', title: 'Smart Home Headline', subtitle: 'Smart Home Subtext' },
];

export default function Scroller() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
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
    <Director identity="vertical 2 a" className={styles.core}>
      {/* Sticky Hintergrundbild */}
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        {content}
      </div>
      <Director identity="vertical 1 a heightFill widthMax paddingX spacingTop spacingBottom" className={styles.verbal} style={{ marginTop:'-100vh' }}>
        <Accordion
          title={'Überschrift'}
          subtitle='Überschrift'
          open={open}
          openLabel="Mehr erfahren"
          closeLabel="Weniger anzeigen"
          onClick={() => setOpen((prev) => !prev)}
        >
        </Accordion>
        {/* Drei Listen mit Überschrift */}
        <Director identity="vertical 1 a widthMax spacingTop" style={{ gap: 'var(--vlu_z)' }}>
          <Director as="ol" identity="vertical 1 a" style={{ gap: '.5rem' }}>
            <h4 style={{ marginBottom: '1.5rem' }}>Mess-, Steuerungs-, Regelungs- & Elektrotechnik</h4>
            <li className="fontLarge">Opel</li>
            <li className="fontLarge">Amazon Zentrallager</li>
            <li className="fontLarge">The Squaire</li>
            <li className="fontLarge">Winx</li>
            <li className="fontLarge">Grand Tower</li>
          </Director>
          <Director as="ol" identity="vertical 1 a" style={{ gap: '.5rem' }}>
            <h4 style={{ marginBottom: '1.5rem' }}>Kälte-, Klima- & Lüftungstechnik</h4>
            <li className="fontLarge">Porsche Museum</li>
            <li className="fontLarge">Ostbahnhof</li>
            <li className="fontLarge">Courtyard bei Marriott Hotel</li>
            <li className="fontLarge">Deutsche Bahn</li>
          </Director>
          <Director as="ol" identity="vertical 1 a" style={{ gap: '.5rem' }}>
            <h4 style={{ marginBottom: '1.5rem' }}>TGA-Planung & Projektleitung</h4>
            <li className="fontLarge">Flughafen BER</li>
            <li className="fontLarge">Europa Passage</li>
            <li className="fontLarge">Four</li>
            <li className="fontLarge">DFB Zentrale</li>
          </Director>
        </Director>
      </Director>
    </Director>
  );
} 