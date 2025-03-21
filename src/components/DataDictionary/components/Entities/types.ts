import { Class } from "../../../../common/entities";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";

export interface ClassesProps {
  classes: Class[];
  spacing?: LayoutSpacing;
}
