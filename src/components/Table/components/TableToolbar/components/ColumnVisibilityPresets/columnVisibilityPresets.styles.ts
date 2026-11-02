import styled from "@emotion/styled";
import { ToggleButtonGroup } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  .MuiToggleButton-root {
    max-height: 32px;
    padding: 6px 16px;
    text-transform: none;

    &:not(.Mui-selected) {
      color: ${PALETTE.INK_LIGHT};
    }

    &[aria-disabled="true"] {
      cursor: default;
      opacity: 0.5;

      &:hover {
        background-color: transparent;
      }
    }
  }
`;
