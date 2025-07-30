import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FilterProps } from "../Filter/filter";
import { SURFACE_TYPE } from "../surfaces/types";

interface Props {
  menuWidth: number;
}

export const FilterView = styled.div<Props>`
  width: ${({ menuWidth }) => `${menuWidth}px`};
`;

export const FilterViewTools = styled("div")<Pick<FilterProps, "surfaceType">>`
  margin: 24px 0 8px;

  ${({ surfaceType }) =>
    surfaceType === SURFACE_TYPE.MENU &&
    css`
      margin: 0;
    `}
`;
