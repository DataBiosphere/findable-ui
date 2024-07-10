import React, { ReactNode } from "react";
import { HeaderActions } from "./actions.styles";

export interface ActionsProps {
  children: ReactNode | ReactNode[];
}

export const Actions = ({ children }: ActionsProps): JSX.Element => {
  return <HeaderActions>{children}</HeaderActions>;
};
