'use client';

import Image from 'next/image';
import styles from './Card.module.css';

export type CardProps = {
  /** Article headline */
  title: string;
  /** Time string e.g. "12:00" */
  time: string;
  /** Date string e.g. "05.05.2025" */
  date: string;
  /** Image URL */
  image: string;
  /** Aspect ratio in the form "w:h" (supported: 1:1, 4:5, 9:16, 16:9) */
  aspectRatio?: '9:16' | '16:9' | '4:5' | '1:1';
  className?: string;
  onClick?: () => void;
};

const aspectRatioToNumber = {
  '9:16': 9 / 16,
  '16:9': 16 / 9,
  '4:5': 4 / 5,
  '1:1': 1,
};

export default function Card({ image, aspectRatio = '16:9', title, time, date, className = '', ...props }: CardProps) {
  const ratio = aspectRatioToNumber[aspectRatio] || aspectRatioToNumber['16:9'];
  const width = 300;
  const height = Math.round(width / ratio);

  return (
    <div className={`${styles.root} ${className}`.trim()} style={{ width }}>
      <div className={styles.meta}>
        <span>{time}</span>
        <span aria-hidden="true">|</span>
        <span>{date}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.imageWrapper} style={{ width: '100%', height }}>
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
      </div>
    </div>
  );
} 