import { ArrowDropDownRounded } from "@mui/icons-material";
import React from "react";
import { ButtonProps } from "../../button";
import { Button } from "./navigationButton.styles";

export interface NavigationButtonProps extends Exclude<
  ButtonProps,
  "StartIcon"
> {
  isActive: boolean;
}

export const NavigationButton = ({
  children,
  isActive,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: NavigationButtonProps): JSX.Element => {
  return (
    <Button
      EndIcon={ArrowDropDownRounded}
      isActive={isActive}
      variant="nav"
      {...props}
    >
      {children}
    </Button>
  );
};
