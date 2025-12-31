import { TableStates } from "./tables/types";
import { Queries } from "./queries/types";
import { Registries } from "./registries/types";
import { Meta } from "./meta/types";

export interface TablesState {
  meta: Meta | null;
  queries: Queries;
  registry: Registries;
  tables: TableStates;
}
