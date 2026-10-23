import styled from "@emotion/styled";
import { AppBar as MAppBar } from "@mui/material";
import { FONT } from "../../../../styles/common/constants/font";
import { PALETTE } from "../../../../styles/common/constants/palette";
import { bpUpSm } from "../../../../styles/common/mixins/breakpoints";
import { Socials as DXSocials } from "../../../common/Socials/socials";
import { Link as DXLink } from "../../../Links/components/Link/link";
import { FOOTER_HEIGHT, FOOTER_VIEW_TIMELINE } from "./common/constants";

export const AppBar = styled(MAppBar)`
  padding: 16px 0;
  view-timeline: ${FOOTER_VIEW_TIMELINE} block;
  z-index: 1; /* required for outline or navigation overflow */

  .MuiToolbar-root {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
    min-height: unset;
    padding: 0 16px;
  }

  ${bpUpSm} {
    padding: 0;

    .MuiToolbar-root {
      align-items: center;
      flex-direction: row;
      gap: unset;
      min-height: ${FOOTER_HEIGHT}px;
    }
  }
` as typeof MAppBar;

export const Links = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${bpUpSm} {
    flex-direction: row;
  }
`;

export const Link = styled(DXLink)`
  align-items: center;
  color: ${PALETTE.INK_MAIN};
  display: flex;
  font: ${FONT.BODY_SMALL_400};
`;

export const Socials = styled(DXSocials)`
  gap: 8px;
  .MuiIconButton-root {
    &:hover {
      background-color: ${PALETTE.SMOKE_MAIN};
    }
  }
`;
