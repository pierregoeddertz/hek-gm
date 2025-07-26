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
  filterMode?: 'promoted' | 'position'; // Default: 'promoted'
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

const chevronBtnStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  transition: 'opacity 0.2s',
  cursor: 'pointer',
  willChange: 'opacity',
};

export default function Promoter({ tableName, filterMode = 'promoted' }: PromoterProps) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [items, setItems] = useState<PromoterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const tableNames = Array.isArray(tableName) ? tableName : [tableName];
      const allItems: PromoterItem[] = [];

      for (const table of tableNames) {
        let query = supabase.from(table).select('*');
        if (filterMode === 'position' && table === 'smartflower') {
          query = query.eq('position', 'Promoter');
        } else if (filterMode === 'promoted') {
          query = query.eq('promoted', true);
        }
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        
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
  }, [tableName, filterMode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (items.length > 0) {
      setIsVisible(true); // Sofort sichtbar!
    }
  }, [items.length]);

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
    const preloadImages: HTMLImageElement[] = [];
    
    items.forEach(item => {
      if (item.image_url) {
        const img = new Image();
        img.src = item.image_url;
        preloadImages.push(img);
      }
    });
    
    return () => {
      preloadImages.length = 0;
    };
  }, [items]); // Simplified dependency array

  return (
    <Director direction="v 2 2" style={promoterStyles.core}>
      {error && (
        <Text as="p" align={2}>Fehler beim Laden: {error}</Text>
      )}
      {!isLoading && items.length === 0 && (
        <Text as="p" align={2}>Keine Inhalte verfügbar</Text>
      )}
      {!isLoading && items.length > 0 && (() => {
        const currentItem = items[current];
        if (!currentItem) return null;
        const shouldShowMedia = isVisible && !isTransitioning && currentItem;
        const mediaStyle = {
          ...promoterStyles.media,
          ...(shouldShowMedia ? promoterStyles.mediaVisible : promoterStyles.mediaHidden),
        };
        const headlineStyle = {
          ...promoterStyles.headlineFade,
          ...(shouldShowMedia ? promoterStyles.headlineFadeVisible : promoterStyles.headlineFadeHidden),
        };
        return <>
          {/* Background Media */}
          <Media
            src={currentItem.image_url}
            alt={currentItem.title || 'Promoter Slide'}
            style={{ ...mediaStyle, height: '100%' }}
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
                {/* Headline mit Chevrons */}
                <Director direction="h 2 2" gapX style={{ alignItems: 'center', justifyContent: 'center', width: '100%', gap: '0.33rem', display: 'flex' }}>
                  {/* Left Chevron */}
                  {items.length > 1 && (
                    <button
                      aria-label="Vorheriger Slide"
                      onClick={() => {
                        if (!isTransitioning) {
                          setIsTransitioning(true);
                          setIsVisible(false);
                          setTimeout(() => {
                            setCurrent((prev) => (prev - 1 + items.length) % items.length);
                            setTimeout(() => {
                              setIsVisible(true);
                              setIsTransitioning(false);
                            }, 100);
                          }, 450);
                        }
                      }}
                      disabled={isTransitioning}
                      onMouseEnter={() => setLeftHover(true)}
                      onMouseLeave={() => setLeftHover(false)}
                      onFocus={() => setLeftHover(true)}
                      onBlur={() => setLeftHover(false)}
                      style={{ ...chevronBtnStyle, cursor: !isTransitioning ? 'pointer' : 'default', marginTop: '0.0625rem', opacity: isTransitioning ? 0.5 : (leftHover ? 1 : 0.33) }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="13,5 7,10 13,15" stroke="var(--clrL_a)" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" fill="none" />
                      </svg>
                    </button>
                  )}
                  {/* Headline */}
                  <Text as="h2" align={2} style={{ color: 'var(--clrL_a)', display: 'flex', alignItems: 'center' }}>
                    {currentItem.title || ''}
                  </Text>
                  {/* Right Chevron */}
                  {items.length > 1 && (
                    <button
                      aria-label="Nächster Slide"
                      onClick={() => {
                        if (!isTransitioning) {
                          setIsTransitioning(true);
                          setIsVisible(false);
                          setTimeout(() => {
                            setCurrent((prev) => (prev + 1) % items.length);
                            setTimeout(() => {
                              setIsVisible(true);
                              setIsTransitioning(false);
                            }, 100);
                          }, 450);
                        }
                      }}
                      disabled={isTransitioning}
                      onMouseEnter={() => setRightHover(true)}
                      onMouseLeave={() => setRightHover(false)}
                      onFocus={() => setRightHover(true)}
                      onBlur={() => setRightHover(false)}
                      style={{ ...chevronBtnStyle, cursor: !isTransitioning ? 'pointer' : 'default', marginTop: '0.0625rem', opacity: isTransitioning ? 0.5 : (rightHover ? 1 : 0.33) }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="7,5 13,10 7,15" stroke="var(--clrL_a)" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" fill="none" />
                      </svg>
                    </button>
                  )}
                </Director>
                {/* Subheadline darunter */}
                {currentItem.subtitle && (
                  <Text as="h3" align={2} fontLarge style={{ marginTop: '-.33rem', color: 'var(--clrL_a)' }}>
                    {currentItem.subtitle}
                  </Text>
                )}
                {current === 0 && currentItem.tableName === 'smartflower' ? (
                  <Button 
                    href="mailto:smartflower@hek-gm.de"
                    text="Jetzt anfragen"
                    underline={true}
                    aria-label="Kontakt"
                    style={{ color: 'var(--clrL_a)' }}
                  />
                ) : currentItem.tableName === 'smartflower' ? (
                  <Button 
                    href="/smartflower"
                    text="Mehr erfahren"
                    underline={true}
                    style={{ color: 'var(--clrL_a)' }}
                  />
                ) : currentItem.tableName === 'hek' ? (
                  // Für HEK-Artikel: Verwende die neuen Routen basierend auf der Position
                  <Button 
                    href={current === 0 ? "/heizung" : current === 1 ? "/elektronik" : "/klima"}
                    text="Mehr erfahren"
                    underline={true}
                    style={{ color: 'var(--clrL_a)' }}
                  />
                ) : (
                  <Button 
                    href={`/${currentItem.tableName}/${currentItem.id}`}
                    text="Mehr erfahren"
                    underline={true}
                    style={{ color: 'var(--clrL_a)' }}
                  />
                )}
              </Director>
            </Unit>
          </Director>
        </>;
      })()}
      {/* Während des Ladens bleibt der Bereich leer, aber das Grundlayout ist da */}
    </Director>
  );
} 