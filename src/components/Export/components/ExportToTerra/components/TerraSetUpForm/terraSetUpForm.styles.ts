import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { FluidPaper } from "../../../../../common/Paper/components/FluidPaper/fluidPaper";
import { sectionPadding } from "../../../../../common/Section/section.styles";

export const StyledFluidPaper = styled(FluidPaper)`
  background-color: ${PALETTE.COMMON_WHITE};
`;

export const StyledStack = styled(Stack)`
  ${sectionPadding};
  justify-content: space-between;
`;

export const SectionStatus = styled("div")`
  align-self: flex-start;
  grid-column: 1;
  grid-row: 1;
  line-height: 0;

  .MuiSvgIcon-fontSizeMedium {
    color: ${PALETTE.SUCCESS_MAIN};
  }

  .MuiStepIcon-root {
    border: 2px solid ${PALETTE.SMOKE_MAIN};
    border-radius: 50%;
    color: ${PALETTE.COMMON_WHITE};

    .MuiStepIcon-text {
      fill: ${PALETTE.SMOKE_MAIN};
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
    }

    &.Mui-active {
      border: 2px solid ${PALETTE.INK_LIGHT};
      color: ${PALETTE.COMMON_WHITE};

      .MuiStepIcon-text {
        fill: ${PALETTE.INK_LIGHT};
      }
    }
  }
`;

export const SectionActions = styled("div")`
  grid-column: 2;
`;
