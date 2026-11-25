import type { JSX } from "react";
import { StyledChip } from "./statusChip.styles";
import type { StatusChipProps } from "./types";

/**
 * A status, such as an access or release state, drawn as a MUI `Chip` with a white ring and a medium-weight label.
 * The label font is the same for every colour. `className` is applied to the chip's root, so an app can give one chip
 * its own style or colour with `styled(StatusChip)`.
 * @param props - Status chip props; `color` is one of `STATUS_CHIP_PROPS.COLOR`.
 * @returns The status chip.
 */
export const StatusChip = (props: StatusChipProps): JSX.Element => (
  <StyledChip {...props} />
);
