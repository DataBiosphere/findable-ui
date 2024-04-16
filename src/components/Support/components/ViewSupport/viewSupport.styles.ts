import styled from "@emotion/styled";
import {
  primaryDark,
  primaryMain,
  white,
} from "../../../../styles/common/mixins/colors";
import { shadows02 } from "../../../../styles/common/mixins/shadows";

export const Fab = styled("a")`
  align-items: center;
  background-color: ${primaryMain};
  border: none;
  border-radius: 50%;
  bottom: 16px;
  box-shadow: ${shadows02};
  color: ${white};
  cursor: pointer;
  display: flex;
  font-size: 28px; // Determines the size of the support icon.
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 16px;
  width: 56px;
  z-index: 100; // Above loading component.

  &:hover {
    background-color: ${primaryDark};
  }
`;
