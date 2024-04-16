import styled from "@emotion/styled";
import {
  textBody500,
  textBodyLarge500,
} from "../../../../../../../../../../../../../../styles/common/mixins/fonts";
import { Navigation as DXNavigation } from "../../../../../../../Navigation/navigation";

export const Navigation = styled(DXNavigation)`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  justify-content: flex-start;

  .MuiButton-nav {
    ${textBodyLarge500};
    justify-content: space-between;
    padding: 12px 24px;

    .MuiButton-endIcon {
      transform: rotate(-90deg);
    }
  }
`;

export const DrawerNavigation = styled(Navigation)`
  gap: 0;

  .MuiButton-nav {
    ${textBody500};
    padding: 14px 24px;
  }
`;
