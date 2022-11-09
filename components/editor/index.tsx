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
  Plate,
} from "@udecode/plate";
import { createJuicePlugin } from "@udecode/plate-juice";
import { editableProps } from "./common/editableProps";
import { createMyPlugins, MyValue } from "./types/PlateTypes";
import { lineHeightPlugin } from "./plugins/LineHeightPlugin";
import { alignPlugin } from "./plugins/AlignPlugin";
import { indentPlugin } from "./plugins/IndentPlugin";
import { plateUI } from "./common/plateUi";

const plugins = createMyPlugins(
  [
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
    createJuicePlugin(),
  ],
  {
    components: plateUI,
  }
);

const NewEditor = () => (
  <Plate<MyValue> editableProps={editableProps} plugins={plugins} />
);

export default NewEditor;
