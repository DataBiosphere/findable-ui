import { PlotOptions } from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../../common/entities";

export interface SummaryProps extends Required<Pick<PlotOptions, "width">> {
  data: SelectCategoryValueView[];
}
