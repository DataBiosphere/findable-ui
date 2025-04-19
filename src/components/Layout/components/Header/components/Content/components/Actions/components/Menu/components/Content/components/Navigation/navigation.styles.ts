import styled from "@emotion/styled";
import { FONT } from "../../../../../../../../../../../../../../styles/common/constants/font";
import { PALETTE } from "../../../../../../../../../../../../../../styles/common/constants/palette";
import { Navigation as DXNavigation } from "../../../../../../../Navigation/navigation";

export const Navigation = styled(DXNavigation)`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  justify-content: flex-start;

  .MuiButton-activeNav,
  .MuiButton-nav {
    font: ${FONT.BODY_LARGE_500};
    justify-content: space-between;
    padding: 12px 24px;

    .MuiButton-endIcon {
      transform: rotate(-90deg);
    }
  }
`;

export const DrawerNavigation = styled(Navigation)`
  gap: 0;

  .MuiButton-activeNav,
  .MuiButton-nav {
    font: ${FONT.BODY_500};
    padding: 14px 24px;

    &.Mui-disabled {
      color: ${PALETTE.INK_LIGHT};
      font: ${FONT.UPPERCASE_500};
      opacity: 1;
      padding-top: 20px;
      text-transform: uppercase;
    }
  }
`;
