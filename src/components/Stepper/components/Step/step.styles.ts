import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Step } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { sectionPadding } from "../../../common/Section/section.styles";

export const StyledStep = styled(Step)`
  &.MuiStep-root {
    &.MuiStep-vertical {
      background-color: ${PALETTE.SMOKE_LIGHTEST};

      .MuiStepLabel-root {
        ${sectionPadding};
      }

      .MuiStepContent-root {
        border: none;
        margin: 0;
        padding: 0;
      }

      &.Mui-completed {
        background-color: ${PALETTE.COMMON_WHITE};
      }

      ${({ active }) =>
        active &&
        css`
          background-color: ${PALETTE.COMMON_WHITE};
        `};
    }
  }
`;
