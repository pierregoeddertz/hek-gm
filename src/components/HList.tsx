'use client';

import React from 'react';
import Director from './Director';
import Text from './Text';

interface HListProps {
  items: React.ReactNode[];
  gap?: string;
  marginBottom?: string;
  alignItems?: string;
  direction?: string;
  style?: React.CSSProperties;
}

export default function HList({ 
  items, 
  gap = '.75rem', 
  marginBottom = '-0.666rem', 
  alignItems = 'center',
  direction = 'h 1 1',
  style,
}: HListProps) {
  if (items.length === 0) return null;

  return (
    <Director 
      direction={direction}
      style={{ 
        gap, 
        marginBottom, 
        alignItems,
        ...style
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index < items.length - 1 && (
            <svg 
              viewBox="0 0 3 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ 
                width: '2px', 
                height: '1rem', 
                transform: 'rotate(20deg)' 
              }}
            >
              <line x1="1.5" y1="0" x2="1.5" y2="20" stroke="var(--clrA_m)" strokeWidth="2"/>
            </svg>
          )}
        </React.Fragment>
      ))}
    </Director>
  );
} 