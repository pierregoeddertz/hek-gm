'use client';

import React, { memo, useRef, useEffect, useCallback, useState } from 'react';
import Director from './Director';
import Button from './Button';
import HList from './HList';
import { usePathname } from 'next/navigation';

export type HeaderProps = {
  right?: React.ReactNode | null;
  className?: string;
};

const headerStyles = {
  core: {
    position: 'fixed' as const,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
};

const Header = memo(({ right: _, className = '' }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const checkColorDomElements = useCallback(() => {
    if (!headerRef.current) return;

    const header = headerRef.current;
    const headerRect = header.getBoundingClientRect();
    
    // Alle Elemente mit data-push_colordom finden
    const pushElements = document.querySelectorAll('[data-push_colordom]');
    
    console.log('Found elements with data-push_colordom:', pushElements.length);
    
    let shouldGetColor = false;
    
    pushElements.forEach((element) => {
      const elementRect = element.getBoundingClientRect();
      
      // Berechne die Mitte des Headers (vertikal)
      const headerMiddle = headerRect.top + (headerRect.height / 2);
      
      // Prüfen ob die Mitte des Headers sich über dem Element befindet
      const isHeaderMiddleOverElement = 
        headerMiddle >= elementRect.top && 
        headerMiddle <= elementRect.bottom &&
        headerRect.left < elementRect.right &&
        headerRect.right > elementRect.left;
      
      console.log('Element overlap check (50% rule):', {
        element,
        elementRect: {
          top: elementRect.top,
          bottom: elementRect.bottom,
          left: elementRect.left,
          right: elementRect.right
        },
        headerRect: {
          top: headerRect.top,
          bottom: headerRect.bottom,
          left: headerRect.left,
          right: headerRect.right
        },
        headerMiddle,
        isHeaderMiddleOverElement
      });
      
      if (isHeaderMiddleOverElement) {
        shouldGetColor = true;
      }
    });
    
    // data-get_colordom setzen oder entfernen
    if (shouldGetColor) {
      console.log('Setting data-get_colordom on header');
      header.setAttribute('data-get_colordom', '');
    } else {
      console.log('Removing data-get_colordom from header');
      header.removeAttribute('data-get_colordom');
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkColorDomElements();
    
    // Scroll-Event-Listener
    const handleScroll = () => {
      checkColorDomElements();
    };
    
    // Resize-Event-Listener für Layout-Änderungen
    const handleResize = () => {
      checkColorDomElements();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // MutationObserver für dynamische DOM-Änderungen
    const observer = new MutationObserver(() => {
      checkColorDomElements();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-push_colordom']
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [checkColorDomElements]);

  const handleLogoClick = () => {
    // Navigation zur Homepage
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <>
      <Director
        as='header'
        ref={headerRef}
        className={`header ${className}`.trim()}
        style={{ ...headerStyles.core, pointerEvents: 'none' }}
        direction="v 1 2"
        gapY
        paddingX
        paddingY
      >
        <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--clrA_m)" strokeWidth="1" />
        </svg>
        
        <Director direction="h 2 4" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={handleLogoClick}
            aria-label="HEK Logo / Home"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'auto',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.33'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg viewBox="0 0 174 62" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '1rem' }}>
              <path d="M13.8162 61.7924H0.0712891V8.62055L13.8162 0.375V61.7924Z" fill="currentColor"/>
              <path d="M51.9192 53.4932L38.088 61.7924V36.2153H22.3979L13.8162 24.2989H38.088V0.375H51.9192V53.4932Z" fill="currentColor"/>
              <path d="M108.77 12.205H78.7555V49.96H109.29L100.772 61.7924H65.0108V12.205L73.5294 0.375H108.77V12.205Z" fill="currentColor"/>
              <path d="M133.866 19.7337L154.582 0.375H171.227L133.866 33.9922V61.7924H120.119V0.375H133.866V19.7337Z" fill="currentColor"/>
              <path d="M173.835 61.7924H156.863L133.866 33.9922L150.834 33.9874L173.835 61.7924Z" fill="currentColor"/>
              <path d="M106.159 36.2153H87.0876L78.7555 24.6468H106.159V36.2153Z" fill="currentColor"/>
            </svg>
          </button>

          <HList
            items={[
              <Button key="smartflower" text="Smartflower" href="/smartflower" aria-label="Smartflower" active={pathname === '/smartflower' || pathname.startsWith('/smartflower/')} style={{ pointerEvents: 'auto' }} />, 
              <Button key="news" text="News" href="/news" aria-label="News" active={pathname === '/news' || pathname.startsWith('/news/')} style={{ pointerEvents: 'auto' }} />, 
              <Button key="kontakt" text="Kontakt" href="mailto:smartflower@hek-gm.de" aria-label="Kontakt" active={pathname.startsWith('mailto:smartflower@hek-gm.de')} style={{ pointerEvents: 'auto' }} />
            ]}
            marginBottom="0"
            alignItems="center"
            style={{ flex: 0 }}
          />
        </Director>
      </Director>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
