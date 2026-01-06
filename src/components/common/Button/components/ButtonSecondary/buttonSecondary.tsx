import React, { forwardRef } from "react";
import { Button, ButtonProps } from "../../button";

export const ButtonSecondary = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonSecondary(
    {
      ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
    }: ButtonProps,
    ref,
  ): JSX.Element {
    return (
      <Button color="secondary" ref={ref} variant="contained" {...props} />
    );
  },
);
