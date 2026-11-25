import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { FONT } from "../../../styles/common/constants/font";
import { PALETTE } from "../../../styles/common/constants/palette";
import { STATUS_CHIP_PROPS } from "./constants";
import type { StatusChipProps } from "./types";

export const StyledChip = styled(Chip)<StatusChipProps>`
  box-shadow: 0 0 0 2px ${PALETTE.COMMON_WHITE};
  height: 20px;
  max-width: fit-content;
  min-width: 0;

  ${({ color }) =>
    color === STATUS_CHIP_PROPS.COLOR.DEFAULT &&
    css`
      color: ${PALETTE.INK_LIGHT};
    `}

  .MuiChip-label {
    font: ${FONT.BODY_SMALL_500};
    padding-left: 8px;
    padding-right: 8px;
  }
`;
