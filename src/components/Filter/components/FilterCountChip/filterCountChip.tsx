import { JSX } from "react";
import { CHIP_PROPS } from "../../../../styles/common/mui/chip";
import { StyledChip } from "./filterCountChip.styles";
import { FilterCountChipProps } from "./types";

/**
 * Chip showing a filter count.
 * The given Mui Chip props override the defaults.
 * @param props - Component props.
 * @param props.className - Class name applied to the chip.
 * @param props.count - Filter count.
 * @returns The filter count chip, or null when the count is falsy.
 */
export const FilterCountChip = ({
  className,
  count,
  ...props /* MuiChipProps */
}: FilterCountChipProps): JSX.Element | null => {
  if (!count) return null;
  return (
    <StyledChip
      className={className}
      color={CHIP_PROPS.COLOR.PRIMARY}
      component="span"
      label={String(count)}
      variant={CHIP_PROPS.VARIANT.FILLED}
      {...props}
    />
  );
};
