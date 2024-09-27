import React, { ReactNode } from "react";
import { BackPageHeroActions } from "./actions.styles";

export interface ActionsProps {
  children: ReactNode;
  className?: string;
}

export const Actions = ({ children, className }: ActionsProps): JSX.Element => {
  return (
    <BackPageHeroActions className={className}>{children}</BackPageHeroActions>
  );
};
