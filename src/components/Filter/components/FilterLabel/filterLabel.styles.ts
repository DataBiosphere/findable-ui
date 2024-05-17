import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { mediaDesktopSmallUp } from "../../../../styles/common/mixins/breakpoints";

export const FilterLabel = styled(Button)`
  font-weight: inherit;
  gap: 0;
  justify-content: space-between;
  padding: 10px 16px;
  text-transform: none;
  text-align: left;

  :hover {
    background-color: transparent;
  }

  &.Mui-disabled {
    opacity: 0.3;
  }

  & .MuiButton-endIcon {
    margin-right: -4px;
    transform: rotate(-90deg);
  }

  ${mediaDesktopSmallUp} {
    padding: 6px 0;

    & .MuiButton-endIcon {
      margin-right: 0;
      transform: unset;
    }
  }
`;
