import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import { FONT } from "../../../../../styles/common/constants/font";
import { bpUpSm } from "../../../../../styles/common/mixins/breakpoints";

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
    font: ${FONT.BODY_400};
  }

  .MuiAlert-action {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
  }

  ${bpUpSm} {
    box-sizing: content-box;
    margin: 16px;
    max-width: 400px;
    width: unset;
  }
`;
