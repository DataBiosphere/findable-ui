import { forwardRef, JSX } from "react";
import { Button, ButtonProps } from "../../button";

/**
 * Primary button, rendering the Button component with the primary color and contained variant.
 * @param props - Button props.
 * @param ref - Ref forwarded to the button element.
 * @returns The primary button.
 */
export const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonPrimary(
    {
      ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
    }: ButtonProps,
    ref,
  ): JSX.Element {
    return <Button color="primary" ref={ref} variant="contained" {...props} />;
  },
);
