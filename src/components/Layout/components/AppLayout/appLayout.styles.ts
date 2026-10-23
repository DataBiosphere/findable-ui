import styled from "@emotion/styled";
import { FOOTER_VIEW_TIMELINE } from "../Footer/common/constants";

/**
 * Grows with the page, so the sticky header stays pinned on long pages. A grid
 * rather than a flex column so the main row's height is definite: percentage
 * heights below it (e.g. `height: 100%` views) still fill the space between
 * the header and footer.
 */
export const AppLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  timeline-scope: ${FOOTER_VIEW_TIMELINE}; /* lets the sidebar follow the footer */

  > header {
    grid-row: 1;
  }

  > main {
    grid-row: 2;
  }

  > footer {
    grid-row: 3;
  }
`;
