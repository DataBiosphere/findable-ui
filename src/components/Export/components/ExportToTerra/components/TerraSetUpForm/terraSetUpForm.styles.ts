import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import {
  successMain,
  white,
} from "../../../../../../styles/common/mixins/colors";
import { sectionPadding } from "../../../../../common/Section/section.styles";

export const Section = styled("div")`
  ${sectionPadding};
  background-color: ${white};
  display: grid;
  gap: 16px;
  grid-template-columns: auto 1fr;
`;

export const SectionContent = styled("div")`
  display: grid;
  gap: 4px;
  grid-row: 1;

  .MuiTypography-body-400-2lines {
    p {
      margin: 0;
    }
  }
`;

export const SectionStatus = styled("div")`
  align-self: flex-start;
  grid-column: 1;
  grid-row: 1;
  line-height: 0;

  .MuiSvgIcon-fontSizeMedium {
    color: ${successMain};
  }

  .MuiStepIcon-root {
    border: 2px solid ${PALETTE.SMOKE_MAIN};
    border-radius: 50%;
    color: ${white};

    .MuiStepIcon-text {
      fill: ${PALETTE.SMOKE_MAIN};
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
    }

    &.Mui-active {
      border: 2px solid ${PALETTE.INK_LIGHT};
      color: ${white};

      .MuiStepIcon-text {
        fill: ${PALETTE.INK_LIGHT};
      }
    }
  }
`;

export const SectionActions = styled("div")`
  grid-column: 2;
`;
