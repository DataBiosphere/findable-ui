import { RangeCategoryView } from "../../../../common/categories/views/range/types";
import { VIEW_KIND } from "../../../../common/categories/views/types";
import { CategoryTag } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { RANGE_OPERATOR } from "../FilterRange/hooks/UseFilterRange/types";
import { getRangeOperator } from "../FilterRange/utils";

/**
 * Returns set of filter tags with tag label (the selected range values) and corresponding Tag onRemove function.
 * @param categoryView - View model of range category.
 * @param onFilter - Function to execute on selection or removal of category value.
 * @returns Array of selected filter tags.
 */
export function buildRangeTag(
  categoryView: RangeCategoryView,
  onFilter: OnFilterFn
): CategoryTag[] {
  const rangeOperator = getRangeOperator(categoryView);
  if (!rangeOperator) return [];
  return [
    {
      label: buildRangeTagLabel(categoryView, rangeOperator),
      onRemove: () =>
        onFilter(
          categoryView.key,
          undefined,
          false,
          undefined,
          VIEW_KIND.RANGE
        ),
      superseded: false,
    },
  ];
}

/**
 * Returns the label for the range tag based on the selected values.
 * @param categoryView - View model of range category.
 * @param rangeOperator - The range operator.
 * @returns The label for the range tag.
 */
function buildRangeTagLabel(
  categoryView: RangeCategoryView,
  rangeOperator: RANGE_OPERATOR
): string {
  const { selectedMax, selectedMin } = categoryView;
  switch (rangeOperator) {
    case RANGE_OPERATOR.BETWEEN:
      return `${selectedMin} - ${selectedMax}`;
    case RANGE_OPERATOR.GREATER_THAN:
      return `> ${selectedMin}`;
    case RANGE_OPERATOR.LESS_THAN:
      return `< ${selectedMax}`;
    default:
      return "";
  }
}
