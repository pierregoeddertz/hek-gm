"use client";

import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';

function getTimeString() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function Footer() {
  const [time, setTime] = useState(getTimeString());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.root}>
      <div className={styles.ctaSection}>
        <div className={styles.ctaText}>
          <span className={styles.ctaSub}>Interested in working with us?</span>
          <span className={styles.ctaMain}>Get in touch</span>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.col}>
          <div className={styles.label}>SITEMAP</div>
          <a href="/work">Work</a>
          <a href="/about">About</a>
          <a href="/news">News</a>
          <a href="/careers">Careers</a>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>LOCATION</div>
          <div>London, UK</div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>SOCIALS</div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">X.com</a>
          <a href="https://threads.net" target="_blank" rel="noopener noreferrer">Threads</a>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <span>&copy; Luca {new Date().getFullYear()}</span>
        <a href="/terms">Terms &amp; Conditions</a>
        <span>Made by ena, Images by Arqé</span>
      </div>
    </footer>
  );
} 