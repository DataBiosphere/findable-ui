import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { RoundedPaper } from "../../../common/Paper/components/RoundedPaper/roundedPaper";

export const StyledRoundedPaper = styled(RoundedPaper)`
  background-color: ${PALETTE.SMOKE_MAIN};
  display: grid;
  gap: 1px;
`;
