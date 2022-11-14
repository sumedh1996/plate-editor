import { PlateRenderElementProps, TElement } from '@udecode/plate';
import React from 'react';
import { MyValue } from '../types/PlateTypes';

export const HRElement = ({
  attributes,
  children,
}: PlateRenderElementProps<MyValue, TElement>) => (
  <div {...attributes} contentEditable={false}>
    <hr
      style={{
        height: 2,
        background: '#008080',
        marginTop: '26px',
        marginBottom: '26px',
      }}
    />
    {children}
  </div>
);
