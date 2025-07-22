'use client';

import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import NextImage from 'next/image';

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

const mediaStyles = {
  media: {
    display: 'block' as const,
    width: '100%',
    position: 'relative' as const,
  },
  mediaImage: {
    objectFit: 'cover' as const,
    aspectRatio: '16/9',
  },
  mediaVideo: {
    objectFit: 'cover' as const,
    aspectRatio: '16/9',
  },
};

function getAspectRatioValue(aspectRatio: string = '16:9') {
  const aspectRatios: { [key: string]: string } = {
    '9:16': '9 / 16',
    '4:5': '4 / 5',
    '1:1': '1 / 1',
    '16:9': '16 / 9',
  };

  return aspectRatios[aspectRatio] || '16 / 9';
}

const Media = memo(({
  src,
  alt = '',
  aspectRatio = '16:9',
  className = '',
  style = {},
  sizes = '100%',
  priority = false,
  poster,
  title,
}: MediaProps) => {
  const [hasError, setHasError] = useState(false);
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);
  const aspect = getAspectRatioValue(aspectRatio);
  const aspectStyle: React.CSSProperties = { aspectRatio: aspect, ...style };

  const handleError = () => {
    setHasError(true);
  };

  const mediaStyle: React.CSSProperties = hasError
    ? { ...aspectStyle, backgroundColor: 'var(--clrA_m)' }
    : aspectStyle;

  if (isVideo) {
    const videoStyle = {
      ...mediaStyles.mediaVideo,
      ...mediaStyle,
    };

    return (
      <video
        src={src}
        className={className}
        style={videoStyle}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        title={title || alt}
        poster={poster}
        preload="auto"
        aria-hidden={true}
        onError={handleError} 
      />
    );
  }

  const spanStyle = {
    ...mediaStyles.media,
    ...mediaStyle,
  };

  const imageStyle = {
    ...mediaStyles.mediaImage,
    objectFit: 'cover' as const,
  };

  return (
    <span className={className} style={spanStyle}>
      <NextImage
        src={src}
        alt={alt}
        fill
        style={imageStyle}
        sizes={sizes}
        priority={priority}
        title={title || alt}
        loading={priority ? undefined : "lazy"}
        onError={handleError} 
      />
    </span>
  );
});

Media.displayName = 'Media';

export default Media;
