import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { mediaDesktopSmallDown } from "../../../../styles/common/mixins/breakpoints";
import { textBody400 } from "../../../../styles/common/mixins/fonts";

export const StyledForm = styled("form")`
  padding: 16px;
  width: 396px;

  .MuiToggleButtonGroup-root {
    grid-auto-columns: 1fr 1fr auto 1fr; // buttons + divider
    width: 100%;

    .MuiToggleButton-root {
      color: ${PALETTE.INK_LIGHT};
      padding: 8px 12px;
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
    grid-template-rows: auto auto auto;
    margin: 12px 0 16px 0;

    .MuiFormControl-root {
      display: grid;
      gap: 4px 0;
      grid-row: 1 / -1;
      grid-template-rows: subgrid;

      .MuiInputLabel-root {
        ${textBody400};
        color: ${PALETTE.INK_MAIN};
        max-width: unset;
        position: relative;
        transform: unset;
      }

      .MuiOutlinedInput-root {
        .MuiOutlinedInput-input {
          padding-right: 10px;
        }

        input::placeholder {
          color: ${PALETTE.INK_LIGHT};
          opacity: 0.8;
        }

        &.Mui-focused {
          input::placeholder {
            opacity: 0;
          }
        }
      }

      .MuiFormLabel-filled + .MuiOutlinedInput-root {
        .MuiOutlinedInput-input {
          color: ${PALETTE.INK_MAIN};
        }
      }

      .MuiFormHelperText-root {
        color: ${PALETTE.INK_LIGHT};

        &.Mui-error {
          color: ${PALETTE.ALERT_MAIN};
        }
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

  ${mediaDesktopSmallDown} {
    padding: 0 16px;
    width: 312px;

    .MuiGrid-root {
      gap: 16px 0;
      grid-template-rows: auto auto;
      margin: 16px 0;

      .MuiFormControl-root {
        grid-row: unset;
        grid-template-rows: unset;
      }

      .MuiDivider-root {
        display: none;
      }
    }
  }
`;
