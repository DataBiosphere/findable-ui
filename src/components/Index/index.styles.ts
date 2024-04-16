import styled from "@emotion/styled";
import { mediaTabletUp } from "../../styles/common/mixins/breakpoints";

interface Props {
  marginTop: number;
}

export const Index = styled("div")<Props>`
  display: grid;
  flex: 1;
  gap: 16px;
  margin-top: ${({ marginTop }) => marginTop}px;
  padding: 24px 0;
  place-content: flex-start stretch;

  ${mediaTabletUp} {
    padding: 24px;
  }
`;
