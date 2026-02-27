import { ChipProps } from "@mui/material";
import { JSX } from "react";
import { CHIP_PROPS } from "../../../../../styles/common/mui/chip";
import { BaseComponentProps } from "components/types";
import { StyledChip } from "./beta.styles";

export const Beta = ({
  className,
  ...props
}: BaseComponentProps & ChipProps): JSX.Element => {
  return (
    <StyledChip
      className={className}
      label="Beta"
      size={CHIP_PROPS.SIZE.SMALL}
      {...props}
    />
  );
};
