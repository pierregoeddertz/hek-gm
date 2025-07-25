'use client';

import React, { useRef, useEffect, useCallback, forwardRef } from "react";
import styles from "./Arm.module.css";
import Button from "../Button/Button";

export type ArmProps = {
  direction?: "up" | "down";
  side?: "left" | "right";
  openLabel?: string;
  closeLabel?: string;
  showBack?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  style?: React.CSSProperties;
  staticLabel?: string;
  href?: string;
  vectorColor?: string;
};

const Arm = forwardRef<HTMLDivElement, ArmProps>(function Arm({
  direction = "up",
  side = "left",
  openLabel = "Öffnen",
  closeLabel = "Schließen",
  showBack = false,
  onOpen,
  onClose,
  style,
  staticLabel,
  href,
  vectorColor,
}, ref) {
  const isTop = direction === "up";
  const isLeft = side === "left";
  const vectorRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // SVG-Path dynamisch anpassen
  const updatePath = useCallback(() => {
    const vectorEl = vectorRef.current;
    const pathEl = pathRef.current;
    if (!vectorEl || !pathEl) return;
    const w = vectorEl.clientWidth;
    const KINK = 12;
    let d: string;
    if (isLeft) {
      d = isTop
        ? `M0 0 L${KINK} ${KINK} L${w - 1} ${KINK}`
        : `M0 ${KINK} L${KINK} 0 L${w - 1} 0`;
    } else {
      d = isTop
        ? `M0 ${KINK} L${w - KINK} ${KINK} L${w - 1} 0`
        : `M0 0 L${w - KINK} 0 L${w - 1} ${KINK}`;
    }
    pathEl.setAttribute("d", d);
  }, [isTop, isLeft]);

  useEffect(() => {
    updatePath();
    const vectorEl = vectorRef.current;
    if (!vectorEl) return;
    const ro = new ResizeObserver(updatePath);
    ro.observe(vectorEl);
    return () => ro.disconnect();
  }, [updatePath]);

  // Alignment für row
  const rowAlign = isTop ? "flex-start" : "flex-end";

  // Reihenfolge: side
  const vectorElement = (
    <div className={styles.vector} ref={vectorRef}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <path ref={pathRef} stroke={vectorColor || 'var(--clrA_m)'} strokeWidth="1" strokeLinecap="butt" fill="none" />
      </svg>
    </div>
  );

  if (staticLabel) {
    const staticButton = (
      <div className={styles.btnContainer}>
        <div className={styles.textContainer}>
          <div className={styles.textInner}>
            <Button text={staticLabel} {...(href ? { href } : {})} />
          </div>
        </div>
      </div>
    );
    return (
      <div
        ref={ref}
        className={styles.row}
        data-direction={direction}
        data-side={side}
        style={{ alignItems: rowAlign, ...style }}
      >
        {isLeft ? (
          <>
            {vectorElement}
            {staticButton}
          </>
        ) : (
          <>
            {staticButton}
            {vectorElement}
          </>
        )}
      </div>
    );
  }

  const buttonContainer = (
    <div className={styles.btnContainer}>
      <div className={styles.textContainer}>
        <div className={styles.textInner + (showBack ? ' ' + styles.showBack : '')}>
          <Button text={openLabel} onClick={onOpen} tabIndex={showBack ? -1 : 0} />
          <Button text={closeLabel} onClick={onClose} tabIndex={showBack ? 0 : -1} />
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={styles.row}
      data-direction={direction}
      data-side={side}
      style={{ alignItems: rowAlign, ...style }}
    >
      {isLeft ? (
        <>
          {vectorElement}
          {buttonContainer}
        </>
      ) : (
        <>
          {buttonContainer}
          {vectorElement}
        </>
      )}
    </div>
  );
});

export default Arm; 