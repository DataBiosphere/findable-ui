import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { PALETTE } from "../../../../../../../../styles/common/constants/palette";

export const StyledResultSummary = styled(Typography)`
  cursor: pointer;
  text-decoration: underline dashed ${PALETTE.SMOKE_DARK};
  text-decoration-skip-ink: none;
  text-decoration-thickness: 1px;
  text-underline-position: under;
`;
