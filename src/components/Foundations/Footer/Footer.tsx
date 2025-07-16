"use client";

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <span>© {new Date().getFullYear()} HEK GM</span>
      </div>
    </footer>
  );
} 