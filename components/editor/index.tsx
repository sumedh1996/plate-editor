import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
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
  TEditableProps,
  createParagraphPlugin,
  createSelectOnBackspacePlugin,
  ELEMENT_HR,
  createMediaEmbedPlugin,
} from "@udecode/plate";
import { createJuicePlugin } from "@udecode/plate-juice";
import { createMyPlugins, MyValue } from "./types/PlateTypes";
import { lineHeightPlugin } from "./plugins/LineHeightPlugin";
import { alignPlugin } from "./plugins/AlignPlugin";
import { indentPlugin } from "./plugins/IndentPlugin";
import { plateUI } from "./common/plateUi";
import { basicNodesPlugins } from "./plugins/BasicNodesPlugin";
import { softBreakPlugin } from "./plugins/SoftBreakPlugin";
import { ToolbarButtons } from "./config/Toolbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SideToolbar from "./config/SideToolBar";

const NewEditor = () => {
  const [selectedNode, setSelectedNode] = useState<
    null | Element | DocumentFragment
  >(null);

  const containerRef = useRef(null);

  const editableProps: TEditableProps<MyValue> = {
    spellCheck: true,
    autoFocus: false,
    readOnly: false,
    placeholder: "Type…",
    onMouseUp: () => {
      const selection = window.getSelection();
      let container = selection?.focusNode;
      while (
        container &&
        container.parentElement &&
        !container?.parentElement?.classList?.contains("slate-ImageElement") &&
        container.parentElement.nodeName.toLowerCase() !== "p"
      ) {
        container = container.parentElement;
      }
      if (container?.parentElement?.nodeName.toLowerCase() !== "p") {
        container = null;
      } else {
        container = container.parentElement;
      }
      if (
        selection?.focusNode?.nodeValue?.trim() ||
        container?.nodeName.toLowerCase() !== "p"
      ) {
        setSelectedNode(null);
      } else {
        setSelectedNode(container as Element);
      }
    },
    onKeyDown: () => {
      setSelectedNode(null);
    },
    onKeyUp: () => {
      const selection = window.getSelection();
      // const visibility = checkVisible(selection?.anchorNode?.parentElement);
      // if (!visibility.visible) {
      //   const y =
      //     selection?.anchorNode?.parentElement.getBoundingClientRect().top +
      //     window.pageYOffset;
      //   if (visibility.bottom) {
      //     window.scrollTo({ top: y - 610, behavior: 'smooth' });
      //   } else {
      //     window.scrollTo({ top: y - 180, behavior: 'smooth' });
      //   }
      // }
      let container = selection?.focusNode;
      while (
        container &&
        container.parentNode &&
        !container?.parentElement?.classList?.contains("slate-ImageElement") &&
        container.parentNode.nodeName.toLowerCase() !== "p"
      ) {
        container = container.parentNode;
      }
      if (container?.parentElement?.nodeName.toLowerCase() !== "p") {
        container = null;
      } else {
        container = container.parentElement;
      }
      if (
        selection?.focusNode?.nodeValue?.trim() ||
        container?.nodeName.toLowerCase() !== "p"
      ) {
        setSelectedNode(null);
      } else {
        setSelectedNode(container as Element);
      }
    },
  };

  const plugins = createMyPlugins(
    [
      ...basicNodesPlugins,
      createImagePlugin(),
      createHorizontalRulePlugin(),
      createSelectOnBackspacePlugin({
        options: { query: { allow: [ELEMENT_HR] } },
      }),
      createLineHeightPlugin(lineHeightPlugin),
      createParagraphPlugin(),
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
      createMediaEmbedPlugin(),
    ],
    {
      components: plateUI,
    }
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={containerRef} style={{ position: "relative" }}>
        <Plate editableProps={editableProps} plugins={plugins}>
          <SideToolbar node={selectedNode} setNode={setSelectedNode} />
          <div className="z-10 fixed top-0 left-0 w-full bg-red-400 pt-2">
            <HeadingToolbar
              style={{
                border: "none",
              }}
            >
              <div className="w-1/2 mx-auto z-10 rounded-lg flex items-center justify-around flex-wrap pt-12 xl:pt-0">
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
