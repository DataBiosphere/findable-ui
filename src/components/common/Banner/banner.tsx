import { AlertProps } from "@mui/material";
import React, { forwardRef } from "react";
import { BaseComponentProps } from "../../types";
import { StyledAlert } from "./banner.styles";
import { ALERT_PROPS } from "./constants";

export const Banner = forwardRef<
  HTMLDivElement,
  AlertProps & BaseComponentProps
>(function Alert(
  { ...props }: AlertProps & BaseComponentProps,
  ref
): JSX.Element {
  return <StyledAlert {...ALERT_PROPS} ref={ref} {...props} />;
});
