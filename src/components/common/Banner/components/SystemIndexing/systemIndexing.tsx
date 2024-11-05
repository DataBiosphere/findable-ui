import { AlertProps, Fade } from "@mui/material";
import React from "react";
import { useSystemStatus } from "../../../../../hooks/useSystemStatus";
import { BaseComponentProps, ContentProps } from "../../../../types";
import { Banner } from "../../banner";

export const SystemIndexing = ({
  children,
  className,
  content,
  ...props
}: AlertProps & BaseComponentProps & ContentProps): JSX.Element => {
  const systemStatus = useSystemStatus();
  const { indexing, loading, ok } = systemStatus;
  return (
    <Fade in={!loading && ok && indexing} unmountOnExit>
      <Banner className={className} {...props}>
        {content || children}
      </Banner>
    </Fade>
  );
};
