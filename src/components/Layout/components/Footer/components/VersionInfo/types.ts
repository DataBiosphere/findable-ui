import { ChipProps, TooltipProps } from "@mui/material";

export interface VersionInfo {
  buildDate?: string;
  catalog?: string;
  gitHash?: string;
  version?: string;
}

export interface VersionInfoProps {
  chipProps?: Partial<ChipProps>;
  tooltipProps?: Partial<TooltipProps>;
  versionInfo?: VersionInfo;
}
