import { JSX, ReactNode } from "react";
import { HeaderActions } from "./actions.styles";

/**
 * Props for the Actions component.
 */
export interface ActionsProps {
  children: ReactNode | ReactNode[];
}

/**
 * Header actions container.
 * @param props - Component props.
 * @param props.children - Header actions.
 * @returns The header actions.
 */
export const Actions = ({ children }: ActionsProps): JSX.Element => {
  return <HeaderActions>{children}</HeaderActions>;
};
