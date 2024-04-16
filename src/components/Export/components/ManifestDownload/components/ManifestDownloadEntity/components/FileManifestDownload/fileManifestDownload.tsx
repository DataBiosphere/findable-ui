import {
  ButtonBase,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import copy from "copy-to-clipboard";
import React, { useRef } from "react";
import { Filters } from "../../../../../../../../common/entities";
import { useDownloadStatus } from "../../../../../../../../hooks/useDownloadStatus";
import { useFileManifestDownload } from "../../../../../../../../hooks/useFileManifest/useFileManifestDownload";
import { ButtonGroup } from "../../../../../../../common/ButtonGroup/buttonGroup";
import { ButtonGroupButton } from "../../../../../../../common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import {
  ContentCopyIconSmall,
  DownloadIconSmall,
} from "../../../../../../../common/CustomIcon/common/constants";
import {
  FluidPaper,
  GridPaper,
} from "../../../../../../../common/Paper/paper.styles";
import {
  Loading,
  LOADING_PANEL_STYLE,
} from "../../../../../../../Loading/loading";
import { GridTable } from "../../../../../../../Table/common/gridTable.styles";
import {
  SectionTitle,
  TableContainer,
} from "../../manifestDownloadEntity.styles";

export interface FileManifestDownloadProps {
  filters: Filters;
}

export const FileManifestDownload = ({
  filters,
}: FileManifestDownloadProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const { disabled, message } = useDownloadStatus();
  const { fileName, isIdle, isLoading, manifestURL } = useFileManifestDownload(
    filters,
    disabled
  );
  const isInProgress = (isIdle || isLoading) && !disabled;
  const isReady = Boolean(manifestURL) || disabled;

  // Copies file manifest.
  const copyManifestURL = (url?: string): void => {
    if (!url) return;
    copy(url);
  };

  // Downloads file manifest.
  const downloadManifestURL = (): void => {
    downloadRef.current?.click();
  };

  return (
    <FluidPaper>
      <GridPaper>
        <SectionTitle>File Manifest</SectionTitle>
        <TableContainer>
          <Loading
            loading={isInProgress}
            panelStyle={LOADING_PANEL_STYLE.INHERIT}
          />
          <GridTable gridTemplateColumns={isReady ? "auto 1fr" : "1fr"}>
            <TableBody>
              <TableRow>
                {isInProgress ? (
                  <TableCell />
                ) : isReady ? (
                  <>
                    <TableCell>
                      <ButtonBase
                        disabled={disabled}
                        href={manifestURL ?? ""}
                        ref={downloadRef}
                        sx={{ display: "none" }}
                      />
                      <Tooltip arrow title={message}>
                        <span>
                          <ButtonGroup
                            Buttons={[
                              <ButtonGroupButton
                                key="download"
                                action="Download file manifest"
                                disabled={disabled}
                                label={<DownloadIconSmall />}
                                onClick={downloadManifestURL}
                              />,
                              <ButtonGroupButton
                                key="copy"
                                action="Copy file manifest"
                                disabled={disabled}
                                label={<ContentCopyIconSmall />}
                                onClick={(): void =>
                                  copyManifestURL(manifestURL)
                                }
                              />,
                            ]}
                          />
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{fileName}</TableCell>
                  </>
                ) : (
                  <TableCell>
                    The manifest is not available for this project.
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </GridTable>
        </TableContainer>
      </GridPaper>
    </FluidPaper>
  );
};
