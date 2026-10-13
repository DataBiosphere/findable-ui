import { forwardRef, JSX } from "react";
import { Button, ButtonProps } from "../../button";

/**
 * Secondary outline button, rendering the Button component with the secondary color and outlined variant.
 * @param props - Button props.
 * @param ref - Ref forwarded to the button element.
 * @returns The secondary outline button.
 */
export const ButtonSecondaryOutline = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function ButtonSecondaryOutline(
  {
    ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
  }: ButtonProps,
  ref,
): JSX.Element {
  return <Button color="secondary" ref={ref} variant="outlined" {...props} />;
});
