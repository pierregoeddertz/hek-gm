"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';
import styles from './Header.module.css';
import Director from '@/components/Layout/Director';
import Button from '@/components/Foundations/Button/Button';

export type HeaderProps = {
  right?: React.ReactNode | null;
};

export default function Header({ right }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [colorContext, setColorContext] = useState<'colorD' | 'colorL' | undefined>(undefined);
  const [colorReverse, setColorReverse] = useState(false);

  const updateHeaderHeight = useCallback(() => {
    const header = headerRef.current;
    if (header) {
      const height = header.offsetHeight;
      document.documentElement.style.setProperty('--hgt_header', `${height}px`);
    }
  }, []);

  const updateColorContext = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    const units = Array.from(document.querySelectorAll('[data-color]')) as HTMLElement[];
    const headerRect = header.getBoundingClientRect();
    const switchLine = headerRect.top + headerRect.height / 2;
    const unit = (window.scrollY === 0 && units.length > 0)
      ? units[0]
      : units.find(u => {
          const rect = u.getBoundingClientRect();
          return rect.top <= switchLine && rect.bottom > switchLine;
        });
    let ctx: 'colorD' | 'colorL' | undefined = undefined;
    if (unit) {
      const bg = unit.getAttribute('data-color');
      if (bg === 'colorL') ctx = 'colorL';
      if (bg === 'colorD') ctx = 'colorD';
    }
    setColorContext(ctx);
  }, []);

  const updateColorReverse = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    const units = Array.from(document.querySelectorAll('[data-colorreverse]')) as HTMLElement[];
    const headerRect = header.getBoundingClientRect();
    const switchLine = headerRect.top + headerRect.height / 2;
    const unit = units.find(u => {
      const rect = u.getBoundingClientRect();
      return rect.top <= switchLine && rect.bottom > switchLine;
    });
    setColorReverse(!!unit);
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    updateColorContext();
    updateColorReverse();
    
    window.addEventListener('scroll', updateColorContext, { passive: true });
    window.addEventListener('resize', updateColorContext);
    window.addEventListener('scroll', updateColorReverse, { passive: true });
    window.addEventListener('resize', updateColorReverse);
    window.addEventListener('resize', updateHeaderHeight);
    
    // ResizeObserver für präzise Höhenänderungen
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });
    
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }
    
    return () => {
      window.removeEventListener('scroll', updateColorContext);
      window.removeEventListener('resize', updateColorContext);
      window.removeEventListener('scroll', updateColorReverse);
      window.removeEventListener('resize', updateColorReverse);
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, [updateColorContext, updateColorReverse, updateHeaderHeight]);

  return (
    <Director
      ref={headerRef}
      identity="paddingX paddingY gapY"
      className={`${styles.core} header`}
      data-applycolorreverse={colorReverse || undefined}
    >
      <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '1px' }}>
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke={colorContext ? 'var(--clrA_m)' : 'var(--clrA_m)'} strokeWidth="1" />
      </svg>
      <Director identity="horizontal 2 d">
        <Button text="Button 1" />
        {right === null ? null : right !== undefined ? right : <Button text="Button 2" />}
      </Director>
    </Director>
  );
} 