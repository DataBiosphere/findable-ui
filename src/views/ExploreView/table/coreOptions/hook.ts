import { CoreOptions, RowData } from "@tanstack/react-table";
import { useConfig } from "../../../../hooks/useConfig";
import { useExploreState } from "../../../../hooks/useExploreState";
import { useCoreOptionsColumns } from "./columns/hook";
import { CORE_OPTIONS } from "./constants";
import { useCoreOptionsState } from "./state/hook";

/**
 * Returns the core options for the table.
 * @returns Core options for the table.
 */
export function useTableCoreOptions<T extends RowData>(): Omit<
  CoreOptions<T>,
  "initialState" | "onStateChange" | "renderFallbackValue"
> {
  const { entityConfig } = useConfig();
  const { exploreState } = useExploreState();
  const { columns } = useCoreOptionsColumns<T>();
  const { state } = useCoreOptionsState();
  const { getId: getRowId } = entityConfig;
  const { listItems: data = [] } = exploreState;
  return {
    ...CORE_OPTIONS,
    columns,
    data,
    getRowId,
    state,
  };
}
