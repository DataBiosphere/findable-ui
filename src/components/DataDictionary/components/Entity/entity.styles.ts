import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";

export const StyledTypography = styled(Typography)<Partial<LayoutSpacing>>`
  scroll-margin-top: ${({ top = 0 }) => top}px;

  &:hover a {
    opacity: 1;
  }
` as typeof Typography;
