import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { mediaTabletUp } from "../../../../styles/common/mixins/breakpoints";

export const StyledButton = styled(Button)`
  display: none;
  max-width: fit-content;
  padding: 8px 16px;

  ${mediaTabletUp} {
    display: inline-flex;
  }
` as typeof Button;
