import { TableKey } from "../tables/types";

export type Registries = Record<TableKey, { groupKey: TableGroupKey }>;

export type TableGroupKey = string;
