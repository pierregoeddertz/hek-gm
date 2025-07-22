'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Media from './Media';
import Director from './Director';
import Text from './Text';
import { supabase } from '../lib/supabase';

interface CardProps {
  href: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  tableName?: string;
  recordId?: string;
  createdAt?: string;
  showDate?: boolean;
  onError?: (error: unknown) => void;
}

export default function Card({
  href,
  title,
  imageSrc,
  imageAlt,
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
    if (tableName && recordId) {
      try {
        await supabase.rpc('increment_view_count', {
          row_id: recordId,
          table_name: tableName,
        });
      } catch (err) {
        console.error('Error incrementing view count', err);
        onError?.(err);
      }
    }
  }, [tableName, recordId, onError]);

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
        <Director direction="v 1 1" gapY style={{ width: 'var(--max_w_4)' }}>
          {showDate && formattedTime && formattedDate && (
            <Director direction="h 1 1" gapX style={{ marginBottom: '-0.666rem' }}>
              <Text as="time" dateTime={createdAt}>
                {formattedTime}
              </Text>
              <Text as="time" dateTime={createdAt}>
                {formattedDate}
              </Text>
            </Director>
          )}
          <Text as="h2" fontMid>{title}</Text>
          <Media src={imageSrc} alt={imageAlt} />
        </Director>
    </Link>
  );
}
