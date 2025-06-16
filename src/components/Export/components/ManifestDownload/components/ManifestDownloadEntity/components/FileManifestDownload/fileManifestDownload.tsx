import { Button, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import copy from "copy-to-clipboard";
import React from "react";
import { Filters } from "../../../../../../../../common/entities";
import { useDownloadStatus } from "../../../../../../../../hooks/useDownloadStatus";
import { useFileManifestDownload } from "../../../../../../../../hooks/useFileManifest/useFileManifestDownload";
import { useLoginGuard } from "../../../../../../../../providers/loginGuard/hook";
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

export interface FileManifestDownloadProps {
  filters: Filters;
}

export const FileManifestDownload = ({
  filters,
}: FileManifestDownloadProps): JSX.Element => {
  const { disabled, message } = useDownloadStatus();
  const { fileName, isIdle, isLoading, manifestURL, requestManifest } =
    useFileManifestDownload(filters);

  // Prompt user for login before download and copy, if required.
  const { requireLogin } = useLoginGuard();

  return (
    <FluidPaper>
      <GridPaper>
        <SectionTitle>File Manifest</SectionTitle>
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
                      <Button
                        {...BUTTON_PROPS.PRIMARY_CONTAINED}
                        disabled={disabled || isLoading}
                        onClick={() => requireLogin(requestManifest)}
                      >
                        Request link
                      </Button>
                    </Tooltip>
                  </TableCell>
                ) : (
                  <>
                    {manifestURL && (
                      <TableCell>
                        <ButtonGroup
                          Buttons={[
                            <Button key="download" download href={manifestURL}>
                              <DownloadIconSmall />
                            </Button>,
                            <Button
                              key="copy"
                              onClick={() => copy(manifestURL)}
                            >
                              <ContentCopyIconSmall />
                            </Button>,
                          ]}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      {manifestURL
                        ? fileName
                        : "The manifest is not available for this project."}
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
