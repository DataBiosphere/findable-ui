import {
  Select as MSelect,
  SelectProps as MSelectProps,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import { TEXT_BODY_400 } from "../../../../../theme/common/typography";
import { DropDownIcon } from "./components/DropDownIcon/dropDownIcon";
import { InputFormControl } from "./select.styles";

/**
 * Basic form select component.
 */

export type SelectProps = MSelectProps & {
  children: ReactNode;
  className?: string;
  isFilled: boolean;
  label?: string;
};

export const Select = ({
  children,
  className,
  isFilled,
  label,
  onBlur,
  ...props /* Spread props to allow for Mui SelectProps specific prop overrides e.g. "disabled". */
}: SelectProps): JSX.Element => {
  return (
    <InputFormControl className={className} isFilled={isFilled}>
      {label && <Typography variant={TEXT_BODY_400}>{label}</Typography>}
      <MSelect
        fullWidth
        IconComponent={DropDownIcon}
        inputProps={{ onBlur }}
        size="small"
        {...props}
      >
        {children}
      </MSelect>
    </InputFormControl>
  );
};
