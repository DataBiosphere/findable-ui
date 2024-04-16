import styled from "@emotion/styled";
import { Button as MButton } from "@mui/material";
import { textBody500 } from "../../../../../../../../../../../../styles/common/mixins/fonts";

export const Button = styled(MButton)`
  & {
    ${textBody500};
    padding: 6px 12px;
  }
`;
