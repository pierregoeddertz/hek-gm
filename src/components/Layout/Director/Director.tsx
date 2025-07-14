import React from 'react';
import styles from './Director.module.css';

interface DirectorProps {
  children: React.ReactNode;
  layout?: string; // "div vertical 2 b widthMax paddingX gap" oder "vertical 2 b widthMax paddingX gap"
  as?: React.ElementType;
  className?: string;
}

export default function Director({
  children,
  layout,
  as: Component = 'div',
  className = '',
}: DirectorProps) {
  const parseLayout = (layoutString?: string) => {
    if (!layoutString) return { element: 'div', direction: 'vertical', align: 1, justify: 'a', widthMax: false, paddingX: false, paddingY: false, gap: false };
    
    const parts = layoutString.split(' ');
    
    // Prüfe, ob das erste Element ein HTML-Tag ist (außer section)
    const firstPart = parts[0];
    const isHtmlElement = ['div', 'article', 'aside', 'ul', 'ol', 'li'].includes(firstPart);
    
    const element = isHtmlElement ? firstPart : 'div';
    const startIndex = isHtmlElement ? 1 : 0;
    
    const direction = parts[startIndex] as 'vertical' | 'horizontal';
    const align = parseInt(parts[startIndex + 1]) as 1 | 2 | 3;
    const justify = parts[startIndex + 2] as 'a' | 'b' | 'c';
    
    const widthMax = parts.includes('widthMax');
    const paddingX = parts.includes('paddingX');
    const paddingY = parts.includes('paddingY');
    const gap = parts.includes('gap');
    
    return {
      element,
      direction: direction || 'vertical',
      align: align || 1,
      justify: justify || 'a',
      widthMax,
      paddingX,
      paddingY,
      gap,
    };
  };

  const { element, direction, align, justify, widthMax, paddingX, paddingY, gap } = parseLayout(layout);

  const getFlexClasses = () => {
    const flexDirection = direction === 'vertical' ? styles.vertical : styles.horizontal;
    
    const alignMap: Record<number, string> = {
      1: styles.alignStart,
      2: styles.alignCenter,
      3: styles.alignEnd,
    };
    
    const justifyMap: Record<string, string> = {
      a: styles.justifyStart,
      b: styles.justifyCenter,
      c: styles.justifyEnd,
    };
    
    return `${flexDirection} ${alignMap[align]} ${justifyMap[justify]}`;
  };

  const getContainerClasses = () => {
    const classes = [styles.container];
    
    if (widthMax) classes.push(styles.widthMax);
    if (paddingX) classes.push(styles.paddingX);
    if (paddingY) classes.push(styles.paddingY);
    if (gap) classes.push(styles.gap);
    
    return classes.join(' ');
  };

  const DirectorComponent = element as React.ElementType;

  return (
    <DirectorComponent className={`${getContainerClasses()} ${getFlexClasses()} ${className}`}>
      {children}
    </DirectorComponent>
  );
} 