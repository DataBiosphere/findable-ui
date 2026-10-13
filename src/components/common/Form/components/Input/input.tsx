import {
  OutlinedInputProps as MOutlinedInputProps,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { InputFormControl } from "./input.styles";

/**
 * Props for the Input component.
 */
export interface InputProps extends MOutlinedInputProps {
  className?: string;
  isFilled: boolean;
  label?: string;
}

/**
 * Basic form input component, rendering an optional label above a small, full-width outlined input with autocomplete and spell check off.
 * @param props - Component props.
 * @param props.className - Class name applied to the form control.
 * @param props.isFilled - Whether the input has a value.
 * @param props.label - Label shown above the input.
 * @returns The form input.
 */
export const Input = ({
  className,
  isFilled,
  label,
  ...props /* Spread props to allow for Mui OutlinedInputProps specific prop overrides e.g. "disabled". */
}: InputProps): JSX.Element => {
  return (
    <InputFormControl className={className} isFilled={isFilled}>
      {label && (
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
          {label}
        </Typography>
      )}
      <OutlinedInput
        fullWidth
        inputProps={{ autoComplete: "off", spellCheck: false }}
        size="small"
        {...props}
      />
    </InputFormControl>
  );
};
