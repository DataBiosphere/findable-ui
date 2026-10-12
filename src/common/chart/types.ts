import { ChartSortOptions } from "./sort/types";

/**
 * Chart configuration.
 */
export interface Chart {
  enable: boolean;
  sortBy?: ChartSortOptions;
}
