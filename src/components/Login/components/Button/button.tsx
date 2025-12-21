import { JSX } from "react";
import { StyledButton } from "./button.styles";
import { BUTTON_PROPS } from "./constants";
import { Props } from "./types";

export const Button = ({ className, ...props }: Props): JSX.Element => {
  return <StyledButton className={className} {...BUTTON_PROPS} {...props} />;
};
