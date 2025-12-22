import {
  Select as MSelect,
  SelectProps as MSelectProps,
  Typography,
} from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../styles/common/mui/typography";
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
