import styled from "@emotion/styled";
import { SUPPORTS_PAGE_SCROLL } from "../../../../../../styles/common/constants/supports";
import { bpUpMd } from "../../../../../../styles/common/mixins/breakpoints";
import { pinned } from "../../../../../../styles/common/mixins/pinned";
import {
  FOOTER_HEIGHT_VAR,
  FOOTER_VIEW_TIMELINE,
} from "../../../Footer/common/constants";
import { HEADER_HEIGHT_VAR } from "../../../Header/common/constants";

export const SidebarPositioner = styled("div")`
  box-sizing: border-box;
  height: 100%;
  overflow: visible;
  padding: 16px 0;

  ${bpUpMd} {
    max-height: calc(100vh - ${HEADER_HEIGHT_VAR});
    overflow: auto;
    padding: 0;
    ${pinned(HEADER_HEIGHT_VAR)};

    /* Shrinks as the footer scrolls in, by as much of it as is in view, so the
       end of the column doesn't push the top of the sidebar under the header. */
    @supports ${SUPPORTS_PAGE_SCROLL} {
      animation: sidebar-above-footer linear both;
      animation-range: entry 0% entry 100%;
      animation-timeline: ${FOOTER_VIEW_TIMELINE};
    }
  }

  @keyframes sidebar-above-footer {
    from {
      max-height: calc(100vh - ${HEADER_HEIGHT_VAR});
    }

    to {
      max-height: calc(100vh - ${HEADER_HEIGHT_VAR} - ${FOOTER_HEIGHT_VAR});
    }
  }
`;
