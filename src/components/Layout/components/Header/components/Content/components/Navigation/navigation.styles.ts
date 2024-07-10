import styled from "@emotion/styled";
import { mediaDesktopSmallUp } from "../../../../../../../../styles/common/mixins/breakpoints";
import { textBody500 } from "../../../../../../../../styles/common/mixins/fonts";

export const Navigation = styled("div")`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-start;

  ${mediaDesktopSmallUp} {
    flex: unset;
    justify-content: inherit;
  }

  .MuiButton-nav {
    ${textBody500};
    padding: 6px 12px;

    .MuiButton-endIcon {
      margin-left: -6px;
      margin-right: -6px;
    }
  }

  .MuiDivider-root {
    margin: 8px 0;

    ${mediaDesktopSmallUp} {
      display: none;
    }
  }
`;
