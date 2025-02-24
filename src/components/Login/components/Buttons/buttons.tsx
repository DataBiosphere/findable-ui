import React from "react";
import { Button } from "../Button/button";
import { Props } from "./types";

export const Buttons = <P,>({
  className,
  handleLogin,
  providers = [],
  ...props /* Mui ButtonProps */
}: Props<P>): JSX.Element[] => {
  return providers?.map((provider) => (
    <Button
      key={provider.id}
      className={className}
      endIcon={"icon" in provider && provider.icon}
      onClick={() => handleLogin(provider.id)}
      {...props}
    >
      {provider.name}
    </Button>
  ));
};
