import { forwardRef, JSX } from "react";
import { Button, ButtonProps } from "../../button";

/**
 * Secondary button, rendering the Button component with the secondary color and contained variant.
 * @param props - Button props.
 * @param ref - Ref forwarded to the button element.
 * @returns The secondary button.
 */
export const ButtonSecondary = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonSecondary(
    {
      ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
    }: ButtonProps,
    ref,
  ): JSX.Element {
    return (
      <Button color="secondary" ref={ref} variant="contained" {...props} />
    );
  },
);
