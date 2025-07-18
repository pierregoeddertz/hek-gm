"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './Scroller.module.css';
import Button from '@/components/Foundations/Button/Button';
import Headline from '@/components/Foundations/Headline';
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
  const [items] = useState<ScrollerItem[]>(scrollerItems);
  const [open, setOpen] = useState(false);
  const [activeLi, setActiveLi] = useState<number | null>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    setOpen(false); // Accordion schließt sich beim Slide-Wechsel
  }, [activeLi]);

  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight / 2;
      let minDist = Infinity;
      let active: number | null = null;
      liRefs.current.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const dist = Math.abs(center - elCenter);
          if (dist < minDist) {
            minDist = dist;
            active = idx;
          }
        }
      });
      setActiveLi(active);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  let content = null;
  if (items.length === 0) {
    content = <img className={styles.media} alt="Scroller Platzhalter" draggable={false} />;
  } else {
    const idx = activeLi !== null ? activeLi : 0;
    const data = items[idx];
    if (!data) {
      content = <img className={styles.media} alt="Scroller Platzhalter" draggable={false} />;
    } else {
      const isVideo = /(\.mp4$|\.webm$|\.mov$)/i.test(data.image_url || '');
      content = isVideo ? (
        <video
          className={styles.media}
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
          className={styles.media}
          src={data.image_url}
          alt={data.title || 'Scroller Slide'}
          draggable={false}
        />
      );
    }
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
            <h4 style={{ marginBottom: '1.5rem', opacity: [0,1,2,3,4].includes(activeLi ?? -1) ? 1 : 0.33 }}>Mess-, Steuerungs-, Regelungs- & Elektrotechnik</h4>
            <li ref={el => { liRefs.current[0] = el; }} className="fontLarge" style={{ opacity: activeLi === 0 ? 1 : 0.33 }}>Opel</li>
            <li ref={el => { liRefs.current[1] = el; }} className="fontLarge" style={{ opacity: activeLi === 1 ? 1 : 0.33 }}>Amazon Zentrallager</li>
            <li ref={el => { liRefs.current[2] = el; }} className="fontLarge" style={{ opacity: activeLi === 2 ? 1 : 0.33 }}>The Squaire</li>
            <li ref={el => { liRefs.current[3] = el; }} className="fontLarge" style={{ opacity: activeLi === 3 ? 1 : 0.33 }}>Winx</li>
            <li ref={el => { liRefs.current[4] = el; }} className="fontLarge" style={{ opacity: activeLi === 4 ? 1 : 0.33 }}>Grand Tower</li>
          </Director>
          <Director as="ol" identity="vertical 1 a" style={{ gap: '.5rem' }}>
            <h4 style={{ marginBottom: '1.5rem', opacity: [5,6,7,8].includes(activeLi ?? -1) ? 1 : 0.33 }}>Kälte-, Klima- & Lüftungstechnik</h4>
            <li ref={el => { liRefs.current[5] = el; }} className="fontLarge" style={{ opacity: activeLi === 5 ? 1 : 0.33 }}>Porsche Museum</li>
            <li ref={el => { liRefs.current[6] = el; }} className="fontLarge" style={{ opacity: activeLi === 6 ? 1 : 0.33 }}>Ostbahnhof</li>
            <li ref={el => { liRefs.current[7] = el; }} className="fontLarge" style={{ opacity: activeLi === 7 ? 1 : 0.33 }}>Courtyard bei Marriott Hotel</li>
            <li ref={el => { liRefs.current[8] = el; }} className="fontLarge" style={{ opacity: activeLi === 8 ? 1 : 0.33 }}>Deutsche Bahn</li>
          </Director>
          <Director as="ol" identity="vertical 1 a" style={{ gap: '.5rem' }}>
            <h4 style={{ marginBottom: '1.5rem', opacity: [9,10,11,12].includes(activeLi ?? -1) ? 1 : 0.33 }}>TGA-Planung & Projektleitung</h4>
            <li ref={el => { liRefs.current[9] = el; }} className="fontLarge" style={{ opacity: activeLi === 9 ? 1 : 0.33 }}>Flughafen BER</li>
            <li ref={el => { liRefs.current[10] = el; }} className="fontLarge" style={{ opacity: activeLi === 10 ? 1 : 0.33 }}>Europa Passage</li>
            <li ref={el => { liRefs.current[11] = el; }} className="fontLarge" style={{ opacity: activeLi === 11 ? 1 : 0.33 }}>Four</li>
            <li ref={el => { liRefs.current[12] = el; }} className="fontLarge" style={{ opacity: activeLi === 12 ? 1 : 0.33 }}>DFB Zentrale</li>
          </Director>
        </Director>
      </Director>
    </Director>
  );
} 