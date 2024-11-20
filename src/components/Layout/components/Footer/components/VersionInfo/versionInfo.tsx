import { Tooltip } from "@mui/material";
import React from "react";
import { useCatalog } from "../../../../../../hooks/useCatalog";
import { BaseComponentProps } from "../../../../../types";
import { Title } from "./components/Tooltip/components/Title/title";
import { CHIP_PROPS, TOOLTIP_PROPS, VERSION_INFO } from "./constants";
import { VersionInfoProps } from "./types";
import { getLabel } from "./utils";
import { StyledChip } from "./versionInfo.styles";

export const VersionInfo = ({
  chipProps,
  className,
  tooltipProps,
  versionInfo = VERSION_INFO,
}: BaseComponentProps & VersionInfoProps): JSX.Element | null => {
  const catalog = useCatalog();
  return (
    <Tooltip
      {...TOOLTIP_PROPS}
      title={<Title versionInfo={{ catalog, ...versionInfo }} />}
      {...tooltipProps}
    >
      <StyledChip
        {...CHIP_PROPS}
        className={className}
        label={getLabel({ catalog, ...versionInfo })}
        {...chipProps}
      />
    </Tooltip>
  );
};
