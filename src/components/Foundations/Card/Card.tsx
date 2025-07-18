'use client';

import styles from './Card.module.css';
import Image from 'next/image';

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

export default function Card({ image, aspectRatio = '16:9', title, time, date, className = '' }: CardProps) {
  const ratio = aspectRatioToNumber[aspectRatio] || aspectRatioToNumber['16:9'];
  const width = 290;
  const height = Math.round(width / ratio);

  return (
    <div className={`${styles.root} ${className}`.trim()} style={{ width }}>
      <div className={styles.meta}>
      <span className="fontSmall">{time}</span>
        <span style={{ color:'var(--clrA_m)', marginLeft:'.33rem', marginRight:'.33rem' }} aria-hidden="true">|</span>
        <span className="fontSmall">{date}</span>
      </div>
      <h2>{title}</h2>
      <div className={styles.imageWrapper} style={{ width: '100%', height, position: 'relative', overflow: 'hidden' }}>
        {/**** Media-Type Detection ****/}
        {/(\.mp4$|\.webm$|\.mov$)/i.test(image) ? (
          <video
            src={image}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
        ) : (
          <Image className={styles.media} alt={title} src={image} width={400} height={225} />
        )}
      </div>
    </div>
  );
} 