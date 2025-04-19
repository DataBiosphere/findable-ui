import styled from "@emotion/styled";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";

export const StyledForm = styled("form")`
  padding: 16px;
  width: 396px;

  .MuiToggleButtonGroup-root {
    grid-auto-columns: 1fr 1fr auto 1fr; // buttons + divider
    width: 100%;

    .MuiToggleButton-root {
      color: ${PALETTE.INK_LIGHT};
      text-transform: capitalize;

      &.Mui-selected {
        color: ${PALETTE.INK_MAIN};
      }
    }

    .MuiDivider-root {
      border-color: ${PALETTE.SMOKE_DARK};
      border-radius: 4px;
      margin: 6px 0;
    }
  }

  .MuiGrid-root {
    display: grid;
    gap: 4px 0;
    grid-auto-flow: column;
    grid-template-rows: auto auto;
    margin: 12px 0 16px 0;

    .MuiFormControl-root {
      display: grid;
      gap: inherit;
      grid-row: 1 / -1;
      grid-template-rows: subgrid;

      .MuiInputLabel-root {
        color: ${PALETTE.INK_MAIN};
        font: ${FONT.BODY_400};
        max-width: unset;
        position: relative;
        transform: unset;
      }

      .MuiOutlinedInput-input {
        padding-right: 10px;
      }
    }

    .MuiDivider-root {
      align-self: center;
      border-color: ${PALETTE.INK_LIGHT};
      grid-row: 2;
      margin: 0 4px;
      width: 8px;
    }
  }

  .MuiButton-root {
    grid-column: 1 / -1;
  }
`;
