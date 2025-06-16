import { Button, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import copy from "copy-to-clipboard";
import React from "react";
import { Filters } from "../../../../../../../../common/entities";
import { useDownloadStatus } from "../../../../../../../../hooks/useDownloadStatus";
import { useFileManifestSpreadsheet } from "../../../../../../../../hooks/useFileManifest/useFileManifestSpreadsheet";
import { BUTTON_PROPS } from "../../../../../../../common/Button/constants";
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
    spreadsheetUrl,
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
                {isIdle || isLoading ? (
                  <TableCell>
                    <Tooltip arrow title={message}>
                      <span>
                        <Button
                          {...BUTTON_PROPS.PRIMARY_CONTAINED}
                          disabled={disabled || isLoading}
                          onClick={() => requestManifest?.()}
                        >
                          Request link
                        </Button>
                      </span>
                    </Tooltip>
                  </TableCell>
                ) : (
                  <>
                    {spreadsheetUrl && (
                      <TableCell>
                        <ButtonGroup
                          Buttons={[
                            <Button
                              key="download"
                              download
                              href={spreadsheetUrl}
                            >
                              <DownloadIconSmall />
                            </Button>,
                            <Button
                              key="copy"
                              onClick={() => copy(spreadsheetUrl)}
                            >
                              <ContentCopyIconSmall />
                            </Button>,
                          ]}
                        />
                      </TableCell>
                    )}
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
