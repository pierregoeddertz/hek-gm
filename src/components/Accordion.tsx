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
  variant?: 'default' | 'list';
  content?: string; // Für Supabase content
  onMouseEnter?: () => void;
  isHovered?: boolean;
}

export default function Accordion({ title, subtitle, open, onClick, children, armProps, variant = 'default', content, onMouseEnter, isHovered }: AccordionProps) {
  const accRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = accRef.current;
    if (!el) return;
    el.style.maxHeight = open ? `${el.scrollHeight}px` : "0px";
  }, [children, content, open]);

  // Chevron SVG Component - zeigt nach unten wenn aktiv
  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={isOpen ? 'chevron-open' : 'chevron-closed'}
      style={{
        flexShrink: 0,
        marginLeft: '0.5rem'
      }}
    >
      <polyline 
        points="7,5 13,10 7,15" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="butt" 
        strokeLinejoin="miter" 
        fill="none" 
      />
    </svg>
  );

  if (variant === 'list') {
    return (
      <div style={{ width: '100%' }}>
        <button
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          style={{
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: 'none',
            border: 'none',
            padding: '0.5rem 0',
            cursor: 'pointer',
            color: 'inherit',
            textAlign: 'left',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            opacity: isHovered ? 1 : 0.33
          }}
          aria-expanded={open}
        >
          <span className="fontLarge">{title}</span>
          <ChevronIcon isOpen={open} />
        </button>
        
        {(children || content) && (
          <div 
            ref={accRef} 
            style={{ 
              overflow: 'hidden', 
              transition: 'max-height var(--anm)',
              marginTop: '0.5rem',
              maxWidth: '600px'
            }} 
            aria-hidden={!open}
          >
            {content && (
              <p style={{ 
                margin: '0 0 1rem 0',
                opacity: isHovered ? 1 : 0.33
              }}>
                {content}
              </p>
            )}
            {children}
          </div>
        )}
        {open && <div style={{ height: '2rem' }} />}
      </div>
    );
  }

  // Default variant (existing behavior)
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