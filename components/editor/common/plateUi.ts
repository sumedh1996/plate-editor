import {
  CodeBlockElement,
  createPlateUI,
  ELEMENT_CODE_BLOCK,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_PARAGRAPH,
  MediaEmbedElement,
  StyledElement,
  withProps,
} from "@udecode/plate";

export const plateUI = createPlateUI({
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    as: "p",
    styles: {
      root: {
        position: "relative",
        margin: 0,
        padding: "4px 0",
      },
    },
    prefixClassNames: "p",
  }),
  [ELEMENT_MEDIA_EMBED]: withProps(MediaEmbedElement, {
    styles: {
      input: {
        display: "none",
      },
    },
  }),
});
