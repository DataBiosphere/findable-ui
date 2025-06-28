import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { mediaTabletUp } from "../../../../styles/common/mixins/breakpoints";

export const StyledButton = styled(Button)`
  display: none;
  max-width: fit-content;

  ${mediaTabletUp} {
    display: block;
  }
` as typeof Button;
