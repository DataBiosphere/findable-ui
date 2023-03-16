import styled from "@emotion/styled";
import { AppBar } from "@mui/material";

// Template variables
export const HEADER_HEIGHT = 56;

export const Header = styled(AppBar)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.smoke.main};
`;
