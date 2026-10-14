import { FilterListRounded } from "@mui/icons-material";
import { ButtonProps, NoSsr } from "@mui/material";
import { JSX } from "react";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";
import {
  getPopupAriaProps,
  HAS_POPUP,
} from "../../../../../../../utils/ariaPopup";
import { BUTTON_PROPS } from "../../../../../../common/Button/constants";
import { useDrawer } from "../../../../../../common/Drawer/provider/hook";
import { FilterCountChip } from "../../../../../../Filter/components/FilterCountChip/filterCountChip";
import { BaseComponentProps } from "../../../../../../types";
import { StyledButton } from "./filterButton.styles";

/**
 * Filter button that opens the filter drawer, showing the explore state's filter count.
 * When the explore state has category views, the button carries the dialog popup ARIA props for the drawer.
 * The given Mui Button props override the defaults, so an onClick prop replaces the drawer's open handler.
 * @param props - Component props.
 * @param props.className - Class name applied to the button.
 * @returns The filter button, rendered on the client only.
 */
export const FilterButton = ({
  className,
  ...props
}: BaseComponentProps & ButtonProps): JSX.Element => {
  const { id, onOpen, open } = useDrawer();
  const { exploreState } = useExploreState();
  const { categoryViews, filterCount } = exploreState;
  // ExploreView only renders the sidebar drawer when there are categories to
  // filter by, so without them the button opens nothing and must not announce
  // a dialog or point aria-controls at an id that is not in the document.
  const hasDrawer = Boolean(categoryViews?.length);
  return (
    <NoSsr>
      <StyledButton
        {...(hasDrawer
          ? getPopupAriaProps({
              // A consumer can disable the trigger through ButtonProps; a
              // disabled trigger announces no expanded state for a drawer it
              // cannot open.
              disabled: props.disabled,
              hasPopup: HAS_POPUP.DIALOG,
              id,
              open,
            })
          : {})}
        {...BUTTON_PROPS.SECONDARY_CONTAINED}
        className={className}
        onClick={onOpen}
        startIcon={
          <FilterListRounded
            color={SVG_ICON_PROPS.COLOR.INK_LIGHT}
            fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL}
          />
        }
        {...props}
      >
        Filter
        {/* NoSsr prevents server/client hydration mismatch with dynamic chip content */}
        <FilterCountChip count={filterCount} />
      </StyledButton>
    </NoSsr>
  );
};
