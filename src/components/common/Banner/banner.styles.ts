import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import { FONT } from "../../../styles/common/constants/font";
import { mediaUpLarge } from "../../../styles/common/mixins/breakpoints";

export const StyledAlert = styled(Alert)`
  justify-content: center;
  padding: 8px 12px;
  text-align: center;

  .MuiAlert-message {
    align-self: center;
    flex: 1;
    font: ${FONT.BODY_SMALL_400};

    .MuiLink-root {
      color: inherit;
    }
  }

  .MuiAlert-action {
    margin: -8px;
    padding: 0;
  }

  ${mediaUpLarge} {
    padding: 8px 16px;
  }
`;
