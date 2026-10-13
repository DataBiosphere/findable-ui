import { Button as MButton, ButtonProps as MButtonProps } from "@mui/material";
import { ElementType, forwardRef, JSX } from "react";

/**
 * Props for the Button component.
 */
export interface ButtonProps extends MButtonProps {
  EndIcon?: ElementType;
  StartIcon?: ElementType;
}

/**
 * Basic button component, rendering the given start and end icons at small size.
 * @param props - Component props.
 * @param props.children - Button content.
 * @param props.disabled - Whether the button is disabled; defaults to false.
 * @param props.EndIcon - Icon component rendered after the button content.
 * @param props.StartIcon - Icon component rendered before the button content.
 * @param ref - Ref forwarded to the button element.
 * @returns The button.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      disabled = false,
      EndIcon,
      StartIcon,
      ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
    }: ButtonProps,
    ref,
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
  },
);
