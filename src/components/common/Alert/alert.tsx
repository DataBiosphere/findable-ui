import { AlertProps } from "@mui/material";
import React, { forwardRef } from "react";
import { BaseComponentProps } from "../../types";
import { StyledAlert } from "./alert.styles";

export const Alert = forwardRef<
  HTMLDivElement,
  AlertProps & BaseComponentProps
>(function Alert(
  { children, className, ...props }: AlertProps & BaseComponentProps,
  ref
): JSX.Element {
  return (
    <StyledAlert className={className} ref={ref} {...props}>
      {children}
    </StyledAlert>
  );
});
