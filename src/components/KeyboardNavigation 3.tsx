'use client';

import { useEffect } from 'react';
import { initKeyboardNavigation } from '../lib/keyboard-navigation';

export default function KeyboardNavigation() {
  useEffect(() => {
    const cleanup = initKeyboardNavigation();
    return cleanup;
  }, []);

  return null; // Diese Komponente rendert nichts
} 