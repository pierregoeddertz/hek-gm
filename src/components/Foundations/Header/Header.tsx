"use client";

import React, { useEffect, useRef } from 'react';
import styles from './Header.module.css';
import Director from '@/components/Layout/Director';
import Button from '@/components/Foundations/Button/Button';

export type HeaderProps = {
  right?: React.ReactNode | null;
};

export default function Header({ right }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    function updateHeaderColor() {
      const header = headerRef.current;
      if (!header) return;
      const units = Array.from(document.querySelectorAll('section[data-clr]')) as HTMLElement[];
      const headerRect = header.getBoundingClientRect();
      const switchLine = headerRect.top + headerRect.height / 2;
      let unit: HTMLElement | undefined;
      if (window.scrollY === 0 && units.length > 0) {
        unit = units[0];
      } else {
        unit = units.find(u => {
          const rect = u.getBoundingClientRect();
          return rect.top <= switchLine && rect.bottom > switchLine;
        });
      }
      header.classList.remove(styles['header--clrl'], styles['header--clrd']);
      let sepColor = 'var(--clr_m)';
      if (unit) {
        const clr = unit.getAttribute('data-clr');
        if (clr === 'clrl') {
          header.classList.add(styles['header--clrl']);
          sepColor = 'var(--clrl_m)';
        }
        if (clr === 'clrd') {
          header.classList.add(styles['header--clrd']);
          sepColor = 'var(--clrd_m)';
        }
      }
      // Setze die Separator-Farbe direkt per style
      if (lineRef.current) {
        lineRef.current.style.stroke = sepColor;
      }
    }
    updateHeaderColor();
    window.addEventListener('scroll', updateHeaderColor, { passive: true });
    window.addEventListener('resize', updateHeaderColor);
    return () => {
      window.removeEventListener('scroll', updateHeaderColor);
      window.removeEventListener('resize', updateHeaderColor);
    };
  }, []);

  return (
    <Director
      ref={headerRef}
      header
      layout="paddingX paddingY gapY"
      className={styles.root}
    >
      {/* Inline-SVG Seperator */}
      <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '1px' }}>
        <line ref={lineRef} x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--clr_m)" strokeWidth="1" />
      </svg>
      <Director layout="horizontal 2 d">
        <Button text="Button 1" />
        {right === null ? null : right !== undefined ? right : <Button text="Button 2" />}
      </Director>
    </Director>
  );
} 