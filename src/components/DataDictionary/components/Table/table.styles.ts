import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { FluidPaper } from "../../../common/Paper/components/FluidPaper/fluidPaper";

export const StyledFluidPaper = styled(FluidPaper)`
  background-color: ${PALETTE.SMOKE_MAIN};
  display: grid;
  gap: 1px;
`;
