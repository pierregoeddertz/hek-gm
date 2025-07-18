"use client";

import Director from '@/components/Layout/Director';
import Button from '@/components/Foundations/Button/Button';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <Director
      as="footer"
      identity="vertical 1 a paddingX paddingY gapY paddingHeader"
      className={styles.root}
    >
      {/* SVG Linie wie im Header */}
      <svg
        width="100%"
        height="1"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '1px' }}
        className={styles.line}
      >
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--clrA_m)" strokeWidth="1" />
      </svg>
      <Director identity="horizontal 2 d gapX" className={styles.topRow}>
        <Director identity="vertical 1 a">
          <h2 className={styles.brand}>HEK</h2>
        </Director>
        <Director identity="horizontal 1 a gapX" className={styles.navColumns}>
          <Director identity="vertical 1 a gapY" className={styles.col}>
            <span className={styles.colTitle}>Geschäft</span>
            <Button text="Die Firma" href="/" />
            <Button text="News" href="/news" />
            <Button text="Smartflower" href="/smartflower" />
          </Director>
          <Director identity="vertical 1 a gapY" className={styles.col}>
            <span className={styles.colTitle}>Rechtliches</span>
            <Button text="Datenschutz" href="/datenschutz"  />
            <Button text="Impressum" href="/impressum"  />
          </Director>
        </Director>
      </Director>
      <Director identity="horizontal 1 a" className={styles.bottomRow}>
        <span className={styles.copyright}>
          ©{new Date().getFullYear()} HEK Gebäudemanagement GmbH
        </span>
      </Director>
    </Director>
  );
} 