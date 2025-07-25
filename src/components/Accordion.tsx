import React, { useRef, useEffect } from 'react';
import Director from './Director';
import Arm, { ArmProps } from './Arm/Arm';
import Text from './Text';

export interface AccordionProps {
  title: string;
  subtitle?: string;
  open: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  armProps?: Partial<ArmProps>;
}

export default function Accordion({ title, subtitle, open, onClick, children, armProps }: AccordionProps) {
  const accRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = accRef.current;
    if (!el) return;
    el.style.maxHeight = open ? `${el.scrollHeight}px` : "0px";
  }, [children, open]);

  return (
    <Director direction="v 1 1" spacingT gapY widthMax={3}  >
      <Director direction="v 1 1" gapY >
        <Text as="h2" align={1}>{title}</Text>
        {subtitle && <Text as="h3" align={1} fontLarge>{subtitle}</Text>}
      </Director >
      {children && (
        <Director direction="v 1 1" ref={accRef} style={{ overflow: 'hidden', transition: 'max-height var(--anm)' }} aria-hidden={!open}>
          {children}
          <div style={{ minHeight: '1rem', width: '100%' }} />
        </Director>
      )}
      <Arm
        direction="up"
        side="left"
        openLabel="Mehr erfahren"
        closeLabel="Zurück"
        showBack={open}
        onOpen={onClick}
        onClose={onClick}
        {...(armProps || {})}
      />
    </Director>
  );
} 