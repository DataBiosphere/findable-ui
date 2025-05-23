import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";
import { ENTITIES_ROW_GAP } from "../Entities/constants";
import { LAYOUT_SPACING } from "../Layout/constants";

const TOP =
  ENTITIES_ROW_GAP +
  LAYOUT_SPACING.TITLE_HEIGHT +
  LAYOUT_SPACING.FILTERS_HEIGHT +
  LAYOUT_SPACING.FILTERS_PADDING_TOP +
  LAYOUT_SPACING.CONTENT_PADDING_TOP;

export const StyledTypography = styled(Typography)<Partial<LayoutSpacing>>`
  scroll-margin-top: ${({ top = 0 }) => top + TOP}px;

  &:hover a {
    opacity: 1;
  }
` as typeof Typography;
