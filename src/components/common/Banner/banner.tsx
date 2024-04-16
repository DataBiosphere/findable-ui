import { Alert as MAlert, AlertProps as MAlertProps } from "@mui/material";
import React, { forwardRef, ReactNode } from "react";

export interface BannerProps extends MAlertProps {
  children: ReactNode;
  className?: string;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    children,
    className,
    ...props /* Spread props to allow for Mui AlertProps specific prop overrides. */
  }: BannerProps,
  ref
): JSX.Element {
  return (
    <MAlert className={className} ref={ref} {...props}>
      {children}
    </MAlert>
  );
});
