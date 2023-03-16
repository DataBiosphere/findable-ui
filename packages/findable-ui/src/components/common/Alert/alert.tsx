import {
  Alert as MAlert,
  AlertProps as MAlertProps,
  AlertTitle,
} from "@mui/material";
import React, { ReactNode } from "react";

export interface AlertProps {
  children?: ReactNode;
  className?: string;
  color?: MAlertProps["color"];
  icon?: MAlertProps["icon"];
  severity: MAlertProps["severity"];
  title?: ReactNode;
  variant?: MAlertProps["variant"];
}

export const Alert = ({
  children,
  className,
  color,
  icon,
  severity,
  title,
  variant = "standard",
}: AlertProps): JSX.Element => {
  return (
    <MAlert
      className={className}
      color={color}
      icon={icon}
      severity={severity}
      variant={variant}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MAlert>
  );
};
