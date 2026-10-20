import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { IconButton, MenuItem } from "@mui/material";
import { JSX } from "react";
import { stopNavigationEventsPropagation } from "yet-another-react-lightbox";
import { ICON_BUTTON_PROPS } from "../../../../../styles/common/mui/iconButton";
import {
  POPOVER_ORIGIN_HORIZONTAL,
  POPOVER_ORIGIN_VERTICAL,
} from "../../../../../styles/common/mui/popover";
import { SVG_ICON_PROPS } from "../../../../../styles/common/mui/svgIcon";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "../../../../Links/common/entities";
import { DropdownMenu } from "../../../DropdownMenu/dropdownMenu";
import { LABEL } from "../../constants";
import { isCrossOrigin, isDataUrl } from "../../utils";
import type { MoreMenuProps } from "./types";
import { getZoomActions } from "./utils";

/**
 * Lightbox "more actions" menu, with "View original" (opens the original file in a new tab; not offered for a data URL, which browsers block opening in a new tab) and "Download", and on phones, where the zoom group is hidden, "Zoom in", "Zoom out" and "Fit to screen".
 * Download opens a file on another origin in a new tab: browsers ignore the download attribute for one, and would otherwise navigate the app away to show it.
 * The menu renders in a portal but its React events still bubble to the lightbox, so its key, pointer and wheel events are stopped there: arrow keys move through the menu rather than between figures.
 * @param props - Component props.
 * @param props.maxZoom - Maximum zoom level for the current figure and viewport.
 * @param props.onFit - Resets the zoom to fit the figure to the screen.
 * @param props.onZoomIn - Steps the zoom in.
 * @param props.onZoomOut - Steps the zoom out.
 * @param props.originalSrc - URL of the original file.
 * @param props.showZoomActions - Whether to offer zoom in, zoom out and fit.
 * @param props.zoom - Current zoom level.
 * @returns The menu control and the menu.
 */
export const MoreMenu = ({
  maxZoom,
  onFit,
  onZoomIn,
  onZoomOut,
  originalSrc,
  showZoomActions,
  zoom,
}: MoreMenuProps): JSX.Element => {
  return (
    <DropdownMenu
      {...stopNavigationEventsPropagation()}
      anchorOrigin={{
        horizontal: POPOVER_ORIGIN_HORIZONTAL.RIGHT,
        vertical: POPOVER_ORIGIN_VERTICAL.BOTTOM,
      }}
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
      transformOrigin={{
        horizontal: POPOVER_ORIGIN_HORIZONTAL.RIGHT,
        vertical: POPOVER_ORIGIN_VERTICAL.TOP,
      }}
    >
      {({ closeMenu }): JSX.Element[] => [
        ...(showZoomActions
          ? getZoomActions({ maxZoom, onFit, onZoomIn, onZoomOut, zoom }).map(
              ({ disabled, key, label, onClick }) => (
                <MenuItem
                  disabled={disabled}
                  key={key}
                  onClick={(): void => {
                    onClick();
                    closeMenu();
                  }}
                >
                  {label}
                </MenuItem>
              ),
            )
          : []),
        ...(isDataUrl(originalSrc)
          ? []
          : [
              <MenuItem
                component="a"
                href={originalSrc}
                key="view-original"
                onClick={closeMenu}
                rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
                target={ANCHOR_TARGET.BLANK}
              >
                {LABEL.VIEW_ORIGINAL}
              </MenuItem>,
            ]),
        <MenuItem
          component="a"
          download
          href={originalSrc}
          key="download"
          onClick={closeMenu}
          {...(isCrossOrigin(originalSrc) && {
            rel: REL_ATTRIBUTE.NO_OPENER_NO_REFERRER,
            target: ANCHOR_TARGET.BLANK,
          })}
        >
          {LABEL.DOWNLOAD}
        </MenuItem>,
      ]}
    </DropdownMenu>
  );
};
