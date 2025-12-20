import { Chip as MChip, ChipProps as MChipProps } from "@mui/material";
import React, { forwardRef } from "react";

export enum STATUS_BADGE_COLOR {
  DEFAULT = "default",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export const StatusBadge = forwardRef<HTMLDivElement, MChipProps>(
  function StatusBadge(
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- children is null for Mui ChipProps.
      children,
      className,
      color,
      label,
      ...props /* Spread props to allow for Mui ChipProps specific prop overrides e.g. "onDelete". */
    }: MChipProps,
    ref,
  ): JSX.Element {
    return (
      <MChip
        className={className}
        color={color}
        label={label}
        ref={ref}
        variant="status"
        {...props}
      />
    );
  },
);
