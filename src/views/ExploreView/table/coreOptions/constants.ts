import { CoreOptions, getCoreRowModel, RowData } from "@tanstack/react-table";
import { ROW_POSITION } from "../../../../components/Table/features/RowPosition/constants";
import { ROW_PREVIEW } from "../../../../components/Table/features/RowPreview/constants";

export const CORE_OPTIONS: Pick<
  CoreOptions<RowData>,
  "getCoreRowModel" | "_features"
> = {
  _features: [ROW_POSITION, ROW_PREVIEW],
  getCoreRowModel: getCoreRowModel(),
};
