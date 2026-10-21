import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const Sidebar = styled.div`
  align-self: stretch;
  border-right: 1px solid ${PALETTE.SMOKE_MAIN};
  box-sizing: content-box;
  contain: size; /* sized by the row it stretches into, not by its filters */
  width: 264px;
`;
