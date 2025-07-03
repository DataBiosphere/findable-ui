import { Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useConfig } from "../../../../hooks/useConfig";
import { useDownloadStatus } from "../../../../hooks/useDownloadStatus";
import { ROUTE } from "../../../../routes/constants";
import { TEST_IDS } from "../../../../tests/testIds";
import { BUTTON_PROPS } from "../../../common/Button/constants";
import { BaseComponentProps } from "../../../types";
import { StyledButton } from "./exportButton.styles";

export const ExportButton = ({
  className,
}: BaseComponentProps): JSX.Element | null => {
  const { disabled, isLoading, message } = useDownloadStatus();
  const { config } = useConfig();
  const { export: exportConfig } = config;

  if (!exportConfig) return null;

  return (
    <Tooltip arrow title={message}>
      <span>
        <StyledButton
          {...BUTTON_PROPS.PRIMARY_CONTAINED}
          className={className}
          component={Link}
          data-testid={TEST_IDS.EXPORT_BUTTON}
          disabled={disabled || isLoading}
          href={ROUTE.EXPORT}
          id="button-cohort-export"
        >
          Export
        </StyledButton>
      </span>
    </Tooltip>
  );
};
