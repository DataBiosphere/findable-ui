import {
  Fade,
  Alert as MAlert,
  AlertProps as MAlertProps,
} from "@mui/material";
import React, { ElementType, ReactNode, useEffect, useState } from "react";

export interface CookieBannerProps extends MAlertProps {
  Alert?: ElementType;
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
  open: boolean;
}

export const DismissibleBanner = ({
  Alert = MAlert /* Requires forwardRef to be used as a child of Fade. */,
  className,
  children,
  onDismiss,
  open,
  ...props /* Spread props to allow for Mui AlertProps specific prop overrides. */
}: CookieBannerProps): JSX.Element => {
  const [isIn, setIsIn] = useState<boolean>(false);

  // Callback fired when the component requests to be closed.
  const onClose = (): void => {
    onDismiss?.();
    setIsIn(false);
  };

  // Sets the open state.
  useEffect(() => {
    setIsIn(open);
  }, [open]);

  return (
    <Fade in={isIn} unmountOnExit>
      <Alert className={className} onClose={onClose} {...props}>
        {children}
      </Alert>
    </Fade>
  );
};
