import styled from "@emotion/styled";
import { Popper } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { SHADOWS } from "../../../../../../styles/common/constants/shadows";
import { MAX_LINES_VAR, OVERLAY_PADDING } from "./constants";

export const StyledContent = styled.div`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: var(${MAX_LINES_VAR});
  overflow: hidden;
`;

export const StyledPopper = styled(Popper)`
  z-index: 2;

  .clamped-content-expanded {
    background-color: ${PALETTE.COMMON_WHITE};
    border-radius: 2px;
    box-shadow: ${SHADOWS["01"]};
    box-sizing: border-box;
    max-height: 50vh;
    max-width: 400px;
    overflow-y: auto;
    outline: 1px solid ${PALETTE.PRIMARY_MAIN};
    overflow-wrap: anywhere;
    padding: ${OVERLAY_PADDING.Y}px ${OVERLAY_PADDING.X}px;
  }
`;
