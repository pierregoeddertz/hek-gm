'use client';

import React, { memo, useRef, useEffect, useCallback, useState } from 'react';
import Director from './Director';
import Button from './Button';

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

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    console.log('Menu clicked:', !menuOpen);
  };

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
        style={headerStyles.core}
        direction="v 1 2"
        gapY
        paddingX
        paddingY
      >
        <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--clrA_m)" strokeWidth="1" />
        </svg>
        
        <Director direction="h 2 4" style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Linke Seite - Menü Button auskommentiert
          <button
            onClick={handleMenuClick}
            aria-label="Menü öffnen"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              paddingRight: '.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.33'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg height="1rem" viewBox="0 0 79 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.4004 46.7227L47.2283 57.778H0.250488V46.7227H37.4004Z" fill="currentColor"/>
              <path d="M53.2841 23.5586L63.1119 34.614H0.250488V23.5586H53.2841Z" fill="currentColor"/>
              <path d="M69.1677 0.390625L78.9956 11.446H0.250488V0.390625H69.1677Z" fill="currentColor"/>
            </svg>
          </button>
          */}

          {/* Navigation Links - ohne asModal = normale SPA Navigation */}
          <Director direction="h 2 2" gapX style={{ alignItems: 'center', width: 'auto' }}>
            <Button
              text="News"
              href="/news"
              aria-label="News"
            />
            <Button
              text="Smartflower"
              href="/smartflower"
              aria-label="Smartflower"
            />
          </Director>

          <Director direction="h 1 1" style={{ alignItems: 'center', gap: '1rem' }}>
            <svg 
              width="2" 
              height="1rem" 
              viewBox="0 0 3 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(20deg)' }}
            >
              <line x1="1.5" y1="0" x2="1.5" y2="20" stroke="var(--clrA_m)" strokeWidth="2"/>
            </svg>
            <Button
              text="Kontakt"
              href="mailto:smartflower@hek-gm.de"
              aria-label="Kontakt"
            />
          </Director>
          
          <button
            onClick={handleLogoClick}
            aria-label="HEK Logo / Home"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.33'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg height="1rem" viewBox="0 0 174 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8162 61.7924H0.0712891V8.62055L13.8162 0.375V61.7924Z" fill="currentColor"/>
              <path d="M51.9192 53.4932L38.088 61.7924V36.2153H22.3979L13.8162 24.2989H38.088V0.375H51.9192V53.4932Z" fill="currentColor"/>
              <path d="M108.77 12.205H78.7555V49.96H109.29L100.772 61.7924H65.0108V12.205L73.5294 0.375H108.77V12.205Z" fill="currentColor"/>
              <path d="M133.866 19.7337L154.582 0.375H171.227L133.866 33.9922V61.7924H120.119V0.375H133.866V19.7337Z" fill="currentColor"/>
              <path d="M173.835 61.7924H156.863L133.866 33.9922L150.834 33.9874L173.835 61.7924Z" fill="currentColor"/>
              <path d="M106.159 36.2153H87.0876L78.7555 24.6468H106.159V36.2153Z" fill="currentColor"/>
            </svg>
          </button>
        </Director>
      </Director>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
