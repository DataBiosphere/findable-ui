import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import { useAuthenticationConfig } from "../../../hooks/authentication/config/useAuthenticationConfig";
import { Login } from "../../Login/login"; // Adjust the import path as necessary

interface LoginDialogProps {
  open: boolean;
}

export const LoginDialog = ({ open }: LoginDialogProps): JSX.Element => {
  const authConfig = useAuthenticationConfig();
  if (!authConfig) return <></>;
  return (
    <Dialog open={open} onClose={(): void => {}}>
      <DialogContent>
        <Login
          providers={authConfig.providers}
          termsOfService={authConfig.termsOfService}
          text="Please sign in to proceed with this action."
          title="Sign In Required"
          warning={authConfig.warning}
        />
      </DialogContent>
    </Dialog>
  );
};
