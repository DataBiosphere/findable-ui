import React, { forwardRef } from "react";
import { Button, ButtonProps } from "../../button";

export const ButtonSecondaryOutline = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function ButtonSecondaryOutline(
  {
    ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
  }: ButtonProps,
  ref,
): JSX.Element {
  return <Button color="secondary" ref={ref} variant="outlined" {...props} />;
});
