import { PlotOptions } from "@observablehq/plot";
import { BaseComponentProps, TestIdProps } from "../../../types";

export interface BarXProps extends BaseComponentProps, TestIdProps {
  options?: PlotOptions;
}
