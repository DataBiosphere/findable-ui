import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { inkMain } from "../../../../styles/common/mixins/colors";
import { SURFACE_TYPE } from "../surfaces/types";
import { FiltersProps } from "./filters";

interface Props {
  height: number;
}

export const Filters = styled("div")<
  Props & Pick<FiltersProps, "disabled" | "surfaceType">
>`
  color: ${inkMain};
  font: ${FONT.BODY_500};
  height: ${({ height }) => height}px;
  margin: 8px 0;
  overflow: auto;
  padding: 0 8px 8px;

  // Filters are globally "disabled".
  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};

  .MuiDivider-root {
    margin: 8px;
  }

  ${({ surfaceType }) =>
    surfaceType === SURFACE_TYPE.MENU &&
    css`
      height: unset;
      overflow: unset;
      padding: 0 8px;
    `}
`;

export const StyledTypography = styled(Typography)`
  padding: 8px;
`;
