import { TableState } from "@tanstack/react-table";
import { VIEW_KIND } from "../../../categories/views/types";
import { CategoryKey, CategoryValueKey } from "../../../entities";

export type GetPresetTableState = (
  presetKey: string,
) => Partial<TableState> | undefined;

export type OnFilterChange = (
  categoryKey: CategoryKey,
  selectedCategoryValue: CategoryValueKey,
  viewKind?: VIEW_KIND,
) => void;

export type OnFilterReset = () => void;

export interface UseTableFilters {
  onFilterChange: OnFilterChange;
  onFilterReset: OnFilterReset;
}

export interface UseTableFiltersOptions {
  getPresetTableState?: GetPresetTableState;
  onClearPreset?: () => void;
}
