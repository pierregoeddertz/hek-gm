'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    
    setIsClosing(true);
    const htmlElement = document.documentElement;
    
    // Speichere Scroll-Position
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    // Start closing animation - Overlay und Panel animieren parallel
    console.log('Starting close animation');
    
    // Panel animieren
    htmlElement.classList.add('sidepanel-closing'); // keep sidepanel-open
    
    // Overlay animieren
    setOverlayVisible(false);

    // Warte exakt die Transition-Dauer, dann Navigation & Cleanup
    setTimeout(() => {
      console.log('Animation finished, cleaning up');
      htmlElement.classList.remove('sidepanel-open');
      htmlElement.classList.remove('sidepanel-closing');
      htmlElement.style.overflow = '';
      document.body.style.overflow = '';
      // Scroll-Position wiederherstellen
      window.scrollTo(scrollX, scrollY);
      router.back();
    }, 750);
  }, [isClosing, router]);

  useLayoutEffect(() => {
    const htmlElement = document.documentElement;

    // Scroll-Position speichern
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Scrolling verhindern
    htmlElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Panel öffnen (nur ein einziges Mal beim Mount)
    // Kurze Verzögerung für Animation - startet im nächsten Frame
    requestAnimationFrame(() => {
      console.log('Starting open animation');
      htmlElement.classList.add('sidepanel-open');
      setOverlayVisible(true);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Stelle Ausgangszustand sicher, falls Komponente ungemountet wird
      htmlElement.classList.remove('sidepanel-open');
      htmlElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(scrollX, scrollY);
    };
  }, [handleClose]);

  return (
    <div
      ref={modalRef}
      className={styles.modal}
    >
      <div 
        ref={overlayRef}
        className="sidepanel-overlay"
        onClick={handleClose}
        style={{
          opacity: overlayVisible ? 1 : 0,
          transition: 'opacity 750ms cubic-bezier(0.8, 0, 0.25, 1)'
        }}
      ></div>
      <div 
        ref={contentRef}
        data-modal-panel
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Sidepanel schließen"
          disabled={isClosing}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
} 