import { CloseRounded } from "@mui/icons-material";
import { IconButton, Toolbar as MToolbar } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { ComponentsConfig } from "../../../../../../../../../../../../config/entities";
import { Left, Right } from "../../../../../../../../header.styles";
import { Announcements } from "../../../../../../../Announcements/announcements";
import { Actions } from "../../../../actions";
import {
  Authentication,
  renderIconButton as renderAuthenticationIconButton,
} from "../../../Authentication/authentication";
import {
  renderIconButton as renderSearchIconButton,
  Search,
} from "../../../Search/search";

export interface DialogTitleProps {
  actions?: ReactNode;
  announcements?: ComponentsConfig;
  authenticationEnabled?: boolean;
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
              Button={renderSearchIconButton}
              closeMenu={onClose}
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
            <IconButton color="ink" onClick={onClose}>
              <CloseRounded />
            </IconButton>
          </Actions>
        </Right>
      </MToolbar>
    </Fragment>
  );
};
