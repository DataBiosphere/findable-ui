import { initRegistry } from "../state/registries/initRegistry";
import { initTables } from "../state/tables/initTables";
import { TablesState } from "../state/types";
import { InitialArgs } from "./types";

/**
 * Initializer function for the tables reducer, returning initial state.
 * @param initialArgs - Initial arguments.
 * @returns The initialized tables state.
 */
export function initializer(initialArgs: InitialArgs): TablesState {
  return {
    meta: null,
    registry: initRegistry(initialArgs),
    tables: initTables(initialArgs),
  };
}
