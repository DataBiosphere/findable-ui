import styled from "@emotion/styled";
import {
  mediaDownSmall,
  mediaUpSmall,
} from "../../../../../../styles/common/mixins/breakpoints";
import { Dot as DXDot } from "../../../../../common/Dot/dot";

export const Summary = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;

  .MuiTypography-body-small-400 {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  ${mediaUpSmall} {
    flex: none;
    flex-direction: row;
  }
`;

export const Dot = styled(DXDot)`
  ${mediaDownSmall} {
    display: none;
  }
`;
