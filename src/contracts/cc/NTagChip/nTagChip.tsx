import type { JSX } from "react";
import { CHIP_PROPS } from "../../mui/Chip/constants";
import { StyledChip } from "./nTagChip.styles";
import type { NTagChipProps } from "./types";

/**
 * A count tag, such as "3 species", drawn as a grey MUI `Chip` with a white ring. `NTagCell` shows it when a cell has
 * more than one value, with a tooltip listing them. Its colour, size and variant are fixed. `ref` reaches the chip's
 * root, so a tooltip can anchor to it, and so does `className`, so an app can restyle one tag with `styled(NTagChip)`.
 * @param props - N tag chip props; `label` is the tag's text.
 * @returns The N tag chip.
 */
export const NTagChip = (props: NTagChipProps): JSX.Element => (
  <StyledChip
    {...props}
    // After the spread, so neither a passed prop nor a change to the theme's MuiChip defaultProps can change the
    // chip's color, size or variant; its styles set the colours, height and label padding.
    color={CHIP_PROPS.COLOR.DEFAULT}
    size={CHIP_PROPS.SIZE.MEDIUM}
    variant={CHIP_PROPS.VARIANT.FILLED}
  />
);
