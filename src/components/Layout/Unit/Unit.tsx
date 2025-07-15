import React from 'react';
import Director from '../Director';
import styles from './Unit.module.css';

interface UnitProps {
  children: React.ReactNode;
  layout?: string;
  className?: string;
}

export default function Unit({
  children,
  layout = "vertical 1 b",
  className = '',
}: UnitProps) {
  return (
    <section className={styles.container}>
      <Director layout={layout} className={className}>
        {children}
      </Director>
    </section>
  );
} 