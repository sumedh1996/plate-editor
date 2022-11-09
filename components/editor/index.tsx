import React from "react";
import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  Plate,
} from "@udecode/plate";
import { editableProps } from "./common/editableProps";
import { MyPlatePlugin, MyValue } from "./types/PlateTypes";

const plugins: MyPlatePlugin[] = [
  createParagraphPlugin(),
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),

  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
  createCodePlugin(),
];

const NewEditor = () => (
  <Plate<MyValue> editableProps={editableProps} plugins={plugins} />
);

export default NewEditor;
