'use client';

import React from 'react';

export default function ComingSoon() {
  return (
    <div className="coming-soon-root">
      <h1>Coming Soon</h1>
      <p>Unsere neue Website ist bald für Sie verfügbar.</p>
      <style jsx>{`
        .coming-soon-root {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        h1 {
          font-size: 2.5rem;
          font-family: 'Outfit', Arial, sans-serif;
          color: #222;
          margin: 0 0 0.5rem 0;
        }
        p {
          color: #444;
          font-size: 1.1rem;
          text-align: center;
          margin: 0 0 1.5rem 0;
        }
        @media (max-width: 600px) {
          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
} 