import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { BUTTON_PROPS } from "../../../../common/Button/constants";
import { DownloadIcon } from "../../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { StyledButton } from "./tableDownload.styles";
import { TableDownloadProps } from "./types";

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
