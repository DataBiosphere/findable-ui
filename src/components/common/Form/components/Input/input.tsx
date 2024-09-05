import {
  OutlinedInputProps as MOutlinedInputProps,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { TEXT_BODY_400 } from "../../../../../theme/common/typography";
import { InputFormControl } from "./input.styles";

/**
 * Basic form input component.
 */

export interface InputProps extends MOutlinedInputProps {
  className?: string;
  isFilled: boolean;
  label?: string;
}

export const Input = ({
  className,
  isFilled,
  label,
  ...props /* Spread props to allow for Mui OutlinedInputProps specific prop overrides e.g. "disabled". */
}: InputProps): JSX.Element => {
  return (
    <InputFormControl className={className} isFilled={isFilled}>
      {label && <Typography variant={TEXT_BODY_400}>{label}</Typography>}
      <OutlinedInput
        fullWidth
        inputProps={{ autoComplete: "off", spellCheck: false }}
        size="small"
        {...props}
      />
    </InputFormControl>
  );
};
