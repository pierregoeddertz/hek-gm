import React, { forwardRef } from 'react';
import styles from './Director.module.css';

export interface DirectorProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  direction?: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  widthMax?: 1 | 2 | 3;
  heightFull?: boolean;
  paddingX?: boolean;
  paddingY?: boolean;
  spacingT?: boolean;
  spacingB?: boolean;
  gapX?: boolean;
  gapY?: boolean;
  colorDom?: boolean;
}

const baseStyles = {
  display: 'flex' as const,
  width: '100%',
};

const Director = forwardRef<HTMLElement, DirectorProps>(
  ({ children, direction = 'v 1 2', className = '', style, as = 'div', widthMax, heightFull = false, paddingX = false, paddingY = false, spacingT = false, spacingB = false, gapX = false, gapY = false, colorDom = false, ...rest }, ref) => {
    const parts = direction.trim().split(/\s+/);
    const dir = parts[0] === 'h' ? 'horizontal' : 'vertical';
    const justify = parseInt(parts[1] || '2', 10);
    const align = parseInt(parts[2] || '1', 10);

    let widthMaxClass = '';
    if (widthMax === 1) widthMaxClass = styles.widthMax1;
    else if (widthMax === 2) widthMaxClass = styles.widthMax2;
    else if (widthMax === 3) widthMaxClass = styles.widthMax3;

    const classes = [
      styles.director,
      dir === 'vertical' ? styles.vertical : styles.horizontal,
      styles[`justify${justify}`] || styles.justify2,
      styles[`align${align}`] || styles.align1,
      widthMaxClass,
      heightFull && styles.heightFull,
      paddingX && styles.paddingX,
      paddingY && styles.paddingY,
      spacingT && styles.spacingT,
      spacingB && styles.spacingB,
      gapX && styles.gapX,
      gapY && styles.gapY,
      className
    ].filter(Boolean).join(' ');

    const combinedStyle = {
      ...baseStyles,
      ...(colorDom && { backgroundColor: 'var(--clrD_a)' }),
      ...style,
    };

    const additionalProps = {
      ...(colorDom && { 'data-push_colordom': '' }),
      ...rest,
    };

    return React.createElement(
      as,
      {
        className: classes,
        style: combinedStyle,
        ref,
        ...additionalProps,
      },
      children
    );
  }
);

Director.displayName = 'Director';
export default Director; 