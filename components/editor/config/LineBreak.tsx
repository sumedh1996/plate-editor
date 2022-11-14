/* eslint-disable */
import React, { useContext } from 'react';
import { useEditorRef } from '@udecode/plate-core';
import { ELEMENT_HR, insertNodes } from '@udecode/plate';
import { useEditorContext } from '../../../context/EditorContext';

const LineBreakBtn = ({ setNode }) => {
  const editor = useEditorRef();
  const { editorLocation }: any = useEditorContext();

  function insertBreak() {
    insertNodes(
      editor,
      {
        type: ELEMENT_HR,
        children: [{ text: '' }],
      },
      {
        at: editorLocation ? editorLocation.anchor : [0, 0],
      }
      // [
      //   {
      //     type: ELEMENT_HR,
      //     inline: true,
      //     children: [{ text: '' }],
      //   },
      // ],
      // {
      //   at: editorLocation ? editorLocation.anchor : [0, 0],
      // }
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
      <span>Line Break</span>&nbsp;&nbsp;
      <span>
        <p>HR</p>
      </span>
    </span>
  );
};

export default LineBreakBtn;
