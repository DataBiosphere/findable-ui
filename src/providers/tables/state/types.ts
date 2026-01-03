import { TableStates } from "./tables/types";
import { Registries } from "./registries/types";
import { Meta } from "./meta/types";

export interface TablesState {
  meta: Meta | null;
  registry: Registries;
  revision?: string;
  tables: TableStates;
}
