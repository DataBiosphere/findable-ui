import { AlertProps as MAlertProps } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { useSessionTimeout } from "../../../../../hooks/useSessionTimeout";
import { Banner } from "./sessionTimeout.styles";

export interface SessionTimeoutProps extends Omit<MAlertProps, "title"> {
  className?: string;
  title?: ReactNode;
}

export const SessionTimeout = ({
  className,
  title = "For your security, you have been logged out due to 15 minutes of inactivity.",
  ...props
}: SessionTimeoutProps): JSX.Element => {
  const { clearSessionTimeout, isSessionTimeout } = useSessionTimeout();
  return (
    <Fragment>
      {isSessionTimeout && (
        <Banner className={className} onClose={clearSessionTimeout} {...props}>
          {title}
        </Banner>
      )}
    </Fragment>
  );
};
