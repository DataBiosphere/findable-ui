import styled from "@emotion/styled";
import Link from "next/link";
import { inkLight } from "../../../styles/common/mixins/colors";

export const AnchorLink = styled(Link)`
  color: ${inkLight};
  margin-left: 4px;
  opacity: 0;
  position: absolute;
  transition: opacity 0.2s ease-in-out;

  svg {
    vertical-align: middle;
  }
`;
