import { AlertProps } from "@mui/material";
import { forwardRef, JSX } from "react";
import { BaseComponentProps } from "../../types";
import { StyledAlert } from "./alert.styles";

/**
 * Alert, rendering the styled Mui Alert.
 * @param props - Component props.
 * @param props.children - Alert content.
 * @param props.className - Class name applied to the alert.
 * @param ref - Ref forwarded to the alert element.
 * @returns The alert.
 */
export const Alert = forwardRef<
  HTMLDivElement,
  AlertProps & BaseComponentProps
>(function Alert(
  { children, className, ...props }: AlertProps & BaseComponentProps,
  ref,
): JSX.Element {
  return (
    <StyledAlert className={className} ref={ref} {...props}>
      {children}
    </StyledAlert>
  );
});
