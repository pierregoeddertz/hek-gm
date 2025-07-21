'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Header.module.css';
import Director from '../Director';
import Button from '../Button';
import HeaderPanel from './HeaderPanel';

export type HeaderProps = {
  right?: React.ReactNode | null;
  className?: string;
};

export default function Header({ right: _, className = '' }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  // Setze die Header-Höhe als CSS-Variable --hgt_header
  const updateHeaderHeight = useCallback(() => {
    const header = headerRef.current;
    if (header) {
      const height = header.offsetHeight;
      const extra = height * 0.12;
      document.documentElement.style.setProperty('--hgt_header', `${height + extra}px`);
    }
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    // ResizeObserver für dynamische Änderungen
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, [updateHeaderHeight]);

  return (
    <>
      <Director
        ref={headerRef}
        className={`${styles.core} header ${className}`.trim()}
        direction="v 1 2"
        paddingX
        paddingY
        gapY
      >
        <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '1px' }}>
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--clrA_m)" strokeWidth="1" />
        </svg>
        <Director direction="h 2 4" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button text="Menü" onClick={() => setPanelOpen(true)} />
          <Button text="Kontakt" onClick={() => {/* Kontakt-Panel öffnen, Logik ggf. später */}} />
        </Director>
      </Director>
      <HeaderPanel open={panelOpen} onClose={() => setPanelOpen(false)}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem', padding: '2rem' }}>
          <Button text="Home" href="/" onClick={() => setPanelOpen(false)} />
          <Button text="News" href="/news" onClick={() => setPanelOpen(false)} />
          <Button text="Smartflower" href="/smartflower" onClick={() => setPanelOpen(false)} />
          <Button text="Impressum" href="/imprint" onClick={() => setPanelOpen(false)} />
          <Button text="Datenschutz" href="/privacy-policy" onClick={() => setPanelOpen(false)} />
        </nav>
      </HeaderPanel>
    </>
  );
} 