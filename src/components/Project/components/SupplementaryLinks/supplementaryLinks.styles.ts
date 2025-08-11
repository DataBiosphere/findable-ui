import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const SupplementaryList = styled.div`
  display: grid;
  gap: 0 4px;
  grid-template-columns: auto 1fr;
`;

export const Marker = styled.span`
  color: ${PALETTE.PRIMARY_MAIN};
  text-align: right;
`;

export const SupplementaryLink = styled.span`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 0; /* required to ellipsis any flex child */
`;
