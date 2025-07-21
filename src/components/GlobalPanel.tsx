"use client";

import { useEffect, useRef } from "react";
import Button from '@/components/Foundations/Button/Button';

function Menu() {
  return (
    <nav className="menu-panel">
      <div>
        <div className="menu-logo">
          <svg width="100" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="45" fontFamily="Outfit, Arial, sans-serif" fontWeight="bold" fontSize="48" fill="#FF4D19">HEK</text>
          </svg>
        </div>
        <hr className="menu-line" />
        <div className="menu-section">
          <div className="menu-section-title">Über uns</div>
          <Button text="Home" href="/" className="menu-btn" />
          <Button text="News" href="/news" className="menu-btn" />
        </div>
        <div className="menu-section" style={{ marginTop: '2.5rem' }}>
          <div className="menu-section-title">Produkte</div>
          <Button text="Aeroleaf" href="/aeroleaf" className="menu-btn" />
          <Button text="Smartflower" href="/smartflower" className="menu-btn" />
        </div>
      </div>
      <div />
    </nav>
  );
}

function ContactForm() {
  return <div>Kontaktformular (Platzhalter)</div>;
}

export default function GlobalPanel({ type, isOpen, onClose }: { type: "menu" | "contact"; isOpen: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  }

  return (
    <>
      {/* Overlay bleibt bedingt, Panel bleibt immer im DOM für Animation */}
      {isOpen && (
        <div
          className="global-panel-overlay"
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 1999,
            transition: "opacity var(--anm)",
          }}
          aria-label="Overlay zum Schließen des Panels"
        />
      )}
      <div
        ref={panelRef}
        className={`global-panel${isOpen ? " open" : ""}`}
        aria-modal="true"
        role="dialog"
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 24,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Schließen"
        >
          ×
        </button>
        <div style={{ padding: "2rem 1.5rem 1.5rem 1.5rem" }}>
          {type === "menu" ? <Menu /> : <ContactForm />}
        </div>
      </div>
      <style jsx>{`
        .global-panel {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 50vw;
          background: #fff;
          box-shadow: 2px 0 16px rgba(0,0,0,0.15);
          transform: translateX(-100%);
          transition: transform var(--anm);
          z-index: 2000;
          overflow-y: auto;
        }
        .global-panel.open {
          transform: translateX(0);
        }
        @media (max-width: 600px) {
          .global-panel {
            width: 100vw;
          }
        }
        .menu-panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100vh;
          gap: 0;
          width: 100%;
        }
        .menu-logo {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          margin-left: 0.5rem;
        }
        .menu-line {
          width: 100%;
          height: 2px;
          border: none;
          background: #e5e5e5;
          margin-bottom: 2.5rem;
        }
        .menu-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .menu-section-title {
          font-size: 1rem;
          opacity: 0.7;
          margin-bottom: 0.5rem;
        }
        .menu-btn {
          display: flex;
          align-items: center;
          font-size: 2.2rem;
          font-family: 'Outfit', Arial, sans-serif;
          font-weight: 400;
          background: none;
          border: none;
          color: #222;
          gap: 0.5rem;
          padding: 0.25rem 0;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: color 0.2s;
        }
        .menu-btn:hover {
          color: #FF4D19;
        }
        .menu-arrow {
          font-size: 1.5rem;
          margin-left: auto;
        }
      `}</style>
    </>
  );
} 