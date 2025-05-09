import { RangeCategoryView } from "../../../../common/categories/views/range/types";
import { CategoryKey } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { BaseComponentProps } from "../../../types";

export interface FilterRangeProps
  extends Omit<RangeCategoryView, "key" | "label">,
    BaseComponentProps {
  categoryKey: CategoryKey;
  categoryLabel: string;
  categorySection?: string;
  isFilterDrawer: boolean;
  onCloseFilter: () => void;
  onFilter: OnFilterFn;
}
