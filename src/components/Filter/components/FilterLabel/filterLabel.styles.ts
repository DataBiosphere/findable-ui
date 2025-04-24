import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { mediaUpMedium } from "../../../../styles/common/mixins/breakpoints";

interface Props {
  isOpen: boolean;
}

export const FilterLabel = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<Props>`
  font-weight: inherit;
  gap: 0;
  justify-content: space-between;
  padding: 10px 8px;
  text-transform: none;
  text-align: left;

  :hover {
    background-color: ${PALETTE.SMOKE_MAIN};
  }

  &.Mui-disabled {
    opacity: 0.3;
  }

  & .MuiButton-endIcon {
    color: ${PALETTE.INK_LIGHT};
    margin-right: -4px;
    transform: rotate(-90deg);
  }

  ${mediaUpMedium} {
    padding: 6px 8px;

    & .MuiButton-endIcon {
      transform: unset;
    }
  }

  ${(props) =>
    props.isOpen &&
    css`
      background-color: ${PALETTE.SMOKE_MAIN};

      ${mediaUpMedium(props)} {
        & .MuiButton-endIcon {
          transform: rotate(180deg);
        }
      }
    `};
`;
