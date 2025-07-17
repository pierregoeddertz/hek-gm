"use client";

import Director from '@/components/Layout/Director';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <Director identity="paddingX paddingY heightMin colorD" className={styles.root}>
      <span>© {new Date().getFullYear()} HEK GM</span>
    </Director>
  );
} 