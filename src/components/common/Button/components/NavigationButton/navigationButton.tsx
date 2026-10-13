import { ArrowDropDownRounded } from "@mui/icons-material";
import { JSX } from "react";
import { ButtonProps } from "../../button";
import { Button } from "./navigationButton.styles";

/**
 * Props for the NavigationButton component.
 */
export interface NavigationButtonProps extends Exclude<
  ButtonProps,
  "StartIcon"
> {
  isActive: boolean;
}

/**
 * Navigation button, rendering a nav variant button with a dropdown arrow end icon.
 * @param props - Component props.
 * @param props.children - Button content.
 * @param props.isActive - Whether the navigation item is active.
 * @returns The navigation button.
 */
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
