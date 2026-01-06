import { JSX } from "react";
import { Button } from "./buttonTextPrimary.styles";

export const ButtonTextPrimary = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="primary" variant="text" {...props} />;
};
