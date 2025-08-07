import styled from "@emotion/styled";
import { PALETTE } from "../../../styles/common/constants/palette";
import { Tag } from "./tag";

export const TagDefault = styled(Tag)`
  background-color: ${PALETTE.SMOKE_MAIN};
  border-radius: 4px;
  padding: 2px 6px;
`;

export const TagWarning = styled(TagDefault)`
  background-color: ${PALETTE.WARNING_LIGHT};
  color: ${PALETTE.WARNING_MAIN};
`;
