import { RowData } from "@tanstack/react-table";
import { TableDownloadOptions } from "../../features/TableDownload/types";

export const TABLE_DOWNLOAD_OPTIONS: Pick<
  TableDownloadOptions<RowData>,
  "enableDownload"
> = {
  enableDownload: false,
};
