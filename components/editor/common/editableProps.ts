import { TEditableProps } from '@udecode/plate';
import { MyValue } from '../types/PlateTypes';

export const editableProps: TEditableProps<MyValue> = {
  spellCheck: true,
  autoFocus: false,
  readOnly: false,
  placeholder: 'Type…',
};
