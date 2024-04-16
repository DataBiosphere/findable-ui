import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../../../styles/common/mixins/breakpoints";

export const SidebarTools = styled.div`
  display: grid;
  gap: 8px 0;
  grid-template-columns: 1fr auto;
  margin: 8px 0;
  padding: 0 16px;

  .MuiAutocomplete-root {
    grid-column: 1 / -1; // SearchAllFilters component to utilize full width of the grid.
  }

  ${mediaDesktopSmallUp} {
    padding: 8px 16px;
  }
`;
