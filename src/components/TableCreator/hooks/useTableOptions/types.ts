import { RowData, TableOptions } from "@tanstack/react-table";

export type UseTableOptions<T extends RowData> = Partial<TableOptions<T>>;
