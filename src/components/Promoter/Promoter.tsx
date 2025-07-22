'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import Director from '../Director';
import Button from '../Button';
import Text from '../Text';
import Unit from '../Unit';
import Media from '../Media';

export interface PromoterItem {
  id: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  content?: string;
  index?: string;
  label?: string;
  tableName?: string;
  created_at?: string;
}

interface PromoterProps {
  tableName: string | string[];
}

const promoterStyles = {
  core: {
    width: '100%',
    height: '100vh',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  media: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 400ms ease, transform 400ms ease',
    transform: 'scale(1.08)',
    opacity: 0,
    zIndex: 0,
  },
  mediaVisible: {
    opacity: 0.45,
    transform: 'scale(1.0)',
    zIndex: 1,
  },
  mediaHidden: {
    opacity: 0,
    transform: 'scale(1.08)',
    zIndex: 0,
  },
  verbal: {
    position: 'relative' as const,
    zIndex: 10,
  },
  headlineFade: {
    transition: 'opacity 400ms ease, transform 400ms ease',
    opacity: 0,
    transform: 'translateY(30px)',
  },
  headlineFadeVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  headlineFadeHidden: {
    opacity: 0,
    transform: 'translateY(30px)',
  },
};

export default function Promoter({ tableName }: PromoterProps) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [items, setItems] = useState<PromoterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const tableNames = Array.isArray(tableName) ? tableName : [tableName];
      const allItems: PromoterItem[] = [];

      for (const table of tableNames) {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('promoted', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error(`Error loading from ${table}:`, error);
          continue;
        }

        const tableItems = ((data ?? []) as PromoterItem[]).map((article) => ({
          id: article.id,
          image_url: article.image_url || '',
          title: article.title,
          subtitle: article.subtitle,
          content: article.content,
          label: article.title,
          tableName: table,
          created_at: article.created_at,
        }));

        allItems.push(...tableItems);
      }

      // Nach created_at sortieren (neueste zuerst)
      allItems.sort((a, b) => {
        const dateA = new Date(a.created_at || 0);
        const dateB = new Date(b.created_at || 0);
        return dateB.getTime() - dateA.getTime();
      });

      // Index hinzufügen
      const itemsWithIndex = allItems.map((item, index) => ({
        ...item,
        index: String(index + 1).padStart(2, '0'),
      }));

      setItems(itemsWithIndex);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
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
      // Kleine Verzögerung für bessere Initial-Animation
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  }, [items.length]); // Nur die Länge als Dependency, nicht das gesamte Array

  // Slideshow-Timer
  useEffect(() => {
    if (items.length <= 1 || isLoading || isTransitioning) {
      // Auch bei nur einem Item Animation starten
      if (items.length === 1 && !isVisible) {
        setTimeout(() => setIsVisible(true), 200);
      }
      return;
    }
    
    const holdDuration = 8000;
    
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setIsVisible(false);
      
      // Warte bis das aktuelle Bild vollständig verschwunden ist (400ms + Buffer)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % items.length);
        
        // Kurze Pause für sauberen Wechsel, dann neues Bild einblenden
        setTimeout(() => {
          setIsVisible(true);
          setIsTransitioning(false);
        }, 100);
      }, 450); // 400ms Transition + 50ms Buffer für komplettes Fade-Out
    }, holdDuration);

    return () => clearTimeout(timer);
  }, [current, items.length, isLoading, isVisible, isTransitioning]);

  // Preload-Effekt für bessere Performance
  useEffect(() => {
    if (items.length === 0) return;
    
    const preloadImages: HTMLImageElement[] = [];
    items.forEach((item) => {
      if (item.image_url && !item.image_url.match(/\.(mp4|webm|ogg)$/i)) {
        const img = new window.Image();
        img.src = item.image_url;
        preloadImages.push(img);
      }
    });
    
    return () => {
      preloadImages.length = 0;
    };
  }, [items.map(item => item.image_url).join(',')]); // Stabilere Dependency

  if (error) {
    return (
      <Director direction="v 2 2" style={promoterStyles.core}>
        <Text as="p" align={2}>Fehler beim Laden: {error}</Text>
      </Director>
    );
  }

  if (items.length === 0) {
    return (
      <Director direction="v 2 2" style={promoterStyles.core}>
        {!isLoading && <Text as="p" align={2}>Keine Inhalte verfügbar</Text>}
      </Director>
    );
  }

  const currentItem = items[current];
  
  // Saubere Transition-Kontrolle - nur EIN Bild zur Zeit sichtbar
  const shouldShowMedia = isVisible && !isTransitioning && currentItem;
  
  const mediaStyle = {
    ...promoterStyles.media,
    ...(shouldShowMedia ? promoterStyles.mediaVisible : promoterStyles.mediaHidden),
  };

  const headlineStyle = {
    ...promoterStyles.headlineFade,
    ...(shouldShowMedia ? promoterStyles.headlineFadeVisible : promoterStyles.headlineFadeHidden),
  };

  return (
    <Director direction="v 2 2" style={promoterStyles.core}>
      {/* Background Media */}
      <Media
        src={currentItem.image_url}
        alt={currentItem.title || 'Promoter Slide'}
        aspectRatio="16:9"
        style={mediaStyle}
        priority
        sizes="100vw"
      />
      
      {/* Content Overlay */}
      <Director 
        direction="v 3 3" 
        heightFull 
        paddingY 
        widthMax={2} 
        paddingX 
        style={promoterStyles.verbal}
      >
        <Unit
          second={{
            widthMax: 3,
            gapY: true,
            style: { paddingBottom: 'var(--hgt_header)' }
          }}
        >
          <Director direction="v 3 2" gapY style={headlineStyle}>
            <Text as="h2" align={2} style={{ color: 'var(--clrL_a)' }}>
              {currentItem.title || ''}
            </Text>
            {currentItem.subtitle && (
              <Text as="h3" align={2} fontLarge style={{ color: 'var(--clrL_a)' }}>
                {currentItem.subtitle}
              </Text>
            )}
            <Button 
              href={`/${currentItem.tableName}/${currentItem.id}`}
              text="Mehr erfahren"
              style={{ color: 'var(--clrL_a)' }}
            />
          </Director>
        </Unit>
      </Director>
    </Director>
  );
} 