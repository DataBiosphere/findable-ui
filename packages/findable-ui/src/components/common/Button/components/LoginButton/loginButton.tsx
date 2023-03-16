import React from "react";
import { ButtonProps } from "../../button";
import { LoginButton as Button, LoginButtonText } from "./loginButton.styles";

export type LoginButtonProps = Exclude<ButtonProps, "StartIcon">;

export const LoginButton = ({
  children,
  ...props
}: LoginButtonProps): JSX.Element => {
  return (
    <Button fullWidth={true} {...props}>
      <LoginButtonText>{children}</LoginButtonText>
    </Button>
  );
};
