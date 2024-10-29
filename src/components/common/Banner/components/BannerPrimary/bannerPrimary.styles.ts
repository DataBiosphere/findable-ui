import styled from "@emotion/styled";
import { Alert as MAlert } from "@mui/material";
import { primaryMain, white } from "../../../../../styles/common/mixins/colors";
import { textBodySmall400 } from "../../../../../styles/common/mixins/fonts";

export const Alert = styled(MAlert)`
  border-radius: 0;
  justify-content: center;
  padding: 8px;

  &.MuiAlert-standardPrimary {
    background-color: ${primaryMain};
    color: ${white};
  }

  .MuiAlert-message {
    ${textBodySmall400};
    text-align: center;

    .MuiLink-root {
      color: inherit;
    }
  }
`;
