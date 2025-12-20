import { RangeCategoryView } from "../../../../common/categories/views/range/types";
import { RANGE_OPERATOR } from "./hooks/UseFilterRange/types";

/**
 * Returns the range operator based on the selected values.
 * @param categoryView - View model of range category.
 * @returns The range operator or undefined if no valid range is selected.
 */
export function getRangeOperator(
  categoryView: Pick<RangeCategoryView, "selectedMax" | "selectedMin">,
): RANGE_OPERATOR | undefined {
  const { selectedMax, selectedMin } = categoryView;
  if (selectedMin && selectedMax) return RANGE_OPERATOR.BETWEEN;
  if (selectedMin) return RANGE_OPERATOR.GREATER_THAN;
  if (selectedMax) return RANGE_OPERATOR.LESS_THAN;
}
