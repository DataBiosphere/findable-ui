import { Row } from "@tanstack/react-table";
import React from "react";
import { ButtonSecondary } from "../../../common/Button/components/ButtonSecondary/buttonSecondary";
import { FileDownloadButton } from "../../../common/Button/components/FileDownloadButton/fileDownloadButton";
import { DownloadIcon } from "../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { generateDownloadBlob } from "../../common/utils";

export interface DownloadEntityResultsProps<T> {
  entityName: string;
  rows: Row<T>[];
}

export const DownloadEntityResults = <T extends object>({
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
      <ButtonSecondary
        onClick={(): void => onDownload()}
        StartIcon={DownloadIcon}
      >
        Download TSV
      </ButtonSecondary>
      <FileDownloadButton fileName={`${entityName}.tsv`} fileUrl={fileUrl} />
    </>
  );
};
