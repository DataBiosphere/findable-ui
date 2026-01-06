import { RangeCategoryView } from "../../../../common/categories/views/range/types";
import { CategoryKey } from "../../../../common/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { BaseComponentProps } from "../../../types";
import { SURFACE_TYPE } from "../surfaces/types";

export interface FilterRangeProps
  extends Omit<RangeCategoryView, "key" | "label">, BaseComponentProps {
  categoryKey: CategoryKey;
  categoryLabel: string;
  categorySection?: string;
  onCloseFilter: () => void;
  onFilter: OnFilterFn;
  surfaceType: SURFACE_TYPE;
}
