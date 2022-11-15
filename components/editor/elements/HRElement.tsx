import { PlateRenderElementProps, TElement, useFocus } from '@udecode/plate';
import React from 'react';
import { useSelected } from 'slate-react';
import { MyValue } from '../types/PlateTypes';

export const HRElement = ({
  attributes,
  children,
}: PlateRenderElementProps<MyValue, TElement>) => {
  const selected = useSelected();

  return (
    <div {...attributes} contentEditable={false}>
      <hr
        style={{
          height: 4,
          background: selected ? '#008080' : '#333',
          marginTop: '26px',
          marginBottom: '26px',
        }}
      />
      {children}
    </div>
  );
};
