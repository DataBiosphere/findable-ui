import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Fade, IconButton } from "@mui/material";
import React from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../../../../../../../hooks/useBreakpointHelper";
import { DESKTOP_SM } from "../../../../../../../../../../../../theme/common/breakpoints";
import { SWITCH_TRANSITION_PROPS } from "../../../../../../../../common/constants";
import { Button } from "./requestAuthentication.styles";

export interface RequestAuthenticationProps {
  closeMenu: () => void;
  requestAuthorization: () => void;
}

export const RequestAuthentication = ({
  closeMenu,
  requestAuthorization,
}: RequestAuthenticationProps): JSX.Element => {
  const smDesktop = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, DESKTOP_SM);
  const switchProps = SWITCH_TRANSITION_PROPS;
  return (
    <>
      <Fade in={smDesktop} {...switchProps}>
        <Button
          onClick={requestAuthorization}
          startIcon={<LoginRoundedIcon />}
          variant="nav"
        >
          Sign in
        </Button>
      </Fade>
      <Fade in={!smDesktop} {...switchProps}>
        <IconButton
          color="ink"
          onClick={(): void => {
            closeMenu();
            requestAuthorization();
          }}
        >
          <LoginRoundedIcon />
        </IconButton>
      </Fade>
    </>
  );
};
