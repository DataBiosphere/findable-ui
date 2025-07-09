import { Button, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useDownloadStatus } from "../../../../../../../hooks/useDownloadStatus";
import { ROUTE } from "../../../../../../../routes/constants";
import { TEST_IDS } from "../../../../../../../tests/testIds";
import { BUTTON_PROPS } from "../../../../../../common/Button/constants";
import { BaseComponentProps } from "../../../../../../types";
import { StyledBox } from "./exportButton.styles";

export const ExportButton = ({
  className,
}: BaseComponentProps): JSX.Element | null => {
  const { disabled, isLoading, message } = useDownloadStatus();
  const { entityConfig } = useConfig();
  const { ui } = entityConfig;
  const { enableExportButton } = ui || {};

  if (!enableExportButton) return null;

  return (
    <Tooltip arrow title={message}>
      <StyledBox>
        <Button
          {...BUTTON_PROPS.PRIMARY_CONTAINED}
          className={className}
          component={Link}
          data-testid={TEST_IDS.EXPORT_BUTTON}
          disabled={disabled || isLoading}
          href={ROUTE.EXPORT}
          id="button-cohort-export"
        >
          Export
        </Button>
      </StyledBox>
    </Tooltip>
  );
};
