'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Explorer.module.css';
import Director from '@/components/Layout/Director';
import { debounce } from 'lodash';

export type ExplorerProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Explorer({
  children,
  className = '',
  style,
}: ExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // --- TRANSLATE STATE ---
  const translateRef = useRef(0);
  const [, forceUpdate] = useState({});
  const rafPending = useRef<number | null>(null);
  const latestTranslate = useRef(0);

  const setTranslate = useCallback((x: number) => {
    translateRef.current = x;
    latestTranslate.current = x;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${x}px)`;
    }
    if (rafPending.current === null) {
      rafPending.current = requestAnimationFrame(() => {
        forceUpdate({});
        rafPending.current = null;
      });
    }
  }, []);

  // --- LIMITS ---
  const limitsRef = useRef({ min: 0, max: 0 });
  const clamp = useCallback((x: number) => {
    const { min, max } = limitsRef.current;
    return Math.min(max, Math.max(min, x));
  }, []);

  // --- DRAGGING ---
  const dragState = useRef<{ startX: number; startT: number; dragging: boolean; hasMoved: boolean }>({
    startX: 0,
    startT: 0,
    dragging: false,
    hasMoved: false,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    stopMomentum();
    dragState.current = {
      startX: e.clientX,
      startT: translateRef.current,
      dragging: true,
      hasMoved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.userSelect = 'none';
    document.body.classList.add('draggerTrue');
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 5) {
      dragState.current.hasMoved = true;
    }
    setTranslate(clamp(dragState.current.startT + dx));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    if (dragState.current.hasMoved) {
      document.body.setAttribute('data-dragger-has-moved', 'true');
      setTimeout(() => {
        document.body.removeAttribute('data-dragger-has-moved');
      }, 100);
      dragState.current.dragging = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      document.body.style.userSelect = '';
      document.body.classList.remove('draggerTrue');
      startMomentum();
    } else {
      // Nur Klick, kein Drag: keine Bewegung, keine Momentum-Logik
      dragState.current.dragging = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      document.body.style.userSelect = '';
      document.body.classList.remove('draggerTrue');
    }
  };

  // --- MOMENTUM ---
  const moveSamples = useRef<Array<{ x: number; t: number }>>([]);
  const momentumRaf = useRef<number | null>(null);

  const stopMomentum = () => {
    if (momentumRaf.current) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  };

  const startMomentum = () => {
    const samples = moveSamples.current;
    let v = 0;
    // Zeitfenster für Geschwindigkeit auf 200ms erhöhen
    const now = performance.now();
    const relevantSamples = samples.filter(s => now - s.t <= 200);
    if (relevantSamples.length > 1) {
      const first = relevantSamples[0], last = relevantSamples[relevantSamples.length - 1];
      v = ((last.x - first.x) / (last.t - first.t)) * 1000;
    }
    // Maximale Geschwindigkeit auf ±20000 erhöhen
    v = Math.max(-20000, Math.min(20000, v));
    // Friction auf 0.88 senken
    const friction = 0.88;
    let lastTs = performance.now();

    const step = (now: number) => {
      const dt = (now - lastTs) / 1000;
      lastTs = now;
      v *= Math.pow(friction, dt * 60);
      const next = clamp(translateRef.current + v * dt);
      setTranslate(next);
      if (Math.abs(v) > 40) {
        momentumRaf.current = requestAnimationFrame(step);
      } else {
        document.body.classList.remove('draggerTrue');
      }
    };

    if (Math.abs(v) > 10) {
      momentumRaf.current = requestAnimationFrame(step);
    } else {
      document.body.classList.remove('draggerTrue');
    }
  };

  const onPointerMoveSample = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const now = performance.now();
    moveSamples.current.push({ x: e.clientX, t: now });
    while (moveSamples.current[0] && now - moveSamples.current[0].t > 100) {
      moveSamples.current.shift();
    }
  };

  // --- WHEEL LOCK WITH DEBOUNCE ---
  const removeClassDebounced = useRef(
    debounce(() => {
      document.body.classList.remove('draggerTrue');
    }, 450)
  ).current;

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      document.body.classList.add('draggerTrue');
      const next = clamp(translateRef.current - e.deltaX);
      setTranslate(next);
      removeClassDebounced();
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInDragger = target.closest('[data-dragger="true"]');
      if (isInDragger && document.body.getAttribute('data-dragger-has-moved') === 'true') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  useEffect(() => {
    const updateLimits = () => {
      const wC = containerRef.current?.clientWidth || 0;
      const wT = trackRef.current?.scrollWidth || 0;
      limitsRef.current = { min: Math.min(0, wC - wT), max: 0 };
      setTranslate(clamp(translateRef.current));
    };
    updateLimits();
    const ro = new ResizeObserver(updateLimits);
    if (containerRef.current) ro.observe(containerRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', updateLimits);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateLimits);
      removeClassDebounced.cancel();
      stopMomentum();
    };
  }, [clamp, removeClassDebounced, setTranslate]);

  return (
    <div
      ref={containerRef}
      className={`${styles.root} ${className}`}
      style={style}
      data-dragger="true"
      onPointerDown={onPointerDown}
      onPointerMove={(e) => { onPointerMove(e); onPointerMoveSample(e); }}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <Director ref={trackRef} layout="horizontal 3 a gapX paddingX" className={styles.track}>
        {children}
      </Director>
    </div>
  );
} 