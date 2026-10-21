import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import {
  bpDownSm,
  bpUp1024,
} from "../../../../../../styles/common/mixins/breakpoints";
import {
  pinned,
  pinnedFocus,
} from "../../../../../../styles/common/mixins/pinned";
import { LAYOUT_SPACING, TITLE_BOTTOM } from "../../constants";

const PB = LAYOUT_SPACING.FILTERS_PADDING_BOTTOM; /* bottom padding */
const PT = LAYOUT_SPACING.FILTERS_PADDING_TOP; /* top padding */

export const Layout = styled("div")`
  background-color: ${PALETTE.BACKGROUND_DEFAULT};
  display: grid;
  gap: 12px;
  grid-area: filters;
  z-index: 2; /* required, filters should be on top of entities */

  /* Spacing sits on the children, so a dictionary with no filters collapses the band to nothing. */
  > :empty {
    display: none;
  }

  > :first-child {
    margin-top: ${PT}px;
  }

  > :last-child {
    margin-bottom: ${PB}px;
  }

  ${bpUp1024} {
    ${pinned(TITLE_BOTTOM)}; /* below the sticky title */
    ${pinnedFocus};
  }

  ${bpDownSm} {
    margin: 0 16px;
  }
`;
