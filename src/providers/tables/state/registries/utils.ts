import { TableKey } from "../tables/types";
import { TablesState } from "../types";

/**
 * Asserts that a registry exists for the given table key.
 *
 * @param state - State.
 * @param tableKey - Table key.
 */
export function assertRegistry(
  state: TablesState,
  tableKey: TableKey,
): asserts tableKey is TableKey {
  if (!state.registry[tableKey])
    throw new Error(`No registry found for table key: ${tableKey}`);
}
