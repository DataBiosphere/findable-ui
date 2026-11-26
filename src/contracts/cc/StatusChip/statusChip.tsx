import type { JSX } from "react";
import { CHIP_PROPS } from "../../mui/Chip/constants";
import { StyledChip } from "./statusChip.styles";
import type { StatusChipProps } from "./types";

/**
 * A status, such as an access or release state, drawn as a MUI `Chip` with a white ring and a medium-weight label.
 * Each colour's background and text are set by the chip itself, not the theme. The label font is the same for every
 * colour, and the size and variant are fixed. `className` is applied to the chip's root, so an app can give one chip
 * its own style or colour with `styled(StatusChip)`.
 * @param props - Status chip props; `color` is one of `STATUS_CHIP_PROPS.COLOR`.
 * @returns The status chip.
 */
export const StatusChip = (props: StatusChipProps): JSX.Element => (
  <StyledChip
    {...props}
    // After the spread, so neither a passed prop nor a change to the theme's MuiChip defaultProps can change the
    // chip's size or variant; its styles set the height and label padding for this size.
    size={CHIP_PROPS.SIZE.MEDIUM}
    variant={CHIP_PROPS.VARIANT.FILLED}
  />
);
