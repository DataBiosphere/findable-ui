import { JSX } from "react";
import { Button } from "./buttonText.styles";

/**
 * Text button, rendering the styled button with the inherit color and text variant.
 * @param props - Button props.
 * @returns The text button.
 */
export const ButtonText = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="inherit" variant="text" {...props} />;
};
