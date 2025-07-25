'use client';

import React, { useEffect, useRef } from 'react';

interface KeyboardNavigationProps {
  children: React.ReactNode;
  itemCount: number;
}

export default function KeyboardNavigation({ children, itemCount }: KeyboardNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentFocusIndex = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
      const focusableArray = Array.from(focusableElements) as HTMLElement[];

      if (focusableArray.length === 0) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          currentFocusIndex.current = (currentFocusIndex.current + 1) % focusableArray.length;
          focusableArray[currentFocusIndex.current]?.focus();
          break;
        
        case 'ArrowLeft':
          event.preventDefault();
          currentFocusIndex.current = currentFocusIndex.current === 0 
            ? focusableArray.length - 1 
            : currentFocusIndex.current - 1;
          focusableArray[currentFocusIndex.current]?.focus();
          break;
        
        case 'ArrowDown':
          event.preventDefault();
          // Navigate down (assuming 3 columns layout)
          const columns = 3;
          const nextRowIndex = currentFocusIndex.current + columns;
          if (nextRowIndex < focusableArray.length) {
            currentFocusIndex.current = nextRowIndex;
            focusableArray[currentFocusIndex.current]?.focus();
          }
          break;
        
        case 'ArrowUp':
          event.preventDefault();
          // Navigate up (assuming 3 columns layout)
          const prevRowIndex = currentFocusIndex.current - 3;
          if (prevRowIndex >= 0) {
            currentFocusIndex.current = prevRowIndex;
            focusableArray[currentFocusIndex.current]?.focus();
          }
          break;
        
        case 'Home':
          event.preventDefault();
          currentFocusIndex.current = 0;
          focusableArray[0]?.focus();
          break;
        
        case 'End':
          event.preventDefault();
          currentFocusIndex.current = focusableArray.length - 1;
          focusableArray[focusableArray.length - 1]?.focus();
          break;
      }
    };

    // Set initial focus to first element
    const focusableElements = containerRef.current?.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement)?.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [itemCount]);

  return (
    <div ref={containerRef} tabIndex={-1}>
      {children}
    </div>
  );
} 