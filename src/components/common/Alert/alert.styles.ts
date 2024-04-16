import styled from "@emotion/styled";
import { TABLET } from "../../../theme/common/breakpoints";
import { Alert } from "./alert";

/**
 * Flat alert - typically used when in full stretch or full "bleed" across a container.
 * e.g. the entire width of mobile viewports.
 */
export const FlatAlert = styled(Alert)`
  border-left: none;
  border-radius: 0;
  border-right: none;
  box-shadow: none;
`;

/* eslint-disable valid-jsdoc -- disable require param */
/**
 * Fluid alert - typically used to transition between flat paper (mobile) and rounded paper (tablet or desktop).
 */
/* eslint-enable valid-jsdoc -- disable require param */
export const FluidAlert = styled(Alert)`
  ${({ theme }) => theme.breakpoints.down(TABLET)} {
    border-left: none;
    border-radius: 0;
    border-right: none;
    box-shadow: none;
  }
`;
