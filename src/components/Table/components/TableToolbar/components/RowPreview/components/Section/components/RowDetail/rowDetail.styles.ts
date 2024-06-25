import styled from "@emotion/styled";
import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "../../../../../../../../../../styles/common/mixins/breakpoints";
import { textBody400 } from "../../../../../../../../../../styles/common/mixins/fonts";

export const Section = styled.div`
  ${textBody400};
  display: grid;
  gap: 16px;
  grid-auto-rows: minmax(40px, auto);
  grid-template-columns: 1fr;
  justify-items: flex-start;
  padding: 16px 24px;

  > .MuiGrid-root {
    display: grid;
    gap: 4px;
    grid-column: 1 / -1;
    grid-template-columns: inherit;
  }

  > .MuiButton-textPrimary {
    grid-column: 1 / -1;
    justify-self: flex-start;
    text-align: left;
    text-transform: none;
  }

  ${mediaTabletUp} {
    align-items: center;
    gap: 0 8px;
    grid-template-columns: 1fr 1fr;
    justify-items: stretch;
    padding: 8px 24px;

    > .MuiGrid-root {
      display: contents;
    }
  }

  ${mediaDesktopSmallUp} {
    grid-template-columns: 194px 1fr;
  }
`;
