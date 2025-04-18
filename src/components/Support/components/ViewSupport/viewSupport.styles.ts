import styled from "@emotion/styled";
import { SHADOWS } from "../../../../styles/common/constants/shadows";
import { mediaTabletUp } from "../../../../styles/common/mixins/breakpoints";
import {
  primaryDark,
  primaryMain,
  white,
} from "../../../../styles/common/mixins/colors";

export const Fab = styled("a")`
  align-items: center;
  background-color: ${primaryMain};
  border: none;
  border-radius: 50%;
  bottom: 16px;
  box-shadow: ${SHADOWS["02"]};
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

  ${mediaTabletUp} {
    bottom: 72px;
  }
`;
