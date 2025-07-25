'use client';

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type BaseProps = {
  text: string;
  href?: string;
  style?: React.CSSProperties;
  className?: string;
  underline?: boolean;
  active?: boolean;
};

type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style" | "children" | "href">;
type AnchorProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style" | "children" | "href">;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & AnchorProps>(
  ({ text, href, style, className, underline, active, ...rest }, ref) => {
    const classNames = [styles.core, underline && styles.underline, className].filter(Boolean).join(" ");
    const mergedStyle = active ? { ...style, opacity: 0.33 } : style;

    const content = underline ? (
      <span style={{ position: "relative", display: "inline-block", color: "inherit", '--svg-underline-color': 'var(--clrA_m)' } as React.CSSProperties}>
        {text}
        <svg
          width="100%"
          height="6"
          viewBox="0 0 100 6"
          style={{
            position: "absolute",
            left: 0,
            bottom: -3,
            width: "100%",
            height: 6,
            pointerEvents: "none",
            zIndex: 1
          }}
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="5"
            x2="100"
            y2="5"
            stroke="var(--svg-underline-color)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </span>
    ) : text;

    if (!href) {
      // Nur Button-Props an <button>
      const { ...buttonProps } = rest as ButtonProps;
      return (
        <button ref={ref as React.Ref<HTMLButtonElement>} type="button" className={classNames} style={mergedStyle} {...buttonProps}>
          {content}
        </button>
      );
    }

    // Für alle Links (auch mailto, tel, http/https) immer Next.js Link
    let linkProps: any = {};
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      linkProps = {
        target: '_blank',
        rel: 'noopener noreferrer',
        ...rest
      };
    }
    return (
      <Link href={href} className={classNames} style={mergedStyle} passHref {...linkProps}>
        {content}
      </Link>
    );
  }
);

Button.displayName = "Button";
export default Button; 