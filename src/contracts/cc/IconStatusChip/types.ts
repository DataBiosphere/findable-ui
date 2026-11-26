import type { ChipProps } from "@mui/material";
import type { ComponentType } from "react";
import type { CustomSVGIconProps } from "../../../components/common/CustomIcon/common/entities";
import type { StatusChipColor } from "../StatusChip/types";
import type { ICON_STATUS_CHIP_PROPS } from "./constants";

/**
 * An `IconStatusChip` status, one of `ICON_STATUS_CHIP_PROPS.STATUS`.
 */
export type IconStatus =
  (typeof ICON_STATUS_CHIP_PROPS.STATUS)[keyof typeof ICON_STATUS_CHIP_PROPS.STATUS];

/**
 * The icon, colour and name a status draws with. The name is read by screen readers before the label, so they hear the
 * status even when the label doesn't say it.
 */
export interface IconStatusDisplay {
  color: StatusChipColor;
  Icon: ComponentType<CustomSVGIconProps>;
  name: string;
}

/**
 * The MUI `Chip` props an icon status chip takes: `className`, `label` and `ref`, with a required `status` from
 * `ICON_STATUS_CHIP_PROPS.STATUS`, which sets the chip's colour and icon.
 */
export interface IconStatusChipProps extends Pick<
  ChipProps,
  "className" | "label" | "ref"
> {
  status: IconStatus;
}
