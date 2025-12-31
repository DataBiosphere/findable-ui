import { TableKey } from "../tables/types";

/**
 * Asserts that a registry exists for the given table key.
 * @param tableKey - Table key.
 */
export function assertRegistry(tableKey: TableKey): void {
  if (!tableKey)
    throw new Error(`No registry found for table key: ${tableKey}`);
}
