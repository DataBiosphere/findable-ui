import { CoreOptions, getCoreRowModel, RowData } from "@tanstack/react-table";
import { ROW_POSITION } from "../../../../Table/features/RowPosition/constants";
import { ROW_PREVIEW } from "../../../../Table/features/RowPreview/constants";

export const CORE_OPTIONS: Pick<
  CoreOptions<RowData>,
  "_features" | "getCoreRowModel"
> = {
  _features: [ROW_POSITION, ROW_PREVIEW],
  getCoreRowModel: getCoreRowModel(),
};
