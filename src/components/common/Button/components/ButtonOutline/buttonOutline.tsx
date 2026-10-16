import { JSX } from "react";
import { ButtonProps } from "../../button";
import { ButtonOutline as Button } from "./buttonOutline.styles";

/**
 * Outline button, rendering the styled button with the secondary color and outlined variant.
 * @param props - Button props, including an optional ref forwarded to the button element.
 * @param props.className - Class name applied to the button.
 * @returns The outline button.
 */
export const ButtonOutline = ({
  className,
  ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick"; includes "ref". */
}: ButtonProps): JSX.Element => {
  return (
    <Button
      className={className}
      color="secondary"
      variant="outlined"
      {...props}
    />
  );
};
