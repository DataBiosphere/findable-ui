import { AlertProps as MAlertProps } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { useSystemStatus } from "../../../../../hooks/useSystemStatus";
import { BannerPrimary } from "../BannerPrimary/bannerPrimary";

export interface SystemIndexingProps extends Omit<MAlertProps, "title"> {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
}

export const SystemIndexing = ({
  children,
  className,
  title = "Data indexing in progress. Downloads and exports are disabled as search results may be incomplete.",
  ...props
}: SystemIndexingProps): JSX.Element => {
  const systemStatus = useSystemStatus();
  const { indexing, loading, ok } = systemStatus;
  const showAlert = !loading && ok && indexing;
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
