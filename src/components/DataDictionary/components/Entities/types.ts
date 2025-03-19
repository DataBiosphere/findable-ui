import { Class } from "../../../../common/entities";
import { LayoutMetrics } from "../../hooks/UseLayoutMetrics/types";

export interface ClassesProps {
  classes: Class[];
  metrics?: LayoutMetrics;
}
