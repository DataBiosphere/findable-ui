import { JSX } from "react";
import { Button } from "../Button/button";
import { Props } from "./types";

export const Buttons = ({
  className,
  handleLogin,
  providers = [],
  ...props /* Mui ButtonProps */
}: Props): JSX.Element[] => {
  return providers?.map((provider) => (
    <Button
      key={provider.id}
      className={className}
      endIcon={provider.icon}
      onClick={() => handleLogin(provider.id)}
      {...props}
    >
      {provider.name}
    </Button>
  ));
};
