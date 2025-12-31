import { InitialArgs } from "../../initializer/types";
import { TablesState } from "../types";

/**
 * Initializes the table key, table group key registry.
 * @param initialArgs - Initial arguments.
 * @returns The initialized registry.
 */
export function initRegistry(
  initialArgs: InitialArgs,
): TablesState["registry"] {
  const registry: TablesState["registry"] = {};

  for (const [tableKey, { groupKey }] of Object.entries(initialArgs)) {
    registry[tableKey] = { groupKey };
  }

  return registry;
}
