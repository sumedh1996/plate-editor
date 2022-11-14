import React, { useEffect, useRef, useState } from 'react';
import {
  createAlignPlugin,
  createDeserializeDocxPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontFamilyPlugin,
  createFontSizePlugin,
  createFontWeightPlugin,
  createHorizontalRulePlugin,
  createImagePlugin,
  createIndentListPlugin,
  createIndentPlugin,
  createLineHeightPlugin,
  createTablePlugin,
  createTextIndentPlugin,
  createDeserializeCsvPlugin,
  Plate,
  createSoftBreakPlugin,
  HeadingToolbar,
  ELEMENT_PARAGRAPH,
  TEditableProps,
  createParagraphPlugin,
} from '@udecode/plate';
import { createJuicePlugin } from '@udecode/plate-juice';
// import { editableProps } from './common/editableProps';
import { createMyPlugins, MyValue } from './types/PlateTypes';
import { lineHeightPlugin } from './plugins/LineHeightPlugin';
import { alignPlugin } from './plugins/AlignPlugin';
import { indentPlugin } from './plugins/IndentPlugin';
import { plateUI } from './common/plateUi';
import { basicNodesPlugins } from './plugins/BasicNodesPlugin';
import { softBreakPlugin } from './plugins/SoftBreakPlugin';
import { ToolbarButtons } from './config/Toolbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Menu from './config/Menu';
import { useEditorContext } from '../../context/EditorContext';

const NewEditor = () => {
  const [node, setNode] = useState<Node | null>();
  const { editorLocation } = useEditorContext();
  console.log({ editorLocation });
  const containerRef = useRef(null);

  const editableProps: TEditableProps<MyValue> = {
    spellCheck: true,
    autoFocus: false,
    readOnly: false,
    placeholder: 'Type…',
    onMouseUp: () => {
      const selection = window.getSelection();
      let container = selection?.focusNode;
      while (
        container &&
        container.parentElement &&
        !container?.parentElement?.classList?.contains('slate-ImageElement') &&
        container.parentElement.nodeName.toLowerCase() !== 'p'
      ) {
        container = container.parentElement;
      }
      if (container?.parentElement?.nodeName.toLowerCase() !== 'p') {
        container = null;
      } else {
        container = container.parentElement;
      }
      if (
        selection?.focusNode?.nodeValue?.trim() ||
        container?.nodeName.toLowerCase() !== 'p'
      ) {
        setNode(null);
      } else {
        setNode(container);
      }
    },
  };

  const plugins = createMyPlugins(
    [
      ...basicNodesPlugins,
      createImagePlugin(),
      createHorizontalRulePlugin(),
      createLineHeightPlugin(lineHeightPlugin),
      createParagraphPlugin(),
      // createLinkPlugin(),
      createTablePlugin(),
      createAlignPlugin(alignPlugin),
      createFontBackgroundColorPlugin(),
      createFontFamilyPlugin(),
      createFontColorPlugin(),
      createFontSizePlugin(),
      createFontWeightPlugin(),
      createIndentListPlugin(),
      createIndentPlugin(indentPlugin),
      createTextIndentPlugin(),
      createDeserializeDocxPlugin(),
      createSoftBreakPlugin(softBreakPlugin),
      createDeserializeCsvPlugin(),
      createJuicePlugin(),
    ],
    {
      components: plateUI,
    }
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={containerRef} style={{ position: 'relative' }}>
        <Plate
          editableProps={editableProps}
          plugins={plugins}
          onChange={(e) => console.log(e)}
          // initialValue={[{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }]}
        >
          {/* {node && <div className='absolute top-10 left-2 bottom-0'>Popup</div>} */}
          {node && <Menu node={node} />}
          <div className='z-10 fixed top-0 left-0 w-full bg-red-400 pt-2'>
            <HeadingToolbar
              style={{
                border: 'none',
              }}
            >
              <div className='w-1/2 mx-auto z-10 rounded-lg flex items-center justify-around flex-wrap pt-12 xl:pt-0'>
                <ToolbarButtons />
              </div>
            </HeadingToolbar>
          </div>
        </Plate>
      </div>
    </DndProvider>
  );
};

export default NewEditor;
