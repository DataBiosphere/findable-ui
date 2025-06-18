import React from "react";
import { CHIP_PROPS } from "../../../../styles/common/mui/chip";
import { StyledChip } from "./filterCountChip.styles";
import { FilterCountChipProps } from "./types";

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
      label={String(count)}
      variant={CHIP_PROPS.VARIANT.FILLED}
      {...props}
    />
  );
};
