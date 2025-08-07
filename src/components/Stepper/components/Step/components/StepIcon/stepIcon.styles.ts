import styled from "@emotion/styled";
import { StepIcon } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledStepIcon = styled(StepIcon)`
  &.MuiSvgIcon-root {
    border: 2px solid ${PALETTE.SMOKE_DARK};
    border-radius: 50%;
    color: transparent;
    height: 32px;
    width: 32px;

    .MuiStepIcon-text {
      fill: ${PALETTE.INK_LIGHT};
      font-size: 13px;
      font-weight: 600;
      line-height: 24px;
    }

    &.Mui-active {
      border-color: ${PALETTE.PRIMARY_MAIN};

      .MuiStepIcon-text {
        fill: ${PALETTE.PRIMARY_MAIN};
      }
    }
  }
`;
