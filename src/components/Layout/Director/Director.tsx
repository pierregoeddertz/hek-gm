import React, { forwardRef } from 'react';
import styles from './Director.module.css';

interface DirectorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  layout?: string; // "div vertical 2 b widthMax paddingX gap" oder "vertical 2 b widthMax paddingX gap"
  as?: React.ElementType;
  className?: string;
  gapX?: boolean;
  gapY?: boolean;
  [key: string]: unknown;
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
    let semanticElement: string | React.ElementType | undefined = undefined;
    const restObj = rest as Record<string, unknown>;
    for (const el of htmlElements) {
      if (restObj[el]) {
        // Type Guard: Stelle sicher, dass nur string verwendet wird
        if (typeof restObj[el] === 'string') {
          semanticElement = restObj[el] as string;
        } else {
          semanticElement = el;
        }
        delete restObj[el];
        break;
      }
    }
    // Type Guard für semanticElement, falls es als string | undefined verwendet wird
    const DirectorComponent = (as || (typeof semanticElement === 'string' ? semanticElement : 'div')) as React.ElementType;

    const parseLayout = (layoutString?: string) => {
      if (!layoutString || !layoutString.trim()) return { direction: 'vertical', align: 1, justify: 'b', widthMax: false, paddingX: false, paddingY: false, gapX: false, gapY: false, heightMin: false };
      const parts = layoutString.trim().split(/\s+/) as string[];
      // Direction
      const direction: 'vertical' | 'horizontal' = parts.includes('horizontal') ? 'horizontal' : 'vertical';
      // Align
      const alignStr = parts.find((t) => ['1', '2', '3'].includes(t));
      const align: 1 | 2 | 3 = alignStr ? (parseInt(alignStr, 10) as 1 | 2 | 3) : 1;
      // Justify
      const justifyStr = parts.find((t) => ['a', 'b', 'c', 'd'].includes(t));
      const allowedJustify = ['a', 'b', 'c', 'd'] as const;
      let justify: 'a' | 'b' | 'c' | 'd' = 'b';
      if (typeof justifyStr === 'string' && (allowedJustify as readonly unknown[]).includes(justifyStr)) {
        justify = justifyStr as 'a' | 'b' | 'c' | 'd';
      }
      const widthMax = parts.includes('widthMax');
      const paddingX = parts.includes('paddingX');
      const paddingY = parts.includes('paddingY');
      const gapX = parts.includes('gapX');
      const gapY = parts.includes('gapY');
      const heightMin = parts.includes('heightMin');
      return { direction, align, justify, widthMax, paddingX, paddingY, gapX, gapY, heightMin };
    };

    const { direction, align, justify, widthMax, paddingX, paddingY, gapX, gapY, heightMin } = parseLayout(layout as string | undefined);

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
      if (prop in restObj) {
        delete restObj[prop];
      }
    });

    return (
      <DirectorComponent
        className={`${getContainerClasses()} ${getFlexClasses()} ${className}`}
        style={style}
        ref={ref}
        {...(restObj as Record<string, unknown>)}
      >
        {children}
      </DirectorComponent>
    );
  }
);

Director.displayName = "Director";

export default Director;