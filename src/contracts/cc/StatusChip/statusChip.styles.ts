import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { FONT } from "../../../styles/common/constants/font";
import { PALETTE } from "../../../styles/common/constants/palette";
import { STATUS_CHIP_PROPS } from "./constants";
import type { StatusChipColor, StatusChipProps } from "./types";

// Each colour's background and text, set here rather than taken from the theme's MuiChip colour variants, so a change
// to the theme, or an app replacing those variants, can't change a status chip.
const COLORS: Record<StatusChipColor, { background: string; text: string }> = {
  [STATUS_CHIP_PROPS.COLOR.DEFAULT]: {
    background: PALETTE.SMOKE_MAIN,
    text: PALETTE.INK_LIGHT,
  },
  [STATUS_CHIP_PROPS.COLOR.ERROR]: {
    background: PALETTE.ALERT_LIGHT,
    text: PALETTE.ALERT_MAIN,
  },
  [STATUS_CHIP_PROPS.COLOR.INFO]: {
    background: PALETTE.INFO_LIGHT,
    text: PALETTE.INFO_MAIN,
  },
  [STATUS_CHIP_PROPS.COLOR.SUCCESS]: {
    background: PALETTE.SUCCESS_LIGHT,
    text: PALETTE.SUCCESS_MAIN,
  },
  [STATUS_CHIP_PROPS.COLOR.WARNING]: {
    background: PALETTE.WARNING_LIGHT,
    text: PALETTE.WARNING_MAIN,
  },
};

export const StyledChip = styled(Chip)<StatusChipProps>`
  background-color: ${({ color }) => COLORS[color].background};
  box-shadow: 0 0 0 2px ${PALETTE.COMMON_WHITE};
  color: ${({ color }) => COLORS[color].text};
  height: 20px;
  max-width: fit-content;
  min-width: 0;

  .MuiChip-label {
    font: ${FONT.BODY_SMALL_500};
    padding-left: 8px;
    padding-right: 8px;
  }
`;
