import React, { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import styles from './Director.module.css';

interface DirectorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  identity?: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const parseIdentity = (identity?: string) => {
  if (!identity || !identity.trim()) return { direction: 'vertical', align: 2, justify: 'a', widthMax: false, paddingX: false, paddingY: false, gapX: false, gapY: false, heightMin: false, heightFill: false, paddingHeader: false };
  const parts = identity.trim().split(/\s+/) as string[];
  const direction: 'vertical' | 'horizontal' = parts.includes('horizontal') ? 'horizontal' : 'vertical';
  const alignStr = parts.find((t) => ['1', '2', '3'].includes(t));
  const align: 1 | 2 | 3 = alignStr ? (parseInt(alignStr, 10) as 1 | 2 | 3) : 2;
  const justifyStr = parts.find((t) => ['a', 'b', 'c', 'd'].includes(t));
  const allowedJustify = ['a', 'b', 'c', 'd'] as const;
  let justify: 'a' | 'b' | 'c' | 'd' = 'a';
  if (typeof justifyStr === 'string' && (allowedJustify as readonly unknown[]).includes(justifyStr)) {
    justify = justifyStr as 'a' | 'b' | 'c' | 'd';
  }
  const widthMax = parts.includes('widthMax');
  const paddingX = parts.includes('paddingX');
  const paddingY = parts.includes('paddingY');
  const gapX = parts.includes('gapX');
  const gapY = parts.includes('gapY');
  const heightMin = parts.includes('heightMin');
  const heightFill = parts.includes('heightFill');
  const paddingHeader = parts.includes('paddingHeader');
  return { direction, align, justify, widthMax, paddingX, paddingY, gapX, gapY, heightMin, heightFill, paddingHeader };
};

const Director = forwardRef<HTMLElement, DirectorProps>(
  ({ children, identity, className = '', style, as = 'div', ...rest }, ref) => {
    const { direction, align, justify, widthMax, paddingX, paddingY, gapX, gapY, heightMin, heightFill, paddingHeader } = parseIdentity(identity);

    const flexClasses = useMemo(() => {
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
    }, [direction, align, justify]);

    const colorClass = identity?.includes('colorD') ? styles.colorD : identity?.includes('colorL') ? styles.colorL : '';

    const coreClassNames = useMemo(() => classNames(
      styles.core,
      colorClass,
      widthMax && styles.widthMax,
      paddingX && styles.paddingX,
      paddingY && styles.paddingY,
      gapX && styles.gapX,
      gapY && styles.gapY,
      heightMin && styles.heightMin,
      heightFill && styles.heightFill,
      paddingHeader && styles.paddingHeader,
      className
    ), [colorClass, widthMax, paddingX, paddingY, gapX, gapY, heightMin, heightFill, paddingHeader, className]);

    // Immer data-colorreverse bei colorD, aber data-applycolorreverse nur wenn explizit als Prop
    const { 'data-applycolorreverse': dataApplyColorReverseProp, ...restProps } = rest as { 'data-applycolorreverse'?: boolean; [key: string]: unknown };
    const dataColorReverse = identity?.includes('colorD') ? true : undefined;
    const dataApplyColorReverse = dataApplyColorReverseProp !== undefined ? dataApplyColorReverseProp : undefined;

    // Zusätzliche Klassen für spacingTop und spacingBottom aus identity
    const hasSpacingTop = identity?.includes('spacingTop');
    const hasSpacingBottom = identity?.includes('spacingBottom');
    const spacingClasses = [
      hasSpacingTop ? styles.spacingTop : '',
      hasSpacingBottom ? styles.spacingBottom : '',
    ].filter(Boolean).join(' ');

    return React.createElement(
      as,
      {
        className: `${coreClassNames} ${flexClasses}${spacingClasses ? ' ' + spacingClasses : ''}`,
        style,
        ref,
        'data-colorreverse': dataColorReverse,
        'data-applycolorreverse': dataApplyColorReverse,
        ...restProps,
      },
      children
    );
  }
);

Director.displayName = 'Director';
export default Director;