import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useCallback } from "react";
import { useAuthenticationConfig } from "../../../hooks/authentication/config/useAuthenticationConfig";
import { Buttons } from "../../Login/components/Buttons/buttons";
import { Consent } from "../../Login/components/Section/components/Consent/consent";
import { Warning } from "../../Login/components/Section/components/Warning/warning";
import { useUserLogin } from "../../Login/hooks/useUserLogin/useUserLogin";
import { CloseIcon } from "../CustomIcon/components/CloseIcon/closeIcon";
import {
  DIALOG_CONTENT_TEXT_PROPS,
  DIALOG_PROPS,
  DIALOG_TITLE_PROPS,
  ICON_BUTTON_PROPS,
  ICON_PROPS,
} from "./constants";
import { StyledDialog } from "./loginDialog.styles";
import { LoginDialogProps } from "./types";

export const LoginDialog = ({ open }: LoginDialogProps): JSX.Element | null => {
  const authConfig = useAuthenticationConfig();
  const { consentState, handleConsent, handleLogin } = useUserLogin();

  const onClose = useCallback((): void => {}, []);

  if (!authConfig) return null;

  return (
    <StyledDialog {...DIALOG_PROPS} onClose={onClose} open={open}>
      <DialogTitle {...DIALOG_TITLE_PROPS}>
        <div>Sign In Required</div>
        <IconButton {...ICON_BUTTON_PROPS} onClick={onClose}>
          <CloseIcon {...ICON_PROPS} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText {...DIALOG_CONTENT_TEXT_PROPS}>
          Please sign in to proceed with this action.
        </DialogContentText>
        <Consent handleConsent={handleConsent} {...consentState}>
          {authConfig.termsOfService}
        </Consent>
      </DialogContent>
      <DialogActions disableSpacing>
        <Buttons handleLogin={handleLogin} providers={authConfig.providers} />
      </DialogActions>
      <Warning>{authConfig.warning}</Warning>
    </StyledDialog>
  );
};
