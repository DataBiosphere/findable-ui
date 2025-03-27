import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Step } from "@mui/material";
import { smokeLightest, white } from "../../../../styles/common/mixins/colors";
import { sectionPadding } from "../../../common/Section/section.styles";

export const StyledStep = styled(Step)`
  &.MuiStep-root {
    &.MuiStep-vertical {
      background-color: ${smokeLightest};

      .MuiStepLabel-root {
        ${sectionPadding};
      }

      .MuiStepContent-root {
        border: none;
        margin: 0;
        padding: 0;
      }

      &.Mui-completed {
        background-color: ${white};
      }

      ${(props) =>
        props.active &&
        css`
          background-color: ${white(props)};
        `};
    }
  }
`;
