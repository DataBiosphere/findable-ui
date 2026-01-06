import React, { forwardRef } from "react";
import { ButtonProps } from "../../button";
import { ButtonOutline as Button } from "./buttonOutline.styles";

export const ButtonOutline = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonOutline(
    {
      className,
      ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
    }: ButtonProps,
    ref,
  ): JSX.Element {
    return (
      <Button
        className={className}
        color="secondary"
        ref={ref}
        variant="outlined"
        {...props}
      />
    );
  },
);
