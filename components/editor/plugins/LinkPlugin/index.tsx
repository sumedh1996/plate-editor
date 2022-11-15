import { LinkPlugin, PlateFloatingLink } from "@udecode/plate";
import { MyPlatePlugin } from "../../types/PlateTypes";

export const linkPlugin: Partial<MyPlatePlugin<LinkPlugin>> = {
  renderAfterEditable: PlateFloatingLink,
};
