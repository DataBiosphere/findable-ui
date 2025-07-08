import { PlotOptions } from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../../../common/entities";
import { TestIdProps } from "../../../../../../../../types";

export interface ChartProps
  extends Required<Pick<PlotOptions, "width">>,
    TestIdProps {
  selectCategoryValueViews: SelectCategoryValueView[];
}
