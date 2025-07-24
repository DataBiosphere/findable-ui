import styled from "@emotion/styled";
import Link from "next/link";
import { PALETTE } from "../../../styles/common/constants/palette";

export const StyledNextLink = styled(Link)`
  color: ${PALETTE.INK_LIGHT};
  margin-left: 4px;
  opacity: 0;
  position: absolute;
  transition: opacity 0.2s ease-in-out;

  svg {
    vertical-align: middle;
  }
`;
