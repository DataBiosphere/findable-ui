import { TableState } from "@tanstack/react-table";
import { DataDictionaryConfig } from "../../../common/entities";
import { initPaginationState } from "../../../components/Table/coreOptions/state/pagination/utils";
import { DictionariesContext } from "../dictionaries/types";

/**
 * Initializes the dictionaries context.
 * @param dataDictionaries - The data dictionary configs.
 * @returns The initialized dictionaries context.
 */
export function initDictionaries(
  dataDictionaries: DataDictionaryConfig[]
): DictionariesContext {
  return dataDictionaries.reduce((acc, { path, tableOptions }) => {
    acc[path] = {
      query: { dictionary: path },
      state: initState(tableOptions),
    };
    return acc;
  }, {} as DictionariesContext);
}

/**
 * Initializes the dictionary state (TanStack Table state).
 * @param tableOptions - The table options.
 * @returns The initialized dictionary state.
 */
function initState(
  tableOptions: DataDictionaryConfig["tableOptions"]
): Partial<TableState> {
  const { initialState } = tableOptions;

  return {
    columnFilters: [],
    ...initialState,
    ...initPaginationState(initialState),
  };
}
