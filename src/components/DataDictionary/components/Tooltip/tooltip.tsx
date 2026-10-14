import { Tooltip as MTooltip } from "@mui/material";
import { JSX } from "react";
import { BaseComponentProps } from "../../../types";
import { Title } from "./components/Title/title";
import { TitleProps } from "./components/Title/types";
import { TOOLTIP_PROPS } from "./constants";
import { TooltipProps } from "./types";

/**
 * Data dictionary tooltip, wrapping its children in a span and showing the title above the description.
 * The given Mui Tooltip props override the defaults in TOOLTIP_PROPS.
 * @param props - Component props.
 * @param props.children - Tooltip anchor content.
 * @param props.className - Class name applied to the span wrapping the children.
 * @param props.description - Tooltip description; without it the tooltip is not shown.
 * @param props.title - Tooltip title.
 * @returns The tooltip.
 */
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
