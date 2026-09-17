import { CloseRounded } from "@mui/icons-material";
import { IconButton, Toolbar as MToolbar } from "@mui/material";
import { Fragment, JSX, ReactNode } from "react";
import { ComponentsConfig } from "../../../../../../../../../../../../config/entities";
import { Left, Right } from "../../../../../../../../header.styles";
import { Announcements } from "../../../../../../../Announcements/announcements";
import { Actions } from "../../../../actions";
import {
  Authentication,
  renderIconButton as renderAuthenticationIconButton,
} from "../../../Authentication/authentication";
import { Search } from "../../../Search/search";
import { ARIA_LABEL } from "./constants";

export interface DialogTitleProps {
  actions?: ReactNode;
  announcements?: ComponentsConfig;
  authenticationEnabled?: boolean | string;
  logo?: ReactNode;
  onClose: () => void;
  searchEnabled?: boolean;
  searchURL?: string;
}

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
              Button={renderAuthenticationIconButton}
              closeMenu={onClose}
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
