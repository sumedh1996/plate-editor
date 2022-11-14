import React from "react";
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
} from "@udecode/plate";
import { createJuicePlugin } from "@udecode/plate-juice";
import { editableProps } from "./common/editableProps";
import { createMyPlugins, MyValue } from "./types/PlateTypes";
import { lineHeightPlugin } from "./plugins/LineHeightPlugin";
import { alignPlugin } from "./plugins/AlignPlugin";
import { indentPlugin } from "./plugins/IndentPlugin";
import { plateUI } from "./common/plateUi";
import { basicNodesPlugins } from "./plugins/BasicNodesPlugin";
import { softBreakPlugin } from "./plugins/SoftBreakPlugin";
import { ToolbarButtons } from "./config/Toolbar";

const plugins = createMyPlugins(
  [
    ...basicNodesPlugins,
    createImagePlugin(),
    createHorizontalRulePlugin(),
    createLineHeightPlugin(lineHeightPlugin),
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

const NewEditor = () => (
  <div
    className="mx-auto my-9 w-full h-5/6 md:w-6/6 pb-4 px-2"
    id="rich-editor-tealfeed"
  >
    <Plate<MyValue>
      editableProps={editableProps}
      plugins={plugins}
      onChange={(e) => console.log(e)}
    >
      <div className="z-10 fixed top-0 left-0 w-full pt-2">
        <HeadingToolbar
          style={{
            border: "none",
          }}
        >
          <div className="w-1/2 mx-auto z-10 rounded-lg flex items-center justify-around flex-wrap pt-12 xl:pt-0 bg-red-400">
            <ToolbarButtons />
          </div>
        </HeadingToolbar>
      </div>
    </Plate>
  </div>
);

export default NewEditor;
