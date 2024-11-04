import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import { mediaTabletUp } from "../../../../../styles/common/mixins/breakpoints";
import { textBody400 } from "../../../../../styles/common/mixins/fonts";

export const StyledAlert = styled(Alert)`
  bottom: 0;
  flex-direction: column;
  gap: 16px;
  left: 0;
  margin: 8px;
  position: fixed;
  width: calc(100vw - 16px);
  z-index: 1100; // Above support fab, below support form.

  .MuiAlert-message {
    ${textBody400};
  }

  .MuiAlert-action {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
  }

  ${mediaTabletUp} {
    box-sizing: content-box;
    margin: 16px;
    max-width: 400px;
    width: unset;
  }
`;
