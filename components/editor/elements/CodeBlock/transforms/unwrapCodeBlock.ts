import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { unwrapNodes } from '@udecode/plate';
import { getPluginType, PlateEditor } from '@udecode/plate-core';
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from '../defaults';

export const unwrapCodeBlock = (
  editor: PlateEditor & HistoryEditor & ReactEditor
) => {
  unwrapNodes(editor, {
    match: { type: getPluginType(editor, ELEMENT_CODE_LINE) },
  });
  unwrapNodes(editor, {
    match: { type: getPluginType(editor, ELEMENT_CODE_BLOCK) },
    split: true,
  });
};
