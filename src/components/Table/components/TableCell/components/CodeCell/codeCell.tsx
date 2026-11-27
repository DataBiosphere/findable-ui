import { JSX, ReactNode } from "react";
import { CHIP_PROPS } from "../../../../../../contracts/mui/Chip/constants";
import type { BaseComponentProps, CellValueProps } from "../../../../../types";
import { StyledChip } from "./codeCell.styles";

/**
 * Code cell, rendering the cell value as the label of a small chip.
 * @param props - Component props, the cell value getter plus a class name; a TanStack cell context satisfies them.
 * @param props.className - Class name applied to the chip.
 * @param props.getValue - Function returning the cell value, the chip label.
 * @returns The chip, or null when the cell value is null or undefined.
 */
export const CodeCell = <TValue extends ReactNode = ReactNode>({
  className,
  getValue,
}: BaseComponentProps & CellValueProps<TValue>): JSX.Element | null => {
  const value = getValue();
  if (value === undefined || value === null) return null;
  return (
    <StyledChip
      className={className}
      color={CHIP_PROPS.COLOR.DEFAULT}
      label={value}
      size={CHIP_PROPS.SIZE.SMALL}
    />
  );
};
