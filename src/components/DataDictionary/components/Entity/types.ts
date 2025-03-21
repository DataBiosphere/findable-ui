import { Class } from "../../../../common/entities";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";

export interface EntityProps {
  class: Class;
  spacing?: LayoutSpacing;
}
