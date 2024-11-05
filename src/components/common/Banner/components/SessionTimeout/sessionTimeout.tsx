import { AlertProps, Fade } from "@mui/material";
import React from "react";
import { useSessionTimeout } from "../../../../../hooks/useSessionTimeout";
import { BaseComponentProps, ContentProps } from "../../../../types";
import { Banner } from "../../banner";

export const SessionTimeout = ({
  children,
  className,
  content,
  ...props
}: AlertProps & BaseComponentProps & ContentProps): JSX.Element => {
  const { clearSessionTimeout, isSessionTimeout } = useSessionTimeout();
  return (
    <Fade in={isSessionTimeout} unmountOnExit>
      <Banner className={className} onClose={clearSessionTimeout} {...props}>
        {content || children}
      </Banner>
    </Fade>
  );
};
