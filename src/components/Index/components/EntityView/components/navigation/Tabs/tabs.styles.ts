import styled from "@emotion/styled";
import { Tabs } from "../../../../../../common/Tabs/tabs";

export const StyledTabs = styled(Tabs)`
  box-shadow: none;
  flex: 1;

  .MuiTabs-scroller {
    padding: 0;
  }

  .MuiTabs-indicator {
    z-index: 4; /* required; positions indicator above list view hero box-shadow */
  }

  .MuiTab-root {
    line-height: 32px;
    margin: 0;
  }
`;
