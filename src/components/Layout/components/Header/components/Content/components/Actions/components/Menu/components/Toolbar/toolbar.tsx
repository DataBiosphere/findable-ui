import { CloseRounded } from "@mui/icons-material";
import { IconButton, Toolbar as MToolbar } from "@mui/material";
import { Fragment, JSX, ReactNode } from "react";
import { ComponentsConfig } from "../../../../../../../../../../../../config/entities";
import { Left, Right } from "../../../../../../../../header.styles";
import { Announcements } from "../../../../../../../Announcements/announcements";
import { Actions } from "../../../../actions";
import { Authentication } from "../../../Authentication/authentication";
import { Search } from "../../../Search/search";
import { ARIA_LABEL } from "./constants";

/**
 * Props for the Toolbar component.
 */
export interface DialogTitleProps {
  actions?: ReactNode;
  announcements?: ComponentsConfig;
  authenticationEnabled?: boolean | string;
  logo?: ReactNode;
  onClose: () => void;
  searchEnabled?: boolean;
  searchURL?: string;
}

/**
 * Header menu dialog toolbar, rendering the announcements above the logo, the search and authentication controls, any additional actions, and a close menu button.
 * @param props - Component props.
 * @param props.actions - Additional actions, e.g. a call to action button.
 * @param props.announcements - Announcements components config.
 * @param props.authenticationEnabled - `true` to enable authentication with the default sign-in path, a string to enable it with that sign-in path; falsy disables it.
 * @param props.logo - Logo.
 * @param props.onClose - Function invoked to close the menu.
 * @param props.searchEnabled - Whether search is enabled.
 * @param props.searchURL - Search page URL.
 * @returns The menu toolbar.
 */
export const Toolbar = ({
  actions,
  announcements,
  authenticationEnabled,
  logo,
  onClose,
  searchEnabled,
  searchURL,
}: DialogTitleProps): JSX.Element => {
  return (
    <Fragment>
      <Announcements announcements={announcements} />
      <MToolbar>
        <Left>{logo}</Left>
        <Right>
          <Actions>
            {/* Search */}
            <Search
              closeMenu={onClose}
              isMenuIn
              searchEnabled={searchEnabled}
              searchURL={searchURL}
            />
            {/* Authentication */}
            <Authentication
              authenticationEnabled={authenticationEnabled}
              closeMenu={onClose}
              isMenuIn
            />
            {/* Additional actions i.e. call-to-action button */}
            {actions}
            {/* Close menu */}
            <IconButton
              aria-label={ARIA_LABEL.CLOSE_MENU}
              color="ink"
              onClick={onClose}
            >
              <CloseRounded />
            </IconButton>
          </Actions>
        </Right>
      </MToolbar>
    </Fragment>
  );
};
