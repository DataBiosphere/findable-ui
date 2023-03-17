import styled from "@emotion/styled";
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
