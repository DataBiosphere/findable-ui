import {
  Select as MSelect,
  SelectProps as MSelectProps,
  Typography,
} from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
import { InputFormControl } from "./select.styles";

/**
 * Props for the Select component.
 */
export type SelectProps = MSelectProps & {
  children: ReactNode;
  className?: string;
  isFilled: boolean;
  label?: string;
};

/**
 * Basic form select component, rendering an optional label above a small, full-width select.
 * @param props - Component props.
 * @param props.children - Select options.
 * @param props.className - Class name applied to the form control.
 * @param props.isFilled - Whether the select has a value.
 * @param props.label - Label shown above the select.
 * @param props.onBlur - Function invoked when the select's input loses focus.
 * @returns The form select.
 */
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
      {label && (
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
          {label}
        </Typography>
      )}
      <MSelect fullWidth inputProps={{ onBlur }} size="small" {...props}>
        {children}
      </MSelect>
    </InputFormControl>
  );
};
