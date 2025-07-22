'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Director from '../Director';

interface DraggerProps {
  children: React.ReactNode;
  first?: Partial<React.ComponentProps<typeof Director>>;
  second?: Partial<React.ComponentProps<typeof Director>>;
  className?: string;
  style?: React.CSSProperties;
}

const Dragger: React.FC<DraggerProps> = ({ children, first = {}, second = {}, className, style }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0); // Geschwindigkeit für die Trägheit
  const dragThreshold = 10; // Minimalbewegung (px) um Drag zu aktivieren
  const hasDraggedRef = useRef(false); // Merkt, ob während des aktuellen Zyklus ein Drag stattfand
  const animationFrameId = useRef<number | null>(null); // Für requestAnimationFrame

  // Effekt zur Erkennung von Touch-Geräten beim Mounten
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Überprüft, ob 'ontouchstart' im Fensterobjekt vorhanden ist
      // oder ob der Browser Touch-Punkte meldet (für modernere Browser)
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []); // Leeres Array bedeutet, dass der Effekt nur einmal beim Mounten ausgeführt wird

  // Funktion zum Starten der Trägheitsanimation
  const startInertiaScroll = useCallback(() => {
    if (!outerRef.current || Math.abs(velocity.current) < 0.5) {
      velocity.current = 0;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    outerRef.current.scrollLeft += velocity.current;
    velocity.current *= 0.92; // Bremsfaktor (anpassen für mehr/weniger Trägheit)

    animationFrameId.current = requestAnimationFrame(startInertiaScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Nur ausführen, wenn es kein Touch-Gerät ist
    if (isTouchDevice) return;
    if (!outerRef.current) return;

    // Stoppt jede laufende Trägheitsanimation
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    setIsMouseDown(true);
    hasDraggedRef.current = false; // Reset zu Beginn
    setIsDragging(false); // Wird erst bei Überschreitung des Thresholds aktiviert
    startX.current = e.pageX - outerRef.current.offsetLeft;
    scrollLeft.current = outerRef.current.scrollLeft;
    velocity.current = 0; // Setzt die Geschwindigkeit beim Start des Ziehens zurück
    e.preventDefault(); // Verhindert Textauswahl beim Ziehen
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Nur ausführen, wenn es kein Touch-Gerät ist
    if (isTouchDevice) return;
    if (!isMouseDown || !outerRef.current) return;

    const x = e.pageX - outerRef.current.offsetLeft;
    const delta = x - startX.current;

    // Wenn noch nicht im Dragging-Modus, prüfe ob Threshold überschritten wurde
    if (!isDragging) {
      if (Math.abs(delta) < dragThreshold) {
        return; // Bewege nicht, potentieller Klick
      }
      // Threshold überschritten -> echter Drag
      setIsDragging(true);
      hasDraggedRef.current = true; // Markiere: es wurde gedragt
    }

    // Scroll-Logik nur im Dragging-Modus
    outerRef.current.scrollLeft = scrollLeft.current - delta;

    // Geschwindigkeit basierend auf der aktuellen Mausbewegung
    velocity.current = e.movementX * -1;
  };

  const handleMouseUp = () => {
    // Nur ausführen, wenn es kein Touch-Gerät ist
    if (isTouchDevice) return;

    if (isDragging) {
      // Drag wurde durchgeführt -> Momentum starten
      if (Math.abs(velocity.current) > 0) {
        startInertiaScroll();
      }
    }

    // Reset States
    setIsDragging(false);
    setIsMouseDown(false);
  };

  const handleMouseLeave = () => {
    // Nur ausführen, wenn es kein Touch-Gerät ist
    if (isTouchDevice) return;

    if (isMouseDown && isDragging) {
      // Dragging verlässt das Element -> Momentum starten
      if (Math.abs(velocity.current) > 0) {
        startInertiaScroll();
      }
    }

    setIsDragging(false);
    setIsMouseDown(false);
  };

  // Klick abfangen – wenn zuvor gedragt wurde, Klick verhindern
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDraggedRef.current = false; // Zurücksetzen für nächste Interaktion
    }
  };

  return (
    <Director
      direction="h 1 1"
      ref={outerRef}
      style={{ 
        overflowX: 'auto', 
        ...style, 
        ...(first?.style || {}),
        width: '100%',
        userSelect: 'none',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        cursor: !isTouchDevice ? 'grab' : 'default'
      }}
      className={className || first?.className}
      {...first}
      // Event-Listener nur anwenden, wenn es KEIN Touch-Gerät ist
      onMouseDown={!isTouchDevice ? handleMouseDown : undefined}
      onMouseMove={!isTouchDevice ? handleMouseMove : undefined}
      onMouseUp={!isTouchDevice ? handleMouseUp : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      // Click abfangen, um nach Drag das Navigieren/Lösen eines Links zu verhindern
      onClickCapture={!isTouchDevice ? handleClickCapture : undefined}
    >
      {/* Hide scrollbar for Webkit browsers */}
      <style>
        {`
          .dragger-container::-webkit-scrollbar { display: none !important; }
        `}
      </style>
      
      <Director
        direction="h 1 1"
        style={{ 
          display: 'inline-flex',
          width: 'auto',
          flexWrap: 'nowrap',
          ...(second?.style || {}),
          pointerEvents: isDragging ? 'none' : 'auto'
        }}
        {...second}
        onDragStart={e => e.preventDefault()}
      >
        {children}
      </Director>
    </Director>
  );
};

export default Dragger;
