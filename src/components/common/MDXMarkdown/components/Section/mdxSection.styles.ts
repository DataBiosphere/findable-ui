import styled from "@emotion/styled";
import { FONT } from "../../../../../styles/common/constants/font";
import {
  textBody500,
  textBodyLarge500,
} from "../../../../../styles/common/mixins/fonts";

export const SectionContent = styled.div`
  h3,
  h4 {
    margin: 0 0 8px;
  }

  h3 {
    ${textBodyLarge500};
  }

  h4 {
    ${textBody500};
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
