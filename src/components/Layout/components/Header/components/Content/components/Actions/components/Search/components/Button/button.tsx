import { IconButton } from "@mui/material";
import { JSX } from "react";
import { BUTTON_PROPS } from "../../../../../../../../../../../../styles/common/mui/button";
import { ICON_BUTTON_PROPS } from "../../../../../../../../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../../../../../../../../../styles/common/mui/svgIcon";
import { SearchIcon } from "../../../../../../../../../../../common/CustomIcon/components/SearchIcon/searchIcon";
import { StyledButton } from "./button.styles";
import { ButtonProps } from "./types";

/**
 * Renders the button that opens the search bar, as either the icon or the
 * labelled variant.
 * @param props - Component props.
 * @param props.isMenuIn - Renders the icon button variant.
 * @param props.onClick - Toggles the search bar.
 * @param props.open - Whether the search bar is open.
 * @param props.ref - Forwarded to the button element, so focus can be restored to it.
 * @param props.searchBarId - Id of the search bar this button controls.
 * @returns The search button.
 */
export const Button = ({
  isMenuIn,
  onClick,
  open,
  ref,
  searchBarId,
}: ButtonProps): JSX.Element => {
  const ariaProps = {
    "aria-controls": open ? searchBarId : undefined,
    "aria-expanded": open,
  };
  return isMenuIn ? (
    <IconButton
      {...ariaProps}
      color={ICON_BUTTON_PROPS.COLOR.INK}
      onClick={onClick}
      ref={ref}
    >
      <SearchIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.MEDIUM} />
    </IconButton>
  ) : (
    <StyledButton
      {...ariaProps}
      onClick={onClick}
      ref={ref}
      startIcon={<SearchIcon />}
      variant={BUTTON_PROPS.VARIANT.NAV}
    >
      Search
    </StyledButton>
  );
};
