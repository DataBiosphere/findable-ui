import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormControl as MFormControl } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { bpUpSm } from "../../../../styles/common/mixins/breakpoints";
import { ThemeProps } from "../../../../theme/types";
import {
  sectionMargin,
  sectionMarginSm,
} from "../../../common/Section/section.styles";

export const margin = ({ theme }: ThemeProps) => css`
  ${sectionMargin}
  ${bpUpSm({ theme })} {
    ${sectionMarginSm}
  }
`;

export const FormControl = styled(MFormControl)`
  &.MuiFormControl-root {
    ${margin};
    display: flex;
    gap: 16px;

    .MuiFormLabel-root {
      color: ${PALETTE.INK_MAIN};
      display: block;
      font: ${FONT.BODY_LARGE_500};
    }

    .MuiFormHelperText-root {
      align-items: flex-start;
      display: flex;
      gap: 4px;
      margin: 0;
    }

    .MuiRadio-root {
      .MuiSvgIcon-root {
        font-size: 18px;
      }
    }
  }
`;

export const TableFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    display: block;
    margin: 20px 0;

    .MuiFormLabel-root {
      margin: 16px;

      ${bpUpSm} {
        margin: 16px 20px;
      }
    }

    .MuiFormControlLabel-root {
      gap: 12px;
    }

    .MuiFormHelperText-root {
      margin: 16px;

      ${bpUpSm} {
        margin: 16px 20px;
      }
    }

    .MuiTable-root {
      th {
        .MuiFormControlLabel-label {
          font: inherit;
        }
      }

      td,
      th {
        min-height: 48px;
        padding: 14px 16px;

        ${bpUpSm} {
          padding: 14px 20px;
        }
      }
    }
  }
`;

export const GridPaper = styled.div`
  background-color: ${PALETTE.SMOKE_MAIN};
  border-color: ${PALETTE.SMOKE_MAIN};
  border-style: solid;
  border-width: 1px 0 1px 0;
  display: grid;
  gap: 1px;
  margin: 16px 0;
`;
