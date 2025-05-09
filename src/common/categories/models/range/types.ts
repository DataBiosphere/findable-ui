import { CategoryKey } from "../../../entities";

/**
 * Internal filter model of a range category.
 */
export interface RangeCategory {
  key: CategoryKey;
  max: number;
  min: number;
  selectedMax: SelectedRange[1];
  selectedMin: SelectedRange[0];
}

/**
 * Min and max values selected in range category.
 */
export type SelectedRange = [number | null, number | null];
