import { Chip as MChip, ChipProps as MChipProps } from "@mui/material";
import { JSX, forwardRef } from "react";

export enum STATUS_BADGE_COLOR {
  DEFAULT = "default",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

/**
 * Status badge, rendering a Mui Chip with the "status" variant.
 * @param props - Component props.
 * @param props.children - Ignored; Mui Chip does not take children.
 * @param props.className - Class name applied to the chip.
 * @param props.color - Chip color.
 * @param props.label - Chip label.
 * @param ref - Ref forwarded to the chip element.
 * @returns The status badge.
 */
export const StatusBadge = forwardRef<HTMLDivElement, MChipProps>(
  function StatusBadge(
    {
      // children is null for Mui ChipProps; destructure out to avoid spreading.
      children: _children,
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
