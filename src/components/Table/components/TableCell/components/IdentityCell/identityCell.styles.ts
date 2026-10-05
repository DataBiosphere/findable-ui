import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const StyledStack = styled(Stack)`
  // Explore view links render a plain anchor, without the MuiLink-root class.
  .MuiLink-root,
  > a {
    align-self: flex-start;
  }
`;
