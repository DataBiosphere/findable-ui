import { Button, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import copy from "copy-to-clipboard";
import React from "react";
import { Filters } from "../../../../../../../../common/entities";
import { useDownloadStatus } from "../../../../../../../../hooks/useDownloadStatus";
import { useFileManifestSpreadsheet } from "../../../../../../../../hooks/useFileManifest/useFileManifestSpreadsheet";
import { BUTTON_PROPS } from "../../../../../../../../styles/common/mui/button";
import { ButtonGroup } from "../../../../../../../common/ButtonGroup/buttonGroup";
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

export interface FileManifestSpreadsheetProps {
  filters: Filters;
}

export const FileManifestSpreadsheet = ({
  filters,
}: FileManifestSpreadsheetProps): JSX.Element => {
  const { disabled, message } = useDownloadStatus();
  const {
    fileName,
    isIdle = false,
    isLoading = false,
    requestManifest,
    spreadsheetUrl = "",
  } = useFileManifestSpreadsheet(filters) || {};

  return (
    <FluidPaper>
      <GridPaper>
        <SectionTitle>Metadata</SectionTitle>
        <TableContainer>
          <Loading
            loading={isLoading}
            panelStyle={LOADING_PANEL_STYLE.INHERIT}
          />
          <GridTable gridTemplateColumns="auto 1fr">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Tooltip arrow title={message}>
                    <span>
                      <ButtonGroup
                        Buttons={[
                          <Button
                            key="download"
                            disabled={disabled || !spreadsheetUrl}
                            download
                            href={spreadsheetUrl}
                          >
                            <DownloadIconSmall />
                          </Button>,
                          <Button
                            key="copy"
                            disabled={disabled || !spreadsheetUrl}
                            onClick={() => copy(spreadsheetUrl)}
                          >
                            <ContentCopyIconSmall />
                          </Button>,
                        ]}
                      />
                    </span>
                  </Tooltip>
                </TableCell>
                {isIdle || isLoading ? (
                  <>
                    {/* IDLE OR LOADING */}
                    <TableCell>
                      <Button
                        disabled={disabled || isLoading}
                        onClick={() => requestManifest?.()}
                        variant={BUTTON_PROPS.VARIANT.TEXT}
                      >
                        Request metadata
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    {/* SUCCESS OR NOT AVAILABLE */}
                    <TableCell>
                      {spreadsheetUrl
                        ? fileName
                        : "The metadata is not available for this project."}
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableBody>
          </GridTable>
        </TableContainer>
      </GridPaper>
    </FluidPaper>
  );
};
