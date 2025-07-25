'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Media from './Media';
import Director from './Director';
import Text from './Text';
import HList from './HList';
import { supabase } from '../lib/supabase';

interface CardProps {
  href: string;
  title: string;
  subtitle?: string | null;
  imageSrc: string;
  imageAlt: string;
  aspectRatio?: '9:16' | '16:9' | '4:5' | '1:1';
  tableName?: string;
  recordId?: string;
  createdAt?: string;
  showDate?: boolean;
  onError?: (error: unknown) => void;
}

export default function Card({
  href,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  aspectRatio,
  tableName,
  recordId,
  createdAt,
  showDate = true,
  onError,
}: CardProps) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleClick = useCallback(async () => {
    // entfernt: view count logic
  }, []);

  const formattedTime = useMemo(
    () =>
      createdAt
        ? new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' }).format(
            new Date(createdAt)
          )
        : null,
    [createdAt]
  );

  const formattedDate = useMemo(
    () =>
      createdAt
        ? new Intl.DateTimeFormat('de-DE').format(new Date(createdAt))
        : null,
    [createdAt]
  );

  return (
    <Link href={href} passHref onClick={handleClick}>
        <Director 
          direction="v 1 1" 
          gapY 
          style={{ 
            width: 'var(--max_w_4)',
            transition: 'transform 0.2s ease-in-out',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Director direction="v 1 1" gapY style={{ paddingLeft: '.75rem', paddingRight: '.75rem' }}>
            {showDate && formattedTime && formattedDate && (
              <HList 
                items={[
                  <Text key="time" as="time" dateTime={createdAt}>{formattedTime}</Text>,
                  <Text key="date" as="time" dateTime={createdAt}>{formattedDate}</Text>
                ]} 
              />
            )}
            <Text as="h2" fontMid>{title}</Text>
          </Director>
          <Media src={imageSrc} alt={imageAlt} aspectRatio={aspectRatio} style={{ height: '100%' }} />
        </Director>
    </Link>
  );
}
