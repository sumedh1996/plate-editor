/* eslint-disable */
import React, { useContext, useEffect } from "react";
import { Tooltip } from "antd";
import {
  BlockToolbarButton,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_OL,
  ELEMENT_UL,
  getPluginType,
  ListToolbarButton,
  MarkToolbarButton,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
  usePlateEditorRef,
  useEventPlateId,
  ELEMENT_HR,
  LinkToolbarButton,
  useEditorRef,
} from "@udecode/plate";
import { ReactEditor } from "slate-react";
import { useMyPlateEditorRef } from "../../types/PlateTypes";
// import HeadingIcon from "@/../../public/H1.svg";
// import QuoteIcon from "@/../../public/blockquote.svg";
// import HeadingTwoIcon from "@/../../public/h2.svg";
// import CodeIcon from "@/../../public/codeblock.svg";
// import InlineCodeIcon from "@/../../public/inlinecode.svg";
// import OLIcon from "@/../../public/OL.svg";
// import ULIcon from "@/../../public/UL.svg";
// import BoldIcon from "@/../../public/Bold.svg";
// import ItalicIcon from "@/../../public/italics.svg";
// import UnderlineIcon from "@/../../public/underline.svg";
// import LinkIcon from "@/../../public/link.svg";
// import EmojiButton from "./EmojiPanel";
// import Shortcuts from "../elements/shortcuts";
// import { ToolbarCodeBlock } from "../elements/ToolBarCodeBlock";
// import { EditorContext } from "@/Context/EditorContext";

let OSName: string | undefined;
if (typeof navigator !== "undefined") {
  if (navigator.appVersion.indexOf("Mac") != -1) {
    OSName = "Mac";
  } else {
    OSName = "Win";
  }
}

export const ToolbarButtonsBasicElements = React.memo(() => {
  const editor = usePlateEditorRef(useEventPlateId("focus"));

  return (
    <>
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H1)}
        icon={
          <div>
            <h1>H1</h1>
          </div>
        }
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H2)}
        icon={<h1>H2</h1>}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<h1>Q</h1>}
      />
      {/* <ToolbarCodeBlock
        icon={
          <Tooltip
            getPopupContainer={(trigger) =>
                                  trigger.parentNode as HTMLElement
                                }
            title="Code-block( ``` )"
          >
            <CodeIcon />
          </Tooltip>
        }
      /> */}
      <MarkToolbarButton
        type={getPluginType(editor, MARK_CODE)}
        icon={<h1>Inline</h1>}
      />
    </>
  );
});

export const ToolbarButtonsList = React.memo(() => {
  // const editor = useMyPlateEditorRef();
  const editor = useEditorRef();

  return (
    <>
      <ListToolbarButton
        type={getPluginType(editor, ELEMENT_UL)}
        icon={<h1>UL</h1>}
      />
      <ListToolbarButton
        type={getPluginType(editor, ELEMENT_OL)}
        icon={<h1>OL</h1>}
      />
    </>
  );
});

export const ToolbarButtonsBasicMarks = React.memo(() => {
  const editor = usePlateEditorRef(useEventPlateId("focus"));

  return (
    <>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<h1>B</h1>}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<h1>I</h1>}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<h1>U</h1>}
      />
    </>
  );
});

export const ToolbarButtons = React.memo(() => {
  const editor = usePlateEditorRef(useEventPlateId("focus"));
  //   const { setLinkLocation }: any = useContext(EditorContext);

  // useEffect(() => {
  //   ReactEditor.focus(editor);
  // }, []);

  function handleLink() {
    // setLinkLocation(editor.selection);
    console.log("Hello");
  }

  return (
    <>
      <ToolbarButtonsBasicElements />
      <ToolbarButtonsList />
      <ToolbarButtonsBasicMarks />
      <LinkToolbarButton icon={<p>Link</p>} />
      {/* <EmojiButton />
      <Shortcuts /> */}
    </>
  );
});
