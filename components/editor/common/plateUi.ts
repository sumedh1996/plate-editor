import { ELEMENT_MEDIA_EMBED, ELEMENT_OL, ELEMENT_UL } from "@udecode/plate";
import {
  CodeBlockElement,
  createPlateUI,
  ELEMENT_CODE_BLOCK,
  ELEMENT_HR,
  ELEMENT_PARAGRAPH,
  StyledElement,
  withProps,
} from "@udecode/plate";
import { HRElement } from "../elements/HRElement";

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
  [ELEMENT_HR]: HRElement,
  [ELEMENT_OL]: withProps(StyledElement, {
    as: "ol",
    styles: {
      root: {
        listStyle: "decimal",
      },
    },
  }),
  [ELEMENT_UL]: withProps(StyledElement, {
    as: "ol",
    styles: {
      root: {
        listStyle: "disc",
      },
    },
  }),
});
