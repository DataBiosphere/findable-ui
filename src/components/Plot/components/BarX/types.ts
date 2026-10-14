import { PlotOptions } from "@observablehq/plot";
import { BaseComponentProps, TestIdProps } from "../../../types";

/**
 * Props for the BarX component.
 */
export interface BarXProps extends BaseComponentProps, TestIdProps {
  options?: PlotOptions;
}
