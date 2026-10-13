import { forwardRef, JSX } from "react";
import { ButtonProps } from "../../button";
import { ButtonOutline as Button } from "./buttonOutline.styles";

/**
 * Outline button, rendering the styled button with the secondary color and outlined variant.
 * @param props - Button props.
 * @param props.className - Class name applied to the button.
 * @param ref - Ref forwarded to the button element.
 * @returns The outline button.
 */
export const ButtonOutline = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonOutline(
    {
      className,
      ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
    }: ButtonProps,
    ref,
  ): JSX.Element {
    return (
      <Button
        className={className}
        color="secondary"
        ref={ref}
        variant="outlined"
        {...props}
      />
    );
  },
);
