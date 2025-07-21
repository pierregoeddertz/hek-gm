import React from 'react';

interface TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'time' | 'li';
  fontLarge?: boolean;
  fontMid?: boolean;
  align?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const alignMap = {
  1: 'left',
  2: 'center',
  3: 'right',
} as const;

export default function Text({
  as = 'h2',
  fontLarge = false,
  fontMid = false,
  align = 1,
  children,
  className = '',
  style = {},
}: TextProps) {
  const Tag = as;
  let fontStyle: React.CSSProperties = {};
  if (fontLarge) {
    fontStyle = { fontSize: '2rem', lineHeight: '3rem' };
  } else if (fontMid) {
    fontStyle = { fontSize: '1.125rem' };
  }
  const computedStyle: React.CSSProperties = {
    ...fontStyle,
    textAlign: alignMap[align],
    ...style,
  };
  return (
    <Tag className={className} style={computedStyle}>
      {children}
    </Tag>
  );
} 