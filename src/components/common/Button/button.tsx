import { Button as MButton, ButtonProps as MButtonProps } from "@mui/material";
import React, { ElementType, forwardRef } from "react";

/**
 * Basic button component.
 */

export interface ButtonProps extends MButtonProps {
  EndIcon?: ElementType;
  StartIcon?: ElementType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      disabled = false,
      EndIcon,
      StartIcon,
      ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
    }: ButtonProps,
    ref
  ): JSX.Element {
    return (
      <MButton
        disabled={disabled}
        endIcon={EndIcon ? <EndIcon fontSize="small" /> : undefined}
        ref={ref}
        startIcon={StartIcon ? <StartIcon fontSize="small" /> : undefined}
        {...props}
      >
        {children}
      </MButton>
    );
  }
);
