import { ChipProps, TooltipProps } from "@mui/material";

/**
 * App version info: build date, catalog, git hash and version.
 */
export interface VersionInfo {
  buildDate?: string;
  catalog?: string;
  gitHash?: string;
  version?: string;
}

/**
 * Props for the VersionInfo component.
 */
export interface VersionInfoProps {
  chipProps?: Partial<ChipProps>;
  tooltipProps?: Partial<TooltipProps>;
  versionInfo?: VersionInfo;
}
