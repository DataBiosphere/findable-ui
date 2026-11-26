import type { JSX } from "react";
import { SVG_ICON_PROPS } from "../../../styles/common/mui/svgIcon";
import { CHIP_PROPS } from "../../mui/Chip/constants";
import { STATUS_DISPLAY } from "./constants";
import { StyledChip } from "./iconStatusChip.styles";
import type { IconStatusChipProps } from "./types";

/**
 * A status drawn as `StatusChip` with a leading 12px icon. The status sets both the colour and the icon, from
 * `ICON_STATUS_CHIP_PROPS.STATUS`. The size and variant are fixed. `className` is applied to the chip's root, so an app
 * can restyle one chip, including its icon size, with `styled(IconStatusChip)`.
 * @param props - Icon status chip props.
 * @param props.status - Status, one of `ICON_STATUS_CHIP_PROPS.STATUS`; sets the colour and the icon.
 * @returns The icon status chip.
 */
export const IconStatusChip = ({
  status,
  ...props
}: IconStatusChipProps): JSX.Element => {
  const { color, Icon } = STATUS_DISPLAY[status];
  return (
    <StyledChip
      {...props}
      // After the spread, so neither a passed prop nor a change to the theme's MuiChip defaultProps can change the
      // chip's colour, icon, size or variant.
      color={color}
      // `inherit`, so the icon takes the chip's text colour: MUI only applies its own icon colours, a fixed grey on the
      // default chip, to an icon whose colour matches the chip's.
      icon={<Icon color={SVG_ICON_PROPS.COLOR.INHERIT} />}
      size={CHIP_PROPS.SIZE.MEDIUM}
      variant={CHIP_PROPS.VARIANT.FILLED}
    />
  );
};
