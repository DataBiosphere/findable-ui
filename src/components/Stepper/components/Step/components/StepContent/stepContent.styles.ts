import styled from "@emotion/styled";
import { StepContent } from "@mui/material";
import { smokeMain } from "../../../../../../styles/common/mixins/colors";
import { sectionPadding } from "../../../../../common/Section/section.styles";

export const StyledStepContent = styled(StepContent)`
  &.MuiStepContent-root {
    .MuiCollapse-wrapperInner.MuiCollapse-vertical {
      > .MuiGrid2-root {
        ${sectionPadding};
        border-top: 1px solid ${smokeMain};
        display: grid;
        gap: 24px;
        justify-items: flex-start;
      }
    }
  }
`;
