import { AlertProps as MAlertProps } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { useSystemStatus } from "../../../../../hooks/useSystemStatus";
import { BannerPrimary } from "../BannerPrimary/bannerPrimary";

export interface SystemStatusProps extends Omit<MAlertProps, "title"> {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
}

export const SystemStatus = ({
  children,
  className,
  title = "One or more of the system components are currently unavailable. Functionality may be degraded.",
  ...props
}: SystemStatusProps): JSX.Element => {
  const systemStatus = useSystemStatus();
  const { loading, ok } = systemStatus;
  const showAlert = !loading && !ok;
  return (
    <Fragment>
      {showAlert && (
        <BannerPrimary className={className} {...props}>
          <Fragment>
            {title}
            {children}
          </Fragment>
        </BannerPrimary>
      )}
    </Fragment>
  );
};
