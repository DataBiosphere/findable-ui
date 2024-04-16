import { AlertProps as MAlertProps } from "@mui/material";
import React, { ReactNode } from "react";
import { Alert } from "./bannerPrimary.styles";

export interface BannerPrimaryProps extends MAlertProps {
  children: ReactNode;
  className?: string;
}

export const BannerPrimary = ({
  children,
  className,
  ...props /* Spread props to allow for Mui AlertProps specific prop overrides. */
}: BannerPrimaryProps): JSX.Element => {
  return (
    <Alert
      className={className}
      color="primary"
      elevation={0}
      icon={false}
      variant="standard"
      {...props}
    >
      {children}
    </Alert>
  );
};
