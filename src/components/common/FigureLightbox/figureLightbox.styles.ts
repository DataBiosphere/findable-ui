import styled from "@emotion/styled";
import Lightbox from "yet-another-react-lightbox";
import { PALETTE } from "../../../styles/common/constants/palette";

export const StyledLightbox = styled(Lightbox)`
  // Sits on the modal layer rather than the library's default (9999), so MUI
  // menus and tooltips opened from the controls render above it.
  --yarl__portal_zindex: ${({ theme }) => theme.zIndex.modal};
  --yarl__color_backdrop: ${PALETTE.SMOKE_MAIN};

  // A zoomed figure overflows the container. "hidden" still lets the browser
  // scroll the container, e.g. to bring a focused control into view, which
  // shifts the controls off screen; "clip" can't be scrolled.
  .yarl__container {
    overflow: clip;
  }
`;
