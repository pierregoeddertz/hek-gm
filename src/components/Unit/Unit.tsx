import React from 'react';
import Director, { type DirectorProps } from '../Director';

type DirectorPropsWithoutChildren = Omit<DirectorProps, 'children'>;

interface UnitProps {
  first?: DirectorPropsWithoutChildren;
  second?: DirectorPropsWithoutChildren;
  children: React.ReactNode;
}

const Unit: React.FC<UnitProps> = ({ first = {}, second = {}, children }) => {
  return (
    <Director
      as="section"
      {...first}
    >
      <Director
        direction="v 1 1"
        {...second}
      >
        {children}
      </Director>
    </Director>
  );
};

export default Unit; 