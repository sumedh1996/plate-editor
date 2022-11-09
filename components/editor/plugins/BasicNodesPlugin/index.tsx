import { plateUI } from "../../common/plateUi";
import { createMyPlugins } from "../../types/PlateTypes";
import { basicElementsPlugins } from "../BasicElementPlugin";
import { basicMarksPlugins } from "../BasicMarkPlugin";

export const basicNodesPlugins = createMyPlugins(
  [...basicElementsPlugins, ...basicMarksPlugins],
  {
    components: plateUI,
  }
);
