import React, { useState } from "react";
import { Popover } from "antd";
// import { useTheme } from 'next-themes';

interface BtnProps {
  text: string;
}

let OSName;
if (typeof navigator !== "undefined") {
  if (navigator.appVersion.indexOf("Mac") != -1) {
    OSName = "Mac";
  } else {
    OSName = "Win";
  }
}

const BtnWrapper = ({ text }: BtnProps) => (
  <button
    type="button"
    style={{
      padding: "5px 8px",
      background: "var(--focused-background)",
      borderRadius: "4px",
      margin: "2px",
      fontSize: "14px",
    }}
  >
    {text === "Ctrl" ? (OSName === "Mac" ? "Cmd" : "Ctrl") : text}
  </button>
);

const normalShortcuts = [
  {
    shortcut: (
      <>
        <BtnWrapper text="Ctrl" />
        <span>+</span>
        <BtnWrapper text="E" />
      </>
    ),
    render: <span>Inline Code</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="Ctrl" />
        <span>+</span>
        <BtnWrapper text="B" />
      </>
    ),
    render: <span>Bold</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="Ctrl" />
        <span>+</span>
        <BtnWrapper text="I" />
      </>
    ),
    render: <span>Italics</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="Ctrl" />
        <span>+</span>
        <BtnWrapper text="U" />
      </>
    ),
    render: <span>Underline</span>,
  },
];

const mdShortcuts = [
  {
    shortcut: (
      <>
        <BtnWrapper text="#" />
        <BtnWrapper text="Space" />
      </>
    ),
    render: <span>H1 header</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="#" />
        <BtnWrapper text="#" />
        <BtnWrapper text="Space" />
      </>
    ),
    render: <span>H2 header</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text=">" />
        <BtnWrapper text="Space" />
      </>
    ),
    render: <span>Blockquote</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="`" />
        <BtnWrapper text="`" />
        <BtnWrapper text="`" />
      </>
    ),
    render: <span>Codeblock</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="- / *" />
        <BtnWrapper text="Space" />
      </>
    ),
    render: <span>Unordered List</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="1" />
        <BtnWrapper text="." />
        <BtnWrapper text="Space" />
      </>
    ),
    render: <span>Ordered List</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="*" />
        <span>Italic</span>
        <BtnWrapper text="*" />
      </>
    ),
    render: <span>Italic</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="`" />
        <span>Code</span>
        <BtnWrapper text="`" />
      </>
    ),
    render: <span>Inline Code</span>,
  },
  {
    shortcut: (
      <>
        <BtnWrapper text="**" />
        <span>Bold</span>
        <BtnWrapper text="**" />
      </>
    ),
    render: <span>Bold</span>,
  },
];

const Content = () => (
  <div
    className="h-96"
    style={{
      overflow: "scroll !important",
    }}
  >
    <div
      style={{
        color: "var(--article-body)",
      }}
      className=" h-1/6 w-64 flex items-center"
    >
      Normal shortcuts
    </div>
    {normalShortcuts.map((element) => (
      <div
        style={{
          color: "var(--article-body)",
        }}
        className=" h-1/6 w-64 flex items-center"
      >
        <span className="w-1/2">{element.shortcut}</span>
        <span>{element.render}</span>
      </div>
    ))}
    <div
      style={{
        color: "var(--article-body)",
      }}
      className=" h-1/6 w-64 flex items-center"
    >
      Markdown shortcuts
    </div>
    {mdShortcuts.map((element) => (
      <div
        style={{
          color: "var(--article-body)",
        }}
        className=" h-1/6 w-64 flex items-center"
      >
        <span className="w-1/2">{element.shortcut}</span>
        <span>{element.render}</span>
      </div>
    ))}
  </div>
);

export default function Shortcuts() {
  //   const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Popover
      placement="bottomLeft"
      content={Content}
      trigger="click"
      getPopupContainer={(trigger) => trigger.parentElement}
      //   color={theme === 'dark' ? '#212121' : '#ffffff'}
      color={"#ffffff"}
      onVisibleChange={(value) => setExpanded(value)}
    >
      <span
        className={expanded ? "shortcut-btn-active" : "shortcut-btn"}
        style={{
          width: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--article-body)",
          fontSize: "14px",
        }}
      >
        Shortcuts{" "}
        <span className="ml-1">
          <p>?</p>
        </span>
      </span>
    </Popover>
  );
}
