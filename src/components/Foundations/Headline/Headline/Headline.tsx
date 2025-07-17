'use client';

import React, { forwardRef } from "react";
import styles from "./Headline.module.css";

export type HeadlineProps = {
  text: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & React.HTMLAttributes<HTMLHeadingElement>;

const Headline = forwardRef<HTMLHeadingElement, HeadlineProps>(
  ({ text, level = 'h2', className = '', style, ...rest }, ref) => {
    const Component = level;
    
    return (
      <Component 
        ref={ref} 
        className={`${styles.core} ${styles[level]} ${className}`} 
        style={style}
        {...rest}
      >
        {text}
      </Component>
    );
  }
);

Headline.displayName = "Headline";

export default Headline; 