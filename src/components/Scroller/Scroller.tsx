"use client";

import { useState, useEffect } from 'react';
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

// Category order as specified
const CATEGORY_ORDER = [
  'Mess-, Steuerungs-, Regelungs- & Elektrotechnik',
  'Kälte-, Klima- & Lüftungstechnik', 
  'TGA-Planung & Projektleitung'
] as const;

export default function Scroller({ accordionData }: ScrollerProps) {
  const [openStates, setOpenStates] = useState<boolean[]>(Array(accordionData.length).fill(false));
  const [items, setItems] = useState<ReferenzenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  // Preload images function
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  };

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
          setItems(data);
          
          // Preload all images
          const imageUrls = data
            .filter(item => item.image_url)
            .map(item => item.image_url!);
          
          // Preload images in parallel
          Promise.allSettled(
            imageUrls.map(url => preloadImage(url))
          ).then(() => {
            console.log('All images preloaded');
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadReferenzen();
  }, []);

  // Group items by category
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ReferenzenItem[]>);

  // Create a flat array of all items for hover indexing
  const allItems = CATEGORY_ORDER.flatMap(category => itemsByCategory[category] || []);

  // Set initial hovered index to first item if available
  useEffect(() => {
    if (allItems.length > 0 && hoveredIndex === null) {
      setHoveredIndex(0);
    }
  }, [allItems.length, hoveredIndex]);

  // Handle accordion toggle - only one can be open at a time
  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

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
  } else if (allItems.length === 0 || hoveredIndex === null) {
    content = null; // Or show a placeholder if desired
  } else {
    const data = allItems[hoveredIndex];
    if (data.image_url) {
      const isVideo = /\.(mp4|webm|mov)$/i.test(data.image_url);
      content = isVideo ? (
        <video
          className={styles.media}
          src={data.image_url}
          autoPlay
          loop
          muted
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.33 }}
          draggable={false}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.media}
          src={data.image_url}
          alt={`Referenz ${data.name}`}
          draggable={false}
          style={{ opacity: 0.33 }}
        />
      );
    }
  }

  return (
    <Director direction="v 2 1" colorDom className={styles.core} >
      {/* Sticky Hintergrundbild */}
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
        {content}
      </div>
      <Director style={{ marginTop: '-100vh' }}>
        <Unit second={{ spacingT: true, spacingB: true, widthMax: 1, style: { position: 'relative', zIndex: 1 }, className: styles.whiteText }}>
          {accordionData[0] && (
            <Accordion
              title={accordionData[0].title}
              subtitle={accordionData[0].subtitle}
              open={openStates[0]}
              onClick={() => setOpenStates(states => {
                const copy = [...states];
                copy[0] = !copy[0];
                return copy;
              })}
              armProps={{ vectorColor: 'var(--clrD_m)' }}
            >
              {accordionData[0].content}
            </Accordion>
          )}
        </Unit>
        <Unit second={{ spacingT: true, spacingB: true, widthMax: 1, style: { gap: '3rem', position: 'relative', zIndex: 1 }, className: styles.whiteText }}>
          {CATEGORY_ORDER.map((category, categoryIndex) => {
            const categoryItems = itemsByCategory[category] || [];
            if (categoryItems.length === 0) return null;

            // Calculate starting index for this category
            const startIndex = CATEGORY_ORDER.slice(0, categoryIndex).reduce((sum, cat) => sum + (itemsByCategory[cat]?.length || 0), 0);

            return (
              <Director key={category} as="ol" direction="v 2 1" spacingT style={{ 
                listStyle: 'none',
                marginBottom: categoryIndex === CATEGORY_ORDER.length - 1 ? '3rem' : '0'
              }}>
                <Text style={{ marginBottom: '.5rem' }} as="h4">{category}</Text>
                {categoryItems.map((item, itemIndex) => {
                  const globalIndex = startIndex + itemIndex;
                  const isOpen = openAccordionIndex === globalIndex;
                  
                  return (
                    <li 
                      key={item.id}
                      style={{ 
                        listStyle: 'none'
                      }}
                    >
                      <Accordion
                        title={item.name}
                        open={isOpen}
                        onClick={() => handleAccordionToggle(globalIndex)}
                        variant="list"
                        content={item.content || undefined}
                        onMouseEnter={() => setHoveredIndex(globalIndex)}
                        isHovered={hoveredIndex === globalIndex}
                      />
                    </li>
                  );
                })}
              </Director>
            );
          })}
        </Unit>
    </Director>
    </Director>
  );
}