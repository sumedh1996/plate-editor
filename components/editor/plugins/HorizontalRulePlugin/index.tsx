import { ELEMENT_HR } from '@udecode/plate';
import { createMyPluginFactory } from '../../types/PlateTypes';

export const createHorizontalRulePlugin = createMyPluginFactory({
  key: ELEMENT_HR,
  isElement: true,
  isVoid: true,
});
