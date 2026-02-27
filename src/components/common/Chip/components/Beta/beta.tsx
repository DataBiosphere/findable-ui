import { ChipProps } from "@mui/material";
import { JSX } from "react";
import { CHIP_PROPS } from "../../../../../styles/common/mui/chip";
import { BaseComponentProps } from "../../../../types";
import { StyledChip } from "./beta.styles";

/**
 * Beta chip component to indicate features that are in beta.
 * @param props - Component props.
 * @param props.className - Classname.
 * @returns Beta chip JSX element.
 */
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
