import React, { useRef, useEffect } from 'react';
import Director from './Director';
import Arm from './Arm/Arm';
import Text from './Text';

export interface AccordionProps {
  title: string;
  subtitle?: string;
  open: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Accordion({ title, subtitle, open, onClick, children }: AccordionProps) {
  const accRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = accRef.current;
    if (!el) return;
    el.style.maxHeight = open ? `${el.scrollHeight}px` : "0px";
  }, [children, open]);

  return (
    <Director direction="v 1 1" spacingT widthMax={3}>
      <div style={{ marginBottom: '1rem' }}>
        <Text as="h2" align={1}>{title}</Text>
        {subtitle && <Text as="h3" align={1} fontLarge>{subtitle}</Text>}
      </div>
      {children && (
        <div ref={accRef} style={{ overflow: 'hidden', transition: 'max-height var(--anm)' }} aria-hidden={!open}>
          {children}
        </div>
      )}
      <Arm
        direction="up"
        side="left"
        openLabel="Mehr erfahren"
        closeLabel="Zurück"
        showBack={open}
        onClick={onClick}
      />
    </Director>
  );
} 