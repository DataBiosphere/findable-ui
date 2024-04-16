import React, { forwardRef } from "react";
import { Button, ButtonProps } from "../../button";

export const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonPrimary(
    {
      ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
    }: ButtonProps,
    ref
  ): JSX.Element {
    return <Button color="primary" ref={ref} variant="contained" {...props} />;
  }
);
