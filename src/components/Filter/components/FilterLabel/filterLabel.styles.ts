import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { inkLight, smokeMain } from "../../../../styles/common/mixins/colors";
import { SURFACE_TYPE } from "../surfaces/types";
import { FilterLabelProps } from "./filterLabel";

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "surfaceType",
})<Pick<FilterLabelProps, "isOpen" | "surfaceType">>`
  font-weight: inherit;
  gap: 0;
  justify-content: space-between;
  padding: 10px 8px;
  text-transform: none;
  text-align: left;

  :hover {
    background-color: ${smokeMain};
  }

  &.Mui-disabled {
    opacity: 0.3;
  }

  & .MuiButton-endIcon {
    color: ${inkLight};
    margin-right: -4px;
    transform: rotate(-90deg);
  }

  ${({ surfaceType }) =>
    surfaceType === SURFACE_TYPE.MENU &&
    css`
      padding: 6px 8px;

      & .MuiButton-endIcon {
        transform: unset;
      }
    `}

  ${({ isOpen, surfaceType }) =>
    isOpen &&
    css`
      background-color: ${PALETTE.SMOKE_MAIN};

      ${surfaceType === SURFACE_TYPE.MENU &&
      css`
        & .MuiButton-endIcon {
          transform: rotate(180deg);
        }
      `}
    `};
`;
