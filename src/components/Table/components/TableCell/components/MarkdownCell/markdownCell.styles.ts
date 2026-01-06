import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { MarkdownRenderer } from "../../../../../MarkdownRenderer/markdownRenderer";

export const StyledMarkdownRenderer = styled(MarkdownRenderer)`
  align-self: flex-start;

  code {
    all: unset;
    font: inherit;
    font-family:
      Roboto Mono,
      monospace;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 8px 0;
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
