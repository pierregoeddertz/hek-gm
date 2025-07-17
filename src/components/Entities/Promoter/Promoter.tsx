'use client';

import { useState, useEffect } from 'react';
import { NewsService } from '@/lib/services/news';
import Director from '@/components/Layout/Director';
import styles from './Promoter.module.css';
import Button from '@/components/Foundations/Button/Button';
import Headline from '@/components/Foundations/Headline';

export interface PromoterItem {
  id: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  content?: string;
  index?: string;
  label?: string;
}

export default function Promoter() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState<PromoterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    NewsService.getSlideshowContent()
      .then((articles: PromoterItem[]) => {
        setItems(
          articles.map((article, index) => ({
            ...article,
            index: String(index + 1).padStart(2, '0'),
            label: article.title,
          }))
        );
        setError(null);
      })
      .catch((err) => {
        setError(err.message || String(err));
        console.error('Promoter fetch error:', err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      setIsVisible(true);
    }
  }, [items.length]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    items.forEach((item) => {
      if (item.image_url) {
        const img = new Image();
        img.src = item.image_url;
        images.push(img);
      }
    });
    return () => {
      images.splice(0, images.length);
    };
  }, [items]);

  useEffect(() => {
    if (items.length <= 1) {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 50);
      return;
    }
    if (isLoading) return;
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
  }, [current, items.length, isLoading]);

  if (error) return <>Fehler: {error}</>;

  let content = null;
  if (items.length === 0 || isLoading) {
    content = <img className={styles.media} alt="Promoter Platzhalter" draggable={false} />;
  } else {
    const data = items[current];
    const isVideo = /(\.mp4$|\.webm$|\.mov$)/i.test(data.image_url || '');
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
        className={
          styles.media +
          ' ' +
          (isVisible ? styles.visible : styles.hidden)
        }
        src={data.image_url}
        alt={data.title || 'Promoter Slide'}
        draggable={false}
      />
    );
  }

  return (
    <Director identity="vertical 2 b" className={styles.core}>
      <Director identity="vertical 2 c heightFill paddingHeader" className={styles.verbal}>
        <Headline
          text={items[current]?.title || ''}
          level="h1"
          className={styles.headlineFade + ' ' + (isVisible ? styles.visible : styles.hidden)}
        />
        <Button text="Button 1" />
      </Director>
      {content}
    </Director>
  );
}
