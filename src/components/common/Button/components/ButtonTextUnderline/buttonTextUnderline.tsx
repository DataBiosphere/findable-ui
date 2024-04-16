import React from "react";
import { Button } from "./buttonTextUnderline.styles";

export const ButtonTextUnderline = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="inherit" variant="text" {...props} />;
};
