import { PlotOptions } from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../../../common/entities";
import { TestIdProps } from "../../../../../../../../types";

/**
 * Props for the Chart component.
 */
export interface ChartProps
  extends Required<Pick<PlotOptions, "width">>, TestIdProps {
  selectCategoryValueViews: SelectCategoryValueView[];
}
