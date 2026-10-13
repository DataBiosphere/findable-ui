import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { BUTTON_PROPS } from "../../../../common/Button/constants";
import { DownloadIcon } from "../../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { StyledButton } from "./tableDownload.styles";
import { TableDownloadProps } from "./types";

/**
 * "Download TSV" button that downloads the table's data.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @param props.table - TanStack table instance.
 * @returns The download button, or null when the table's download is not enabled.
 */
export const TableDownload = <T extends RowData>({
  className,
  table,
}: TableDownloadProps<T>): JSX.Element | null => {
  if (!table.options.enableTableDownload) return null;
  return (
    <StyledButton
      {...BUTTON_PROPS.SECONDARY_CONTAINED}
      className={className}
      onClick={() => table.downloadData()}
      startIcon={<DownloadIcon />}
    >
      Download TSV
    </StyledButton>
  );
};
