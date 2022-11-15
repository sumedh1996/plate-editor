import { useEditorRef } from '@udecode/plate';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEditorContext } from '../../../../context/EditorContext';
import PopupMenu from './PopupMenu';

interface ISideToolbarProps {
  node: Element | DocumentFragment | null;
  setNode: React.Dispatch<
    React.SetStateAction<Element | DocumentFragment | null>
  >;
}

const SideToolBar: React.FC<ISideToolbarProps> = ({ node, setNode }) => {
  const [visible, setVisible] = useState(false);
  const { setEditorLocation, editorLocation } = useEditorContext();
  const editor = useEditorRef();

  useEffect(() => {
    setEditorLocation(editor.selection);

    return () => {
      setVisible(false);
    };
  }, [editor.selection, setEditorLocation, node]);

  if (!node) {
    return null;
  }

  return createPortal(
    <PopupMenu visible={visible} setVisible={setVisible} setNode={setNode} />,
    node
  );
};

export default SideToolBar;
