import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { StepIcon } from "@mui/material";
import {
  inkLight,
  primaryMain,
  smokeDark,
} from "../../../../styles/common/mixins/colors";

export const svgIcon = css`
  border-radius: 50%;
  color: transparent;
  height: 32px;
  width: 32px;
`;

export const StyledStepIcon = styled(StepIcon)`
  &.MuiSvgIcon-root {
    ${svgIcon}
    border: 2px solid ${smokeDark};

    .MuiStepIcon-text {
      fill: ${inkLight};
      font-size: 13px;
      font-weight: 600;
      line-height: 24px;
    }

    &.Mui-active {
      border-color: ${primaryMain};

      .MuiStepIcon-text {
        fill: ${primaryMain};
      }
    }
  }
`;
