import { Button, Tooltip } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";
import { LIST_URL_PARAM } from "../../../../../../../common/constants";
import { BUTTON_PRESETS } from "../../../../../../../contracts/mui/Button/presets";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useDownloadStatus } from "../../../../../../../hooks/useDownloadStatus";
import { ROUTE } from "../../../../../../../routes/constants";
import { TEST_IDS } from "../../../../../../../tests/testIds";
import { BaseComponentProps } from "../../../../../../types";
import { StyledBox } from "./exportButton.styles";

/**
 * Export button linking to the export page, with the explore page's entity list type in the link's `list` param. It is disabled while the system is indexing, with a tooltip saying so, and while the system status is loading.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @returns The export button, or null when the export button is not enabled on the entity's UI config.
 */
export const ExportButton = ({
  className,
}: BaseComponentProps): JSX.Element | null => {
  const { disabled, isLoading, message } = useDownloadStatus();
  const { entityConfig } = useConfig();
  const { route, ui } = entityConfig;
  const { enableExportButton } = ui || {};

  if (!enableExportButton) return null;

  return (
    <Tooltip arrow title={message}>
      <StyledBox>
        <Button
          {...BUTTON_PRESETS.PRIMARY_CONTAINED}
          className={className}
          component={Link}
          data-testid={TEST_IDS.EXPORT_BUTTON}
          disabled={disabled || isLoading}
          href={`${ROUTE.EXPORT}?${new URLSearchParams({ [LIST_URL_PARAM]: route })}`}
          id="button-cohort-export"
        >
          Export
        </Button>
      </StyledBox>
    </Tooltip>
  );
};
