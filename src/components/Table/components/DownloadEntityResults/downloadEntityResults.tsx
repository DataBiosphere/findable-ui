import { Row, RowData } from "@tanstack/react-table";
import React from "react";
import { FileDownloadButton } from "../../../common/Button/components/FileDownloadButton/fileDownloadButton";
import { BUTTON_PROPS } from "../../../common/Button/constants";
import { DownloadIcon } from "../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { generateDownloadBlob } from "../../common/utils";
import { StyledButton } from "./downloadEntityResults.styles";

export interface DownloadEntityResultsProps<T extends RowData> {
  entityName: string;
  rows: Row<T>[];
}

export const DownloadEntityResults = <T extends RowData>({
  entityName,
  rows,
}: DownloadEntityResultsProps<T>): JSX.Element => {
  const [fileUrl, setFileUrl] = React.useState<string | undefined>(undefined);

  const onDownload = (): void => {
    const blob = generateDownloadBlob(rows);
    if (blob) {
      setFileUrl(window.URL.createObjectURL(blob));
    }
  };

  return (
    <>
      <StyledButton
        {...BUTTON_PROPS.SECONDARY_CONTAINED}
        onClick={(): void => onDownload()}
        startIcon={<DownloadIcon />}
      >
        Download TSV
      </StyledButton>
      <FileDownloadButton fileName={`${entityName}.tsv`} fileUrl={fileUrl} />
    </>
  );
};
