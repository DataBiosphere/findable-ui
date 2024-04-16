import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormControl as MFormControl } from "@mui/material";
import { mediaTabletUp } from "../../../../styles/common/mixins/breakpoints";
import {
  inkMain,
  smokeLightest,
  smokeMain,
} from "../../../../styles/common/mixins/colors";
import { textBodyLarge500 } from "../../../../styles/common/mixins/fonts";
import { ThemeProps } from "../../../../theme/theme";
import {
  sectionMargin,
  sectionMarginSm,
} from "../../../common/Section/section.styles";

export const margin = ({ theme }: ThemeProps) => css`
  ${sectionMargin}
  ${mediaTabletUp({ theme })} {
    ${sectionMarginSm}
  }
`;

export const FormControl = styled(MFormControl)`
  &.MuiFormControl-root {
    ${margin};
    display: flex;
    gap: 16px;

    .MuiFormLabel-root {
      ${textBodyLarge500};
      color: ${inkMain};
      display: block;
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

      ${mediaTabletUp} {
        margin: 16px 20px;
      }
    }

    .MuiFormControlLabel-root {
      gap: 12px;
    }

    .MuiFormHelperText-root {
      margin: 16px;

      ${mediaTabletUp} {
        margin: 16px 20px;
      }
    }

    .MuiTable-root {
      th {
        background-color: ${smokeLightest};

        .MuiFormControlLabel-label {
          font: inherit;
        }
      }

      td,
      th {
        min-height: 48px;
        padding: 14px 16px;

        ${mediaTabletUp} {
          padding: 14px 20px;
        }
      }
    }
  }
`;

export const GridPaper = styled.div`
  background-color: ${smokeMain};
  border-color: ${smokeMain};
  border-style: solid;
  border-width: 1px 0 1px 0;
  display: grid;
  gap: 1px;
  margin: 16px 0;
`;
