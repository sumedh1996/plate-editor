import { EmbedElement } from "./../elements/EmbedElement";
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_LINK,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_OL,
  ELEMENT_UL,
} from "@udecode/plate";
import {
  CodeBlockElement,
  createPlateUI,
  ELEMENT_CODE_BLOCK,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  StyledElement,
  withProps,
} from "@udecode/plate";

import { HRElement } from "../elements/HRElement";
import { ImageElement } from "../elements/ImageElement";

export const plateUI = createPlateUI({
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    as: "p",
    styles: {
      root: {
        position: "relative",
        margin: 0,
        padding: "4px 0",
        color: "var(--text-error)",
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
  [ELEMENT_IMAGE]: withProps(ImageElement, {
    nodeProps: {
      class: "tealfeed-blog-image",
    },
    // @ts-ignore
    styles: {
      root: {
        margin: "auto",
      },
      img: {
        width: "100%",
        margin: "auto",
      },
    },
  }),
  [ELEMENT_MEDIA_EMBED]: EmbedElement,
  [ELEMENT_LINK]: withProps(StyledElement, {
    styles: {
      root: {
        color: "#008080",
      },
    },
  }),
  [ELEMENT_H1]: withProps(StyledElement, {
    styles: {
      root: {
        margin: "32 0 16 0",
        color: "var(--text-primary)",
        fontSize: "20rem",
        lineHeight: "2.5rem",
        fontFamily: "Roboto",
        fontWeight: 500,
      },
    },
  }),
  [ELEMENT_BLOCKQUOTE]: withProps(StyledElement, {
    styles: {
      root: {
        // --background-card: '#008080',
        backgroundColor: `{}`,
        // border-left: 5px solid var(--brandColor) !important;
        // background-color: var(--notification-active) !important;
        // padding: 20px !important;
        // margin: 24px 0 26px 0 !important;
        // color: var(--text-primary);
      },
    },
  }),
});
