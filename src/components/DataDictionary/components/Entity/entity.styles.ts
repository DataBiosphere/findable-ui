import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { LayoutMetrics } from "../../hooks/UseLayoutMetrics/types";
import { ENTITIES_ROW_GAP } from "../Entities/constants";

export const StyledTypography = styled(Typography)<Partial<LayoutMetrics>>`
  scroll-margin-top: ${({ top = 0 }) => top + ENTITIES_ROW_GAP}px;

  &:hover a {
    opacity: 1;
  }
` as typeof Typography;
