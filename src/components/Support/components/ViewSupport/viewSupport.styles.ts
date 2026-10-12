import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { SHADOWS } from "../../../../styles/common/constants/shadows";
import { bpUpSm } from "../../../../styles/common/mixins/breakpoints";

export const FabLink = styled("a")`
  align-items: center;
  background-color: ${PALETTE.PRIMARY_MAIN};
  border: none;
  border-radius: 50%;
  bottom: 16px;
  box-shadow: ${SHADOWS["02"]};
  color: ${PALETTE.COMMON_WHITE};
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
    background-color: ${PALETTE.PRIMARY_DARK};
  }

  ${bpUpSm} {
    bottom: 72px;
  }
`;

/**
 * @deprecated Use `FabLink`. Renamed so the jsx-a11y components map can tell
 * this link apart from MUI's Fab button.
 */
export const Fab = FabLink;
