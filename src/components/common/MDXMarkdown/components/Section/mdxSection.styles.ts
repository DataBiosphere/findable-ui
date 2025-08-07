import styled from "@emotion/styled";
import { FONT } from "../../../../../styles/common/constants/font";

export const SectionContent = styled.div`
  h3,
  h4 {
    margin: 0 0 8px;
  }

  h3 {
    font: ${FONT.BODY_LARGE_500};
  }

  h4 {
    font: ${FONT.BODY_500};
    margin-top: 20px;
  }

  p {
    font: ${FONT.BODY_400_2_LINES};
    margin: 0 0 8px;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;
