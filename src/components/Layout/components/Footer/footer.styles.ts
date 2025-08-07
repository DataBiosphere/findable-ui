import styled from "@emotion/styled";
import { AppBar as MAppBar } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { mediaTabletUp } from "../../../../styles/common/mixins/breakpoints";
import { inkMain, smokeMain } from "../../../../styles/common/mixins/colors";
import { Socials as DXSocials } from "../../../common/Socials/socials";
import { Link as DXLink } from "../../../Links/components/Link/link";

export const AppBar = styled(MAppBar)`
  padding: 16px 0;
  z-index: 1; /* required for outline or navigation overflow */

  .MuiToolbar-root {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
    min-height: unset;
    padding: 0 16px;
  }

  ${mediaTabletUp} {
    padding: 0;

    .MuiToolbar-root {
      align-items: center;
      flex-direction: row;
      gap: unset;
      min-height: 56px;
    }
  }
` as typeof MAppBar;

export const Links = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${mediaTabletUp} {
    flex-direction: row;
  }
`;

export const Link = styled(DXLink)`
  align-items: center;
  color: ${inkMain};
  display: flex;
  font: ${FONT.BODY_SMALL_400};
`;

export const Socials = styled(DXSocials)`
  gap: 8px;
  .MuiIconButton-root {
    &:hover {
      background-color: ${smokeMain};
    }
  }
`;
