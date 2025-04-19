import styled from "@emotion/styled";
import { StepContent } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { sectionPadding } from "../../../../../common/Section/section.styles";

export const StyledStepContent = styled(StepContent)`
  &.MuiStepContent-root {
    .MuiCollapse-wrapperInner.MuiCollapse-vertical {
      > .MuiGrid-root {
        ${sectionPadding};
        border-top: 1px solid ${PALETTE.SMOKE_MAIN};
        display: grid;
        gap: 24px;
        justify-items: flex-start;
      }
    }
  }
`;
