'use client';

import styles from "./Button.module.css";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  dynamic?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", dynamic = false, children, ...rest }, ref) => {
    const combined = `${styles.root} ${className}`.trim();
    return (
      <button ref={ref} type="button" {...rest} className={combined}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button; 