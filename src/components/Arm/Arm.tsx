'use client';

import styles from "./Arm.module.css";
import { useRef, useCallback, useEffect, ReactNode, forwardRef } from "react";
import Button from "../Button/Button";

export type ArmProps = {
  direction?: "up" | "down";
  side?: "left" | "right";
  openLabel?: string;
  closeLabel?: string;
  label?: string; // Einfache Variante: nur ein Button
  showBack?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
};

const Arm = forwardRef<HTMLDivElement, ArmProps>(function Arm({
  direction = "up",
  side = "left",
  openLabel,
  closeLabel,
  label,
  showBack = false,
  children,
  onClick,
  href,
  style,
}, ref) {
  const vectorRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const updatePath = useCallback(() => {
    const vectorEl = vectorRef.current;
    const pathEl = pathRef.current;
    if (!vectorEl || !pathEl) return;
    const w = vectorEl.clientWidth;
    const KINK = 12;
    let d: string;
    if (side === "left") {
      d =
        direction === "down"
          ? `M0 ${KINK} L${KINK} 0 L${w - 1} 0`
          : `M0 0 L${KINK} ${KINK} L${w - 1} ${KINK}`;
    } else {
      d =
        direction === "down"
          ? `M0 0 L${w - KINK} 0 L${w - 1} ${KINK}`
          : `M0 ${KINK} L${w - KINK} ${KINK} L${w - 1} 0`;
    }
    pathEl.setAttribute("d", d);
  }, [direction, side]);

  useEffect(() => {
    updatePath();
    const vectorEl = vectorRef.current;
    if (!vectorEl) return;
    const ro = new ResizeObserver(updatePath);
    ro.observe(vectorEl);
    return () => ro.disconnect();
  }, [updatePath]);

  const rowClasses = `${styles.row} ${side === "right" ? styles.right : ""}`.trim();

  return (
    <div ref={ref} className={rowClasses} data-direction={direction} data-side={side} style={style}>
      <div className={styles.vector} ref={vectorRef} >
        <svg xmlns="http://www.w3.org/2000/svg">
          <path ref={pathRef} stroke="var(--clrA_m)" strokeWidth="1" strokeLinecap="butt" fill="none" />
        </svg>
      </div>
      <div className={styles.btnContainer}>
        {label ? (
          <Button text={label} onClick={onClick} href={href} />
        ) : openLabel && closeLabel ? (
          <div className={styles.textContainer} style={{ cursor: 'pointer' }}>
            <div className={`${styles.textInner} ${showBack ? styles.showBack : ""}`.trim()}>
              <Button text={openLabel} onClick={onClick} href={href} />
              <Button text={closeLabel} onClick={onClick} href={href} />
            </div>
          </div>
        ) : (
          <span onClick={onClick} style={{ cursor: 'pointer' }}>{children}</span>
        )}
      </div>
    </div>
  );
});
export default Arm; 