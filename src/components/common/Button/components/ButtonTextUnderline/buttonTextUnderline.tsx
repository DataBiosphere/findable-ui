import { JSX } from "react";
import { Button } from "./buttonTextUnderline.styles";

/**
 * Underlined text button, rendering the styled button with the inherit color and text variant.
 * @param props - Button props.
 * @returns The underlined text button.
 */
export const ButtonTextUnderline = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="inherit" variant="text" {...props} />;
};
