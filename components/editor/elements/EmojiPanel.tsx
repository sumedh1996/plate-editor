/* eslint-disable */
import React, { useContext, useState } from "react";
import { ToolbarButton, useEditorRef } from "@udecode/plate";
import { Tooltip } from "antd";
import { useEditorContext } from "../../../context/EditorContext";

if (typeof window !== "undefined") {
  require("emoji-picker-element");
}

const Picker = () => {
  const ref: any = React.useRef(null);
  const editor = useEditorRef();
  // const { theme } = useTheme();

  React.useEffect(() => {
    ref.current.addEventListener("emoji-click", (event: any) => {
      console.log(event.detail.unicode);
      editor.insertText(event.detail.unicode);
    });
    const style = document.createElement("style");
    style.textContent = `
			.search-row{
				display: none;
			}
		`;
    ref.current.shadowRoot.appendChild(style);
    ref.current.skinToneEmoji = "👍";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.createElement("emoji-picker", {
    ref,
    // class: String(theme),
    id: "my-emoji-search",
  });
};

export default function EmojiButton() {
  const { emojiVisible, setEmojiVisible }: any = useEditorContext();

  function handleClick() {
    setEmojiVisible((prev) => !prev);
  }

  return (
    <div>
      <ToolbarButton
        icon={
          <Tooltip
            getPopupContainer={(trigger) => trigger.parentElement}
            title="Emoji"
          >
            <p>EM</p>
          </Tooltip>
        }
        onMouseDown={handleClick}
      />
      {emojiVisible ? (
        <div className="absolute">
          <Picker />
        </div>
      ) : null}
    </div>
  );
}
