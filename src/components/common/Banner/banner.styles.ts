import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import { mediaDesktopUp } from "../../../styles/common/mixins/breakpoints";
import { textBodySmall400 } from "../../../styles/common/mixins/fonts";

export const StyledAlert = styled(Alert)`
  justify-content: center;
  padding: 8px 12px;
  text-align: center;

  .MuiAlert-message {
    ${textBodySmall400};
    align-self: center;
    flex: 1;

    .MuiLink-root {
      color: inherit;
    }
  }

  .MuiAlert-action {
    margin: -8px;
    padding: 0;
  }

  ${mediaDesktopUp} {
    padding: 8px 16px;
  }
`;
