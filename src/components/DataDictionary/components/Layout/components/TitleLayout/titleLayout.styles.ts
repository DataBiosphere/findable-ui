import styled from "@emotion/styled";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import {
  bpDown1024,
  bpDownSm,
} from "../../../../../../styles/common/mixins/breakpoints";

export const Layout = styled("div")`
  /* Opaque so content scrolling underneath does not show through — including the
     outline, which the footer pushes up under this element at the end of the
     scroll. Matches the filters below, which are sticky for the same reason. */
  background-color: ${PALETTE.BACKGROUND_DEFAULT};
  grid-column: 1 / -1;
  grid-row: 1;
  height: fit-content;
  position: sticky;
  top: 0;
  z-index: 4;

  ${bpDown1024} {
    grid-column: 1;
    grid-row: auto;
    position: relative;
  }

  ${bpDownSm} {
    margin: 0 16px;
  }
`;
