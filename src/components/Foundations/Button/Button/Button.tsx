'use client';

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export type ButtonProps = {
  text: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, href, style, ...rest }, ref) => {
    if (!href) {
      return (
        <button ref={ref} type="button" {...rest} className={styles.core} style={style}>
          {text}
        </button>
      );
    }
    if (isExternal(href)) {
      return (
        <a href={href} className={styles.core} target="_blank" rel="noopener noreferrer" style={style}>
          {text}
        </a>
      );
    }
    // Default: interner Link
    return (
      <Link href={href} className={styles.core} style={style}>
        {text}
      </Link>
    );
  }
);
Button.displayName = "Button";

export default Button; 