import { PlotOptions } from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../../common/entities";
import { TestIdProps } from "../../../../../../../types";

export interface SummaryProps
  extends Required<Pick<PlotOptions, "width">>,
    TestIdProps {
  data: SelectCategoryValueView[];
}
