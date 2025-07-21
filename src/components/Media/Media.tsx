import React from 'react';
import NextImage from 'next/image';
import styles from './Media.module.css';

interface MediaProps {
  src: string;
  alt?: string;
  aspectRatio?: '16:9' | '9:16' | '4:5' | '1:1' | string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  poster?: string;
  title?: string;
}

function getAspectRatioValue(aspectRatio: string = '16:9') {
  switch (aspectRatio) {
    case '9:16': return '9 / 16';
    case '4:5': return '4 / 5';
    case '1:1': return '1 / 1';
    case '16:9':
    default: return '16 / 9';
  }
}

export default function Media({
  src,
  alt = '',
  aspectRatio = '16:9',
  className = '',
  style = {},
  sizes = '100%',
  priority = false,
  poster,
  title,
}: MediaProps) {
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);
  const aspect = getAspectRatioValue(aspectRatio);
  const aspectStyle: React.CSSProperties = { aspectRatio: aspect, ...style };

  if (isVideo) {
    return (
      <video
        src={src}
        className={`${styles.mediaVideo} ${className}`}
        style={aspectStyle}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        title={title || alt}
        poster={poster}
        preload="auto"
      />
    );
  }
  // Next.js Image Optimization
  return (
    <span className={`${styles.media} ${className}`} style={aspectStyle}>
      <NextImage
        src={src}
        alt={alt}
        fill
        className={styles.mediaImage}
        style={{ objectFit: 'cover' }}
        sizes={sizes}
        priority={priority}
        title={title || alt}
      />
    </span>
  );
} 