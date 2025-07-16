import React from 'react';
import Director from '../Director';
import styles from './Unit.module.css';

interface UnitProps {
  children: React.ReactNode;
  layout?: string;
  className?: string;
  clrl?: boolean;
  clrd?: boolean;
}

export default function Unit({
  children,
  layout = "vertical 1 b",
  className = '',
  clrl,
  clrd,
}: UnitProps) {
  const dataClr = clrl ? 'clrl' : clrd ? 'clrd' : undefined;
  return (
    <section
      className={[
        styles.container,
        clrd ? styles.clrd : '',
        clrl ? styles.clrl : '',
      ].filter(Boolean).join(' ')}
      data-clr={dataClr}
    >
      <Director layout={layout} className={className}>
        {children}
      </Director>
    </section>
  );
} 