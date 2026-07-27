import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";
import { sectionPadding } from "../../../../../../common/Section/section.styles";

export const StyledStack = styled(Stack)`
  ${sectionPadding};
  background-color: ${PALETTE.COMMON_WHITE};
`;
