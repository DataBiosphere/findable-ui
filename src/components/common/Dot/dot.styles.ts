import styled from "@emotion/styled";
import { PALETTE } from "../../../styles/common/constants/palette";

export const DotSeparator = styled("span")`
  align-self: center;
  background-color: ${PALETTE.INK_LIGHT};
  border-radius: 50%;
  display: block;
  flex: none;
  height: 4px;
  width: 4px;
`;
