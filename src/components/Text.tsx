import React from 'react';

interface TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'time' | 'li';
  fontLarge?: boolean;
  fontMid?: boolean;
  align?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dateTime?: string;
  id?: string; 
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
  dateTime,
  id,
}: TextProps) {
  const Tag = as;
  let fontStyle: React.CSSProperties = {};
  // if (fontLarge) {
  //   fontStyle = { fontSize: '2rem', lineHeight: '3rem' };
  // } else if (fontMid) {
  //   fontStyle = { fontSize: '1.125rem' };
  // }

  const computedStyle: React.CSSProperties = {
    // ...fontStyle, // entfernt, damit nur noch CSS-Klassen greifen
    textAlign: alignMap[align],
    ...style,
  };

  // Zusätzliche Props für spezifische Elemente
  const additionalProps: Record<string, unknown> = {};
  if (as === 'time' && dateTime) {
    additionalProps.dateTime = dateTime;
  }
  if (id) {
    additionalProps.id = id;
  }

  return (
    <Tag
      className={[
        className,
        fontLarge ? 'fontLarge' : '',
        fontMid ? 'fontMid' : '',
        align ? `align${align}` : '',
      ].filter(Boolean).join(' ')}
      style={computedStyle}
      {...additionalProps}
    >
      {children}
    </Tag>
  );
} 