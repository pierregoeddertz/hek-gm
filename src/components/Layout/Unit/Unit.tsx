import React from 'react';
import Director from '../Director';
import styles from './Unit.module.css';

interface UnitProps extends React.ComponentProps<typeof Director> {
  children: React.ReactNode;
}

export default function Unit({
  children,
  className,
  identity,
  ...rest
}: UnitProps) {
  // Extrahiere colorD und colorL aus identity
  const isColorD = identity?.includes('colorD');
  const isColorL = identity?.includes('colorL');
  
  // Erstelle identity für das erste Director (nur colorD/colorL)
  const firstIdentity = [isColorD && 'colorD', isColorL && 'colorL'].filter(Boolean).join(' ');
  
  // Erstelle identity für das zweite Director (alles außer colorD/colorL)
  const secondIdentity = identity?.replace(/color[DL]/g, '').trim() || '';
  
  return (
    <Director
      as="section"
      className={styles.core}
      identity={firstIdentity}
      data-colorreverse={isColorD ? true : undefined}
      data-applycolorreverse={isColorD ? true : undefined}
    >
      <Director
        identity={secondIdentity}
        className={className}
        {...rest}
      >
        {children}
      </Director>
    </Director>
  );
} 