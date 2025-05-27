import { Column } from "@tanstack/react-table";

export type PartialColumn = Partial<Column<unknown>> & { id: string };
