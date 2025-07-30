import styled from "@emotion/styled";
import { PALETTE } from "../../../../styles/common/constants/palette";
import {
  mediaTabletDown,
  mediaTabletUp,
} from "../../../../styles/common/mixins/breakpoints";
import { textHeadingSmall } from "../../../../styles/common/mixins/fonts";
import { FluidPaper } from "../../../common/Paper/components/FluidPaper/fluidPaper";
import { MarkdownRenderer } from "../../../MarkdownRenderer/markdownRenderer";

export const StyledFluidPaper = styled(FluidPaper)`
  padding: 20px;

  ${mediaTabletDown} {
    padding: 20px 16px;
  }
`;

export const StyledMarkdownRenderer = styled(MarkdownRenderer)`
  align-self: flex-start;

  code {
    all: unset;
    font: inherit;
    font-family: Roboto Mono, monospace;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 8px 0;
  }

  h2 {
    ${textHeadingSmall};
    font-size: 18px;
    line-height: 26px;

    ${mediaTabletUp} {
      font-size: 18px;
      line-height: 26px;
    }
  }

  hr {
    border: none;
    border-bottom: 1px solid ${PALETTE.SMOKE_MAIN};
    margin: 16px 0;
  }

  p {
    font: inherit;
  }
`;
