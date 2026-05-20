import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../../../styles/common/constants/palette";
import { sectionPadding } from "../../../../../../../common/Section/section.styles";

export const Section = styled("div")`
  ${sectionPadding};
  background-color: ${PALETTE.COMMON_WHITE};
  border-top: 1px solid ${PALETTE.SMOKE_MAIN};
  display: grid;
  gap: 16px;
  grid-template-columns: auto 1fr auto;
`;

export const SectionContent = styled.div`
  display: grid;
  gap: 2px;
  grid-row: 1;

  .MuiTypography-body-400-2lines {
    p {
      margin: 0;
    }
  }

  .MuiTypography-body-500 {
    margin: 2px 0;
  }
`;
