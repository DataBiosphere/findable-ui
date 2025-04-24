import styled from "@emotion/styled";
import { FONT } from "../../../../styles/common/constants/font";

export const Label = styled.div`
  color: ${({ theme }) => theme.palette.ink.light};
  font: ${FONT.BODY_400_2_LINES};
`;

export const Values = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 8px;
  font: ${FONT.BODY_400_2_LINES};

  span {
    word-break: break-word;
  }

  code {
    color: ${({ theme }) => theme.palette.ink.light};
  }
`;
