import { JSX } from "react";
import { Button } from "./buttonText.styles";

export const ButtonText = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="inherit" variant="text" {...props} />;
};
