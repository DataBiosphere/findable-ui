import { Tooltip } from "@mui/material";
import React from "react";
import { BaseComponentProps } from "../../../../../types";
import { Title } from "./components/Tooltip/components/Title/title";
import { CHIP_PROPS, TOOLTIP_PROPS } from "./constants";
import { VersionInfoProps } from "./types";

import { getLabel } from "./utils";
import { StyledChip } from "./versionInfo.styles";

export const VersionInfo = ({
  chipProps,
  className,
  tooltipProps,
  versionInfo,
}: BaseComponentProps & VersionInfoProps): JSX.Element | null => {
  return (
    <Tooltip
      {...TOOLTIP_PROPS}
      title={<Title versionInfo={versionInfo} />}
      {...tooltipProps}
    >
      <StyledChip
        {...CHIP_PROPS}
        className={className}
        label={getLabel(versionInfo)}
        {...chipProps}
      />
    </Tooltip>
  );
};
