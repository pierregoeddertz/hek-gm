'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import Director from '../Director';
import Button from '../Button';
import Text from '../Text';
import Unit from '../Unit';
import styles from './Promoter.module.css';

export interface PromoterItem {
  id: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  content?: string;
  index?: string;
  label?: string;
}

interface PromoterProps {
  tableName: string;
}

export default function Promoter({ tableName }: PromoterProps) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState<PromoterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('promoted', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      const articles = (data as PromoterItem[]) || [];
      setItems(
        articles.map((article, index) => ({
          id: article.id,
          image_url: article.image_url || '',
          title: article.title,
          subtitle: article.subtitle,
          content: article.content,
          index: String(index + 1).padStart(2, '0'),
          label: article.title,
        }))
      );
      setError(null);
    } catch (err: any) {
      setError(err.message || String(err));
      console.error('Promoter fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [tableName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (items.length > 0) {
      setIsVisible(true);
    }
  }, [items.length]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    items.forEach((item) => {
      if (item.image_url) {
        const img = new window.Image(1, 1);
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
    content = null;
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
      // eslint-disable-next-line @next/next/no-img-element
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
    <Director direction="v 2 2" className={styles.core}>
      <Director direction="v 2 3" heightFull paddingY widthMax={2} paddingX className={styles.verbal}>
        <Unit second={{ spacingT: true, spacingB: true, widthMax: 3, gapY: true }}>
          <Director 
            direction="v 1 2" 
            gapY 
            className={styles.headlineFade + ' ' + (isVisible ? styles.visible : styles.hidden)}
          >
            <Text as="h1" align={2}>
              {items[current]?.title || ''}
            </Text>
            {items[current]?.subtitle && (
              <Text as="h2" align={2} fontLarge>
                {items[current]?.subtitle}
              </Text>
            )}
            <Button 
              href={`/${tableName}/${items[current]?.id}`}
              text="Mehr erfahren"
            />
          </Director>
        </Unit>
      </Director>
      {content}
    </Director>
  );
} 