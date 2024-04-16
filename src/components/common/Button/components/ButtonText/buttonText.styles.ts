import styled from "@emotion/styled";
import { Button as DXButton } from "../../button";

export const Button = styled(DXButton)`
  font: inherit;
  line-height: inherit;
  vertical-align: unset;

  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
`;
