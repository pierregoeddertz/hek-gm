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
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isMouseDevice, setIsMouseDevice] = useState(true);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const velocityHistory = useRef<Array<{ velocity: number; time: number }>>([]);
  const activeRef = useRef<React.RefObject<HTMLDivElement | null> | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const dragThreshold = 5; // Mindestbewegung in Pixeln für Drag-Aktivierung

  useEffect(() => {
    // Erkenne ob es ein Touch-Gerät ist
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasTouchSupport = "ontouchstart" in window;
    setIsMouseDevice(!hasCoarsePointer && !hasTouchSupport);
  }, []);

  const momentum = useCallback((ref: React.RefObject<HTMLDivElement | null>, vel: number) => {
    if (!ref.current || Math.abs(vel) < 0.05) return;

    // Natürlichere Reibung - exponentieller Abfall
    const deceleration = 0.92; // Basis-Deceleration
    const velocityFactor = Math.abs(vel) / 50; // Geschwindigkeits-abhängige Reibung
    const dynamicFriction = Math.max(0.85, deceleration - velocityFactor * 0.02);

    // Zusätzliche Reibung bei sehr hohen Geschwindigkeiten
    const highSpeedFriction = Math.abs(vel) > 30 ? 0.88 : 1;

    const newVelocity = vel * dynamicFriction * highSpeedFriction;

    ref.current.scrollLeft -= newVelocity;

    // Sanftes Bounce-Verhalten an den Grenzen
    const maxScroll = ref.current.scrollWidth - ref.current.clientWidth;
    let bounceVelocity = newVelocity;

    if (ref.current.scrollLeft < 0) {
      ref.current.scrollLeft = Math.max(-20, ref.current.scrollLeft); // Kleiner Overscroll
      bounceVelocity = Math.abs(newVelocity) * 0.3; // Bounce zurück
      if (ref.current.scrollLeft >= -1) {
        ref.current.scrollLeft = 0;
        bounceVelocity = 0;
      }
    } else if (ref.current.scrollLeft > maxScroll) {
      ref.current.scrollLeft = Math.min(maxScroll + 20, ref.current.scrollLeft); // Kleiner Overscroll
      bounceVelocity = -Math.abs(newVelocity) * 0.3; // Bounce zurück
      if (ref.current.scrollLeft <= maxScroll + 1) {
        ref.current.scrollLeft = maxScroll;
        bounceVelocity = 0;
      }
    }

    setVelocity(bounceVelocity);

    // Natürlichere Stopp-Bedingung
    if (Math.abs(bounceVelocity) > 0.05) {
      animationRef.current = requestAnimationFrame(() => momentum(ref, bounceVelocity));
    }
  }, []);

  const calculateVelocity = (currentX: number, currentTime: number) => {
    const history = velocityHistory.current;
    history.push({ velocity: currentX, time: currentTime });

    // Behalte nur die letzten 5 Messungen für glattere Berechnung
    if (history.length > 5) {
      history.shift();
    }

    if (history.length < 2) return 0;

    // Gewichteter Durchschnitt der letzten Geschwindigkeiten
    let totalWeight = 0;
    let weightedVelocity = 0;

    for (let i = 1; i < history.length; i++) {
      const timeDelta = history[i].time - history[i - 1].time;
      const distance = history[i].velocity - history[i - 1].velocity;

      if (timeDelta > 0) {
        const velocity = (distance / timeDelta) * 16; // Normalisiert auf 60fps
        const weight = Math.max(0.1, 1 - (currentTime - history[i].time) / 100); // Neuere Werte haben mehr Gewicht

        weightedVelocity += velocity * weight;
        totalWeight += weight;
      }
    }

    return totalWeight > 0 ? weightedVelocity / totalWeight : 0;
  };

  // Global mouse move handler mit Drag-Threshold
  const handleGlobalMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isMouseDown || !activeRef.current?.current) return;

      const currentTime = Date.now();
      const distance = Math.abs(e.pageX - startX);

      // Aktiviere Dragging erst nach Threshold
      if (!isDragging && distance > dragThreshold) {
        setIsDragging(true);
        if (activeRef.current.current) {
          activeRef.current.current.style.cursor = "grabbing";
        }
      }

      // Führe Scrolling nur aus, wenn wirklich gedraggt wird
      if (isDragging) {
        // 1:1 Bewegung - absolut parallel zur Cursor-Bewegung
        const walk = e.pageX - startX;

        // Speichere Position für Geschwindigkeitsberechnung
        velocityHistory.current.push({ velocity: e.pageX, time: currentTime });

        activeRef.current.current.scrollLeft = scrollLeft - walk;
        setLastX(e.pageX);
        lastTimeRef.current = currentTime;
      }
    },
    [isMouseDown, isDragging, startX, scrollLeft, dragThreshold],
  );

  // Global mouse up handler mit Click-Erkennung
  const handleGlobalMouseUp = useCallback(() => {
    if (isMouseDown && activeRef.current?.current && isMouseDevice) {
      // Momentum nur starten, wenn wirklich gedraggt wurde
      if (isDragging) {
        // Starte Momentum mit berechneter Geschwindigkeit
        const finalVelocity = calculateVelocity(lastX, Date.now());
        if (activeRef.current) {
          momentum(activeRef.current, finalVelocity);
        }
      }

      setIsDragging(false);
      setIsMouseDown(false);
      activeRef.current.current.style.cursor = "grab";
      document.body.style.cursor = "";
      document.body.style.userSelect = "";

      activeRef.current = null;
    }
  }, [isMouseDown, isDragging, isMouseDevice, lastX, momentum]);

  // Event listeners für globale Events
  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      
      // Nur während echtem Dragging Cursor und Selection ändern
      if (isDragging) {
        document.body.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
      }

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isMouseDown, isDragging, handleGlobalMouseMove, handleGlobalMouseUp]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!outerRef.current || !isMouseDevice) return;

    // Stoppe laufende Momentum-Animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsMouseDown(true);
    // isDragging wird erst bei Bewegung über Threshold aktiviert
    activeRef.current = outerRef; // WICHTIG: Setze die Ref-Referenz
    setStartX(e.pageX);
    setLastX(e.pageX);
    setScrollLeft(outerRef.current.scrollLeft);
    setVelocity(0);
    lastTimeRef.current = Date.now();
    velocityHistory.current = [];

    // Cursor wird erst beim echten Dragging auf "grabbing" gesetzt
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
        cursor: isMouseDevice ? 'grab' : 'default'
      }}
      className={className || first?.className}
      {...first}
      {...(isMouseDevice && {
        onMouseDown: handleMouseDown,
        onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
          if (!isDragging || !outerRef.current) return;
          e.preventDefault();
        },
      })}
    >
      <style>{`
        .dragger-container::-webkit-scrollbar { display: none !important; }
      `}</style>
      
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