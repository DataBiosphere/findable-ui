import { Tooltip as MTooltip } from "@mui/material";
import React from "react";
import { BaseComponentProps } from "../../../types";
import { Title } from "./components/Title/title";
import { TitleProps } from "./components/Title/types";
import { TOOLTIP_PROPS } from "./constants";
import { TooltipProps } from "./types";

export const Tooltip = ({
  children,
  className,
  description,
  title,
  ...props
}: BaseComponentProps & TitleProps & TooltipProps): JSX.Element => {
  return (
    <MTooltip
      {...TOOLTIP_PROPS}
      className={className}
      title={description && <Title description={description} title={title} />}
      {...props}
    >
      <span>{children}</span>
    </MTooltip>
  );
};
