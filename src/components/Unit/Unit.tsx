import React from 'react';
import Director, { type DirectorProps } from '../Director';

type DirectorPropsWithoutChildren = Omit<DirectorProps, 'children'> & {
  padding0?: boolean;
};

interface UnitProps {
  first?: DirectorPropsWithoutChildren;
  second?: DirectorPropsWithoutChildren;
  children: React.ReactNode;
}

const Unit: React.FC<UnitProps> = ({ first = {}, second = {}, children }) => {
  // Für das zweite Element: widthMax automatisch paddingX hinzufügen, es sei denn padding0 ist explizit gesetzt
  const secondProps = { ...second };
  if (secondProps.widthMax && !secondProps.padding0) {
    secondProps.paddingX = true;
  }
  
  // padding0 aus den Props entfernen, da es nicht an Director weitergegeben werden soll
  const { padding0, ...secondPropsWithoutPadding0 } = secondProps;

  return (
    <Director
      as="section"
      {...first}
      data-get_colordom={first.colorDom ? '' : undefined}
    >
      <Director
        direction="v 1 1"
        {...secondPropsWithoutPadding0}
      >
        {children}
      </Director>
    </Director>
  );
};

export default Unit; 