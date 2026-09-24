import styled from "@emotion/styled";
import { Drawer } from "@mui/material";
import { PALETTE } from "../../../../../../styles/common/constants/palette";
import { isSurfaceProp } from "../../utils";

/**
 * `Drawer` spreads its remaining props onto this component, and those include
 * the `SurfaceProps` it does not use — `filterSort`, `filterSortEnabled` and
 * `onFilterSortChange`. They are not `MuiDrawerProps`, so MUI would forward
 * them to the DOM; they are filtered here instead. Filtering by
 * `SURFACE_PROP_KEYS` rather than destructuring each one in `Drawer` keeps a
 * field added to `SurfaceProps` later off the DOM too. `theme` is filtered
 * because a custom `shouldForwardProp` replaces Emotion's default, which does
 * that.
 */
export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "theme" && !isSurfaceProp(prop),
})`
  &.MuiDrawer-root {
    .MuiPaper-root {
      background-color: ${PALETTE.SMOKE_LIGHT};
      max-height: 100vh;
      padding: 16px 0;
      width: 312px;
    }

    + .MuiDrawer-root {
      .MuiBackdrop-root {
        background-color: transparent;
      }
    }
  }
`;
