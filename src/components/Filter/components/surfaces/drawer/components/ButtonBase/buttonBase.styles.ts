import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import { FONT } from "../../../../../../../styles/common/constants/font";

export const StyledButtonBase = styled(ButtonBase)`
  align-items: center;
  display: flex;
  font: ${FONT.BODY_LARGE_500};
  gap: 8px;
  justify-content: flex-start;
  padding: 12px 16px;
  width: 100%;
`;
