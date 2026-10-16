import { JSX } from "react";
import { Button, ButtonProps } from "../../button";

/**
 * Secondary button, rendering the Button component with the secondary color and contained variant.
 * @param props - Button props, including an optional ref forwarded to the button element.
 * @returns The secondary button.
 */
export const ButtonSecondary = ({
  ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick"; includes "ref". */
}: ButtonProps): JSX.Element => {
  return <Button color="secondary" variant="contained" {...props} />;
};
