'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Director from './Director';

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
  const velocity = useRef(0);
  const dragThreshold = 10;
  const hasDraggedRef = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []);

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
    velocity.current *= 0.92;
    animationFrameId.current = requestAnimationFrame(startInertiaScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    if (!outerRef.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    setIsMouseDown(true);
    hasDraggedRef.current = false;
    setIsDragging(false);
    startX.current = e.pageX - outerRef.current.offsetLeft;
    scrollLeft.current = outerRef.current.scrollLeft;
    velocity.current = 0;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    if (!isMouseDown || !outerRef.current) return;
    const x = e.pageX - outerRef.current.offsetLeft;
    const delta = x - startX.current;
    if (!isDragging) {
      if (Math.abs(delta) < dragThreshold) {
        return;
      }
      setIsDragging(true);
      hasDraggedRef.current = true;
    }
    outerRef.current.scrollLeft = scrollLeft.current - delta;
    velocity.current = e.movementX * -1;
  };

  const handleMouseUp = () => {
    if (isTouchDevice) return;
    if (isDragging) {
      if (Math.abs(velocity.current) > 0) {
        startInertiaScroll();
      }
    }
    setIsDragging(false);
    setIsMouseDown(false);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    if (isMouseDown && isDragging) {
      if (Math.abs(velocity.current) > 0) {
        startInertiaScroll();
      }
    }
    setIsDragging(false);
    setIsMouseDown(false);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDraggedRef.current = false;
    }
  };

  // Defaults für den inneren Director
  const secondDefaults: Partial<React.ComponentProps<typeof Director>> = {
    direction: 'h 1 1',
    gapX: true,
    paddingX: true,
    style: { display: 'inline-flex', width: 'auto' },
  };
  // Merge second-Props, wobei User-Props second Vorrang haben
  const mergedSecond = {
    ...secondDefaults,
    ...second,
    style: { ...secondDefaults.style, ...(second.style || {}) },
  };

  return (
    <Director
      direction={first.direction || 'h 1 1'}
      ref={outerRef}
      style={{ 
        overflowX: 'auto', 
        ...style, 
        ...(first?.style || {}),
        width: '100%',
        userSelect: 'none',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        cursor: 'default'
      }}
      className={className || first?.className}
      {...first}
      onMouseDown={!isTouchDevice ? handleMouseDown : undefined}
      onMouseMove={!isTouchDevice ? handleMouseMove : undefined}
      onMouseUp={!isTouchDevice ? handleMouseUp : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      onClickCapture={!isTouchDevice ? handleClickCapture : undefined}
    >
      <style>
        {`
          .dragger-container::-webkit-scrollbar { display: none !important; }
        `}
      </style>
      <Director
        {...mergedSecond}
        onDragStart={e => e.preventDefault()}
        style={{
          ...mergedSecond.style,
          pointerEvents: isDragging ? 'none' : 'auto',
        }}
      >
        {children}
      </Director>
    </Director>
  );
};

export default Dragger;
