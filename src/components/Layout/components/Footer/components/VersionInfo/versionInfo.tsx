import { Tooltip } from "@mui/material";
import { JSX } from "react";
import { useCatalog } from "../../../../../../hooks/useCatalog";
import { BaseComponentProps } from "../../../../../types";
import { Title } from "./components/Tooltip/components/Title/title";
import { CHIP_PROPS, TOOLTIP_PROPS, VERSION_INFO } from "./constants";
import { VersionInfoProps } from "./types";
import { getLabel } from "./utils";
import { StyledChip } from "./versionInfo.styles";

/**
 * Version info chip, labelled with the version, short git hash and catalog, with a tooltip listing the full version info.
 * The current catalog is added to the version info, unless the version info has its own catalog key (even if undefined).
 * @param props - Component props.
 * @param props.chipProps - Props passed to the chip, overriding the defaults.
 * @param props.className - Class name applied to the chip.
 * @param props.tooltipProps - Props passed to the tooltip, overriding the defaults.
 * @param props.versionInfo - Version info; defaults to the build date, git hash and version from the NEXT_PUBLIC_BUILD_DATE, NEXT_PUBLIC_GIT_HASH and NEXT_PUBLIC_VERSION environment variables.
 * @returns The version info chip.
 */
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
