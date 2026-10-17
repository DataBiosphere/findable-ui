import { JSX } from "react";
import { Button, ButtonProps } from "../../button";

/**
 * Primary button, rendering the Button component with the primary color and contained variant.
 * @param props - Button props, including an optional ref forwarded to the button element.
 * @returns The primary button.
 */
export const ButtonPrimary = ({
  ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick"; includes "ref". */
}: ButtonProps): JSX.Element => {
  return <Button color="primary" variant="contained" {...props} />;
};
