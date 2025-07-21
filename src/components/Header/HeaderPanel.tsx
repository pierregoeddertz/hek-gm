import React, { useEffect } from 'react';
import styles from './HeaderPanel.module.css';

interface HeaderPanelProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function HeaderPanel({ open, onClose, children }: HeaderPanelProps) {
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.classList.add('headerpanel-open');
    } else {
      html.classList.remove('headerpanel-open');
    }
    return () => {
      html.classList.remove('headerpanel-open');
    };
  }, [open]);

  return (
    <>
      <div
        className={open ? styles.overlay : `${styles.overlay} ${styles.overlayHidden}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={open ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Menü schließen">×</button>
        {children}
      </aside>
    </>
  );
} 