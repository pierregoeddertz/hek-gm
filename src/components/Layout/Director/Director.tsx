import React, { forwardRef } from 'react';
import styles from './Director.module.css';

interface DirectorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  layout?: string; // "div vertical 2 b widthMax paddingX gap" oder "vertical 2 b widthMax paddingX gap"
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}

const Director = forwardRef<HTMLDivElement, DirectorProps>(
  ({
    children,
    layout,
    className = '',
    style,
    as,
    ...rest
  }, ref) => {
    const parseLayout = (layoutString?: string) => {
      if (!layoutString || !layoutString.trim()) return { element: 'div', direction: 'vertical', align: 1, justify: 'b', widthMax: false, paddingX: false, paddingY: false, gap: false, heightMin: false };
      const parts = layoutString.trim().split(/\s+/);
      const isHtmlElement = ['div', 'article', 'aside', 'ul', 'ol', 'li'].includes(parts[0]);
      const element = isHtmlElement ? parts[0] : 'div';
      const tokens = isHtmlElement ? parts.slice(1) : parts;

      // Direction
      const direction: 'vertical' | 'horizontal' = tokens.includes('horizontal') ? 'horizontal' : 'vertical';
      // Align
      const align: 1 | 2 | 3 = (tokens.find((t) => ['1', '2', '3'].includes(t)) as unknown as 1 | 2 | 3) || 1;
      // Justify
      const justify: 'a' | 'b' | 'c' = (tokens.find((t) => ['a', 'b', 'c'].includes(t)) as 'a' | 'b' | 'c') || 'b';
      const widthMax = tokens.includes('widthMax');
      const paddingX = tokens.includes('paddingX');
      const paddingY = tokens.includes('paddingY');
      const gap = tokens.includes('gap');
      const heightMin = tokens.includes('heightMin');
      return { element, direction, align, justify, widthMax, paddingX, paddingY, gap, heightMin };
    };

    const { element, direction, align, justify, widthMax, paddingX, paddingY, gap, heightMin } = parseLayout(layout);

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
      if (heightMin) classes.push(styles.heightMin);
      return classes.join(' ');
    };

    const DirectorComponent = as || element;

    return (
      <DirectorComponent
        className={`${getContainerClasses()} ${getFlexClasses()} ${className}`}
        style={style}
        ref={ref}
        {...rest}
      >
        {children}
      </DirectorComponent>
    );
  }
);

Director.displayName = 'Director';

export default Director; 