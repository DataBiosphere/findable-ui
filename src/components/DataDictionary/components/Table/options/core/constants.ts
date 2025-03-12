import { CoreOptions, getCoreRowModel } from "@tanstack/react-table";
import { Attribute } from "../../../../../../common/entities";
import { ROW_POSITION } from "../../../../../Table/features/RowPosition/constants";
import { ROW_PREVIEW } from "../../../../../Table/features/RowPreview/constants";

export const CORE_OPTIONS: Pick<
  CoreOptions<Attribute>,
  "_features" | "getCoreRowModel"
> = {
  _features: [ROW_POSITION, ROW_PREVIEW],
  getCoreRowModel: getCoreRowModel(),
};
