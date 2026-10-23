import styled from "@emotion/styled";
import { bpDown1024 } from "../../../../../../styles/common/mixins/breakpoints";
import { LAYOUT_SPACING } from "../../constants";

const PB = LAYOUT_SPACING.CONTENT_PADDING_BOTTOM; /* bottom padding */
const PT = LAYOUT_SPACING.CONTENT_PADDING_TOP; /* top padding */

export const Layout = styled("div")`
  display: grid;
  gap: 16px;
  grid-area: entities; /* follows the filters, so its position needs no measurement */
  padding-bottom: ${PB}px;
  z-index: 1; /* not required, but helpful in that the entities are always on top */

  ${bpDown1024} {
    padding-top: ${PT}px;
  }
`;
