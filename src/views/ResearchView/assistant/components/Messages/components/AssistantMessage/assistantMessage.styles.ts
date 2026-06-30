import styled from "@emotion/styled";
import { MarkdownRenderer } from "../../../../../../../components/MarkdownRenderer/markdownRenderer";
import { FONT } from "../../../../../../../styles/common/constants/font";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";

// Sensible defaults for assistant markdown in the narrow chat panel. Consumers
// can override any of these by targeting the stable `MARKDOWN_CLASS_NAME` class.
export const StyledMarkdownRenderer = styled(MarkdownRenderer)`
  font: ${FONT.BODY_400};

  h1 {
    font: ${FONT.HEADING_SMALL};
  }

  h2 {
    font: ${FONT.HEADING_XSMALL};
  }

  h3,
  h4,
  h5,
  h6 {
    font: ${FONT.BODY_500};
  }

  hr {
    border: none;
    border-top: 1px solid ${PALETTE.SMOKE_MAIN};
  }

  // List treatment mirrors the consumer content styles (24px indent, not the
  // browser's 40px), keeping the chat's body-400 font rather than the larger
  // content font.
  ol,
  ul {
    margin: 16px 0;
    padding: 0 0 0 24px;

    li {
      margin: 8px 0;
    }
  }
`;
