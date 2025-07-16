import React, { forwardRef } from 'react';
import styles from './Director.module.css';

interface DirectorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  layout?: string; // "div vertical 2 b widthMax paddingX gap" oder "vertical 2 b widthMax paddingX gap"
  as?: React.ElementType;
  className?: string;
  gapX?: boolean;
  gapY?: boolean;
  [key: string]: any;
}

const htmlElements = ['header', 'footer', 'article', 'section', 'nav', 'main', 'aside', 'ul', 'ol', 'li'];

const Director = forwardRef<HTMLDivElement, DirectorProps>(
  ({
    children,
    layout,
    className = '',
    style,
    as,
    ...rest
  }, ref) => {
    // Erkenne semantisches HTML-Element über gleichnamiges Prop
    let semanticElement: string | undefined = undefined;
    const restAny = rest as any;
    for (const el of htmlElements) {
      if (restAny[el]) {
        semanticElement = el;
        delete restAny[el];
        break;
      }
    }
    const DirectorComponent = as || semanticElement || 'div';

    const parseLayout = (layoutString?: string) => {
      if (!layoutString || !layoutString.trim()) return { direction: 'vertical', align: 1, justify: 'b', widthMax: false, paddingX: false, paddingY: false, gapX: false, gapY: false, heightMin: false };
      const parts = layoutString.trim().split(/\s+/);
      // Direction
      const direction: 'vertical' | 'horizontal' = parts.includes('horizontal') ? 'horizontal' : 'vertical';
      // Align
      const align: 1 | 2 | 3 = (parts.find((t) => ['1', '2', '3'].includes(t)) as unknown as 1 | 2 | 3) || 1;
      // Justify
      const justify: 'a' | 'b' | 'c' | 'd' = (parts.find((t) => ['a', 'b', 'c', 'd'].includes(t)) as 'a' | 'b' | 'c' | 'd') || 'b';
      const widthMax = parts.includes('widthMax');
      const paddingX = parts.includes('paddingX');
      const paddingY = parts.includes('paddingY');
      const gapX = parts.includes('gapX');
      const gapY = parts.includes('gapY');
      const heightMin = parts.includes('heightMin');
      return { direction, align, justify, widthMax, paddingX, paddingY, gapX, gapY, heightMin };
    };

    const { direction, align, justify, widthMax, paddingX, paddingY, gapX, gapY, heightMin } = parseLayout(layout);

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
        d: styles.justifySpaceBetween,
      };
      return `${flexDirection} ${alignMap[align]} ${justifyMap[justify]}`;
    };

    const getContainerClasses = () => {
      const classes = [styles.container];
      if (widthMax) classes.push(styles.widthMax);
      if (paddingX) classes.push(styles.paddingX);
      if (paddingY) classes.push(styles.paddingY);
      if (gapX) classes.push(styles.gapX);
      if (gapY) classes.push(styles.gapY);
      if (heightMin) classes.push(styles.heightMin);
      return classes.join(' ');
    };

    // Entferne Layout-Props und gapX/gapY aus rest
    const layoutProps = ['widthMax', 'paddingX', 'paddingY', 'gapX', 'gapY', 'heightMin'];
    layoutProps.forEach((prop) => {
      if (prop in restAny) {
        delete restAny[prop];
      }
    });

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

export default Director;