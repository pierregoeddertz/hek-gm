'use client';

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type BaseProps = {
  text: string;
  href?: string;
  underline?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style" | "children" | "href" | "underline">;
type AnchorProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style" | "children" | "href" | "underline">;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & AnchorProps>(
  ({ text, href, underline = false, style, className, ...rest }, ref) => {
    const classNames = [styles.core, underline ? styles.underline : "", className].filter(Boolean).join(" ");

    if (!href) {
      // Nur Button-Props an <button>
      const { ...buttonProps } = rest as ButtonProps;
      return (
        <button ref={ref as React.Ref<HTMLButtonElement>} type="button" className={classNames} style={style} {...buttonProps}>
          {text}
        </button>
      );
    }
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      // Nur Anchor-Props an <a>
      const { ...anchorProps } = rest as AnchorProps;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classNames} style={style} {...anchorProps}>
          {text}
        </a>
      );
    }
    // Next.js Link
    return (
      <Link href={href} className={classNames} style={style}>
        {text}
      </Link>
    );
  }
);

Button.displayName = "Button";
export default Button; 