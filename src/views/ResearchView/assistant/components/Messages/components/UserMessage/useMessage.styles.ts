import styled from "@emotion/styled";
import { RoundedPaper } from "../../../../../../../components/common/Paper/components/RoundedPaper/roundedPaper";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";

export const StyledRoundedPaper = styled(RoundedPaper)`
  align-self: flex-end;
  background-color: ${PALETTE.SMOKE_MAIN};
  max-width: 332px;
  min-height: fit-content;
  padding: 8px 12px;
`;
