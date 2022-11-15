import { PlateRenderElementProps, TElement, useFocus } from "@udecode/plate";
import React from "react";
import { useSelected } from "slate-react";
import { MyValue } from "../types/PlateTypes";

export const EmbedElement = ({
  attributes,
  children,
}: PlateRenderElementProps<MyValue, TElement>) => {
  const selected = useSelected();
  console.info("Embed ELement Called")

  return (
    <div {...attributes}>
      <iframe
        style={{
          minHeight: "26rem",
        }}
        // css={styles.iframe?.css}
        // className={styles.iframe?.className}
        title="embed"
        // src={`${url}${querySeparator}&title=0&byline=0&portrait=0`}
        // frameBorder="0"
        // width="100%"
        src="https://www.youtube.com/embed/YBw4zXysLJQ"
        // {...nodeProps}
      />
    </div>
  );
};
