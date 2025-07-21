'use client';

import React from 'react';
import Link from 'next/link';
import Media from '../Media';
import Director from '../Director';
import styles from './Card.module.css';
import Text from '../Text';

interface CardProps {
  href: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  aspectRatio?: '9:16' | '16:9' | '1:1' | '4:5';
  className?: string;
  tableName?: string;
  recordId?: string;
  createdAt?: string;
}

export default function Card({ 
  href, 
  title, 
  subtitle, 
  imageSrc, 
  imageAlt, 
  aspectRatio = '16:9',
  className = '',
  tableName,
  recordId,
  createdAt
}: CardProps) {
  const aspectRatioMap = {
    '9:16': styles.aspect916,
    '16:9': styles.aspect169,
    '1:1': styles.aspect11,
    '4:5': styles.aspect45
  };

  const handleClick = async () => {
    if (tableName && recordId) {
      try {
        console.log(`Card clicked: ${tableName} record ${recordId}`);
        // Dynamisch supabase importieren um Bundle-Größe klein zu halten
        const { supabase } = await import('../../lib/supabase');
        // Beispiel: Klicks erhöhen (optional)
        // await supabase.rpc('increment_view_count', { row_id: recordId, table_name: tableName });
      } catch (error) {
        console.error('Error updating record:', error);
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <Director 
        direction="v 1 1"
        className={`${styles.card} ${aspectRatioMap[aspectRatio]} ${className}`.trim()}
        gapY={true}>
        
        {createdAt && (
          
          <Director direction="h 1 2" gapX={true}>
            <Text as="time" align={1}>
              {new Date(createdAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text as="time" align={1}>
              {new Date(createdAt).toLocaleDateString('de-DE')}
            </Text>
          </Director>
        
        )}
        <Text as="h2" align={1}>{title}</Text>
        <Media
          src={imageSrc}
          alt={imageAlt}
          aspectRatio={aspectRatio}
        />
      </Director>
    </Link>
  );
} 