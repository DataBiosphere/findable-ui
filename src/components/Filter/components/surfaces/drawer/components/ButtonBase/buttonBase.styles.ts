import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import { textBodyLarge500 } from "../../../../../../../styles/common/mixins/fonts";

export const StyledButtonBase = styled(ButtonBase)`
  ${textBodyLarge500}
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  padding: 12px 16px;
  width: 100%;
`;
