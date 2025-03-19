import { Class } from "../../../../common/entities";
import { LayoutMetrics } from "../../hooks/UseLayoutMetrics/types";

export interface EntityProps {
  class: Class;
  metrics?: LayoutMetrics;
}
