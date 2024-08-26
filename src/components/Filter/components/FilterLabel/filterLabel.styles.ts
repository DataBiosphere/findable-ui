import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";
import { inkLight, smokeMain } from "../../../../styles/common/mixins/colors";

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

  ${mediaDesktopSmallUp} {
    padding: 6px 8px;

    & .MuiButton-endIcon {
      transform: unset;
    }
  }

  ${(props) =>
    props.isOpen &&
    css`
      background-color: ${smokeMain(props)};

      ${mediaDesktopSmallUp(props)} {
        & .MuiButton-endIcon {
          transform: rotate(180deg);
        }
      }
    `};
`;
