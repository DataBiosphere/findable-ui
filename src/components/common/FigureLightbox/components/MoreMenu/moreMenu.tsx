import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { IconButton, MenuItem } from "@mui/material";
import { JSX } from "react";
import { stopNavigationEventsPropagation } from "yet-another-react-lightbox";
import { ICON_BUTTON_PROPS } from "../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../../styles/common/mui/svgIcon";
import { DropdownMenu } from "../../../DropdownMenu/dropdownMenu";
import { LABEL } from "../../constants";
import { MoreMenuProps } from "./types";

/**
 * Lightbox "more actions" menu, with "View original" (opens the original file in a new tab) and "Download".
 * The menu renders in a portal but its React events still bubble to the lightbox, so its key, pointer and wheel events are stopped there: arrow keys move through the menu rather than between figures.
 * @param props - Component props.
 * @param props.originalSrc - URL of the original file.
 * @returns The menu control and the menu.
 */
export const MoreMenu = ({ originalSrc }: MoreMenuProps): JSX.Element => {
  return (
    <DropdownMenu
      {...stopNavigationEventsPropagation()}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      button={({ open: _open, ...props }): JSX.Element => (
        <IconButton
          aria-label={LABEL.MORE}
          color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
          size={ICON_BUTTON_PROPS.SIZE.MEDIUM}
          {...props}
        >
          <MoreVertRoundedIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
        </IconButton>
      )}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
    >
      {({ closeMenu }): JSX.Element[] => [
        <MenuItem
          component="a"
          href={originalSrc}
          key="view-original"
          onClick={closeMenu}
          rel="noopener noreferrer"
          target="_blank"
        >
          {LABEL.VIEW_ORIGINAL}
        </MenuItem>,
        <MenuItem
          component="a"
          download
          href={originalSrc}
          key="download"
          onClick={closeMenu}
        >
          {LABEL.DOWNLOAD}
        </MenuItem>,
      ]}
    </DropdownMenu>
  );
};
