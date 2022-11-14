import { StyledElementProps } from '@udecode/plate';
import React from 'react';
import { CSSProp } from 'styled-components';
// import { useFocused, useSelected } from 'slate-react';
// import { HrElementProps } from './HrElement.types';

export interface HrElementProps
  extends StyledElementProps<{}, { hr: CSSProp }> {}

export const HRElement = (props: HrElementProps) => {
  const { attributes, children, nodeProps } = props;

  // const selected = useSelected();
  // const focused = useFocused();

  return (
    <div {...attributes}>
      <hr
        contentEditable={false}
        {...nodeProps}
        style={{
          borderTop: '1px solid #008080',
          marginTop: '26px',
          marginBottom: '26px',
        }}
      />
      {children}
    </div>
  );
};
