import { Button, Tooltip } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useDownloadStatus } from "../../../../../../../hooks/useDownloadStatus";
import { ROUTE } from "../../../../../../../routes/constants";
import { TEST_IDS } from "../../../../../../../tests/testIds";
import { BUTTON_PROPS } from "../../../../../../common/Button/constants";
import { BaseComponentProps } from "../../../../../../types";
import { StyledBox } from "./exportButton.styles";

/**
 * Export button linking to the export page. It is disabled while the system is indexing, with a tooltip saying so, and while the system status is loading.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @returns The export button, or null when the export button is not enabled on the entity's UI config.
 */
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
