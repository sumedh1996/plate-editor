/* eslint-disable */
import * as React from 'react';
import {
  CodeBlockInsertOptions,
  ELEMENT_CODE_BLOCK,
} from '@udecode/plate-code-block';
import { getPreventDefaultHandler } from '@udecode/plate';
import { getPluginType, useEditorRef } from '@udecode/plate-core';
import { ToolbarButtonProps } from '@udecode/plate';
import { toggleCodeBlock } from '@udecode/plate-code-block';
import { BlockToolbarButton } from '@udecode/plate';

export const ToolbarCodeBlock = ({
  options,
  ...props
}: ToolbarButtonProps & {
  options?: CodeBlockInsertOptions;
}) => {
  // const editor = usePlateEditorRef(usePlateEventId('focus'));
  const editor = useEditorRef();

  return (
    <BlockToolbarButton
      // type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
      type={getPluginType(editor, ELEMENT_CODE_BLOCK)}
      onMouseDown={
        editor &&
        // @ts-ignore
        getPreventDefaultHandler(toggleCodeBlock, editor, {
          insertNodesOptions: { select: true },
          ...options,
        })
      }
      {...props}
    />
  );
};
