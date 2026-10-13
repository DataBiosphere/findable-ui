import { JSX } from "react";
import { Button } from "./buttonTextPrimary.styles";

/**
 * Primary text button, rendering the styled button with the primary color and text variant.
 * @param props - Button props.
 * @returns The primary text button.
 */
export const ButtonTextPrimary = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="primary" variant="text" {...props} />;
};
