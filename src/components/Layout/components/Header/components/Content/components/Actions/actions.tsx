import React, { ReactNode } from "react";
import { HeaderActions } from "./actions.styles";

export interface ActionsProps {
  children: ReactNode | ReactNode[];
  showActions?: boolean;
}

export const Actions = ({
  children,
  showActions = true,
}: ActionsProps): JSX.Element => {
  return <>{showActions && <HeaderActions>{children}</HeaderActions>}</>;
};
