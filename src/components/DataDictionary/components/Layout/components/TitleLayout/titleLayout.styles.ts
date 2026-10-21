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
import { HEADER_HEIGHT_VAR } from "../../../../../Layout/components/Header/common/constants";

export const Layout = styled("div")`
  background-color: ${PALETTE.BACKGROUND_DEFAULT};
  grid-area: title;
  min-width: 0;
  z-index: 4;

  /* From 1024px up the title fills a fixed-height grid row, so it pins below the header and a long title truncates rather than wrapping under the filters. */
  ${bpUp1024} {
    ${pinned(HEADER_HEIGHT_VAR)};
    ${pinnedFocus};
    overflow: hidden; /* a custom title taller than the row is clipped, never painted over the filters */

    > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  ${bpDownSm} {
    margin: 0 16px;
  }
`;
