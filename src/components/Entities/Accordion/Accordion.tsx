import React, { useRef, useEffect } from 'react';
import Director from '@/components/Layout/Director';
import Headline from '@/components/Foundations/Headline';
import Arm from '@/components/Foundations/Button/Arm';

export interface AccordionProps {
  title: string;
  subtitle?: string;
  open: boolean;
  openLabel: string;
  closeLabel: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Accordion({ title, subtitle, open, openLabel, closeLabel, onClick, children }: AccordionProps) {
  const accRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = accRef.current;
    if (!el) return;
    el.style.maxHeight = open ? `${el.scrollHeight}px` : "0px";
  }, [children, open]);

  return (
    <Director identity="vertical 1 a gapY widthMax2">
        <Headline text={title} textAlign={"1"} identity="vertical 1 a gapY" subText={subtitle} />
      {children && (
        <div ref={accRef} style={{ overflow: 'hidden', transition: 'max-height var(--anm)' }} aria-hidden={!open}>
          <div>{children}</div>
        </div>
      )}
      <Arm
        direction="up"
        side="left"
        openLabel={openLabel}
        closeLabel={closeLabel}
        showBack={open}
        onClick={onClick}
      />
    </Director>
  );
} 