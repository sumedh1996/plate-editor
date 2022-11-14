/* eslint-disable */
import React from 'react';
import { ELEMENT_DEFAULT, useEditorRef } from '@udecode/plate-core';
import { ELEMENT_HR, insertNodes } from '@udecode/plate';
import { useEditorContext } from '../../../context/EditorContext';

const LineBreakBtn: React.FC<{
  setNode: React.Dispatch<
    React.SetStateAction<Element | DocumentFragment | null>
  >;
}> = ({ setNode }) => {
  const editor = useEditorRef();
  const { editorLocation } = useEditorContext();

  function insertBreak() {
    insertNodes(
      editor,
      [
        {
          type: ELEMENT_HR,
          inline: true,
          children: [{ text: '' }],
        },
        {
          type: ELEMENT_DEFAULT,
          children: [{ text: '' }],
        },
      ],
      {
        at: editorLocation ? editorLocation.anchor : [0, 0],
      }
    );

    setNode(null);
  }

  return (
    <span
      onClick={insertBreak}
      style={{
        display: 'flex',
        alignItems: 'center',
        color: 'var(--article-body)',
      }}
    >
      {/* <span>Line Break</span>&nbsp;&nbsp; */}
      <span>
        <p>HR</p>
      </span>
    </span>
  );
};

export default LineBreakBtn;
