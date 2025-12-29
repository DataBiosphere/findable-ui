import { CoreOptions, getCoreRowModel, RowData } from "@tanstack/react-table";
import { ROW_POSITION } from "../../features/RowPosition/constants";
import { ROW_PREVIEW } from "../../features/RowPreview/constants";
import { TABLE_DOWNLOAD } from "../../features/TableDownload/constants";
import { ROW_SELECTION_VALIDATION } from "../../features/RowSelectionValidation/constants";

export const CORE_OPTIONS: Pick<
  CoreOptions<RowData>,
  "_features" | "getCoreRowModel"
> = {
  _features: [
    ROW_POSITION,
    ROW_PREVIEW,
    ROW_SELECTION_VALIDATION,
    TABLE_DOWNLOAD,
  ],
  getCoreRowModel: getCoreRowModel(),
};
