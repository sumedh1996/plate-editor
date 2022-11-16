import { EmbedElement } from './../elements/EmbedElement';
import { ELEMENT_MEDIA_EMBED, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate';
import {
  CodeBlockElement,
  createPlateUI,
  ELEMENT_CODE_BLOCK,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  StyledElement,
  withProps,
} from '@udecode/plate';

import { HRElement } from '../elements/HRElement';
import { ImageElement } from '../elements/ImageElement';

export const plateUI = createPlateUI({
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    as: 'p',
    styles: {
      root: {
        position: 'relative',
        margin: 0,
        padding: '4px 0',
      },
    },
    prefixClassNames: 'p',
  }),
  [ELEMENT_HR]: HRElement,
  [ELEMENT_OL]: withProps(StyledElement, {
    as: 'ol',
    styles: {
      root: {
        listStyle: 'decimal',
      },
    },
  }),
  [ELEMENT_UL]: withProps(StyledElement, {
    as: 'ol',
    styles: {
      root: {
        listStyle: 'disc',
      },
    },
  }),
  [ELEMENT_IMAGE]: withProps(ImageElement, {
    nodeProps: {
      class: 'tealfeed-blog-image',
    },
    // @ts-ignore
    styles: {
      root: {
        margin: 'auto',
      },
      img: {
        width: '100%',
        margin: 'auto',
      },
    },
  }),
  [ELEMENT_MEDIA_EMBED]: EmbedElement,
});
