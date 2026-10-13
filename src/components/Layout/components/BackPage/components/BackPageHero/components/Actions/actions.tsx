import { JSX, ReactNode } from "react";
import { BackPageHeroActions } from "./actions.styles";

/**
 * Props for the Actions component.
 */
export interface ActionsProps {
  children: ReactNode;
  className?: string;
}

/**
 * Back page hero actions container.
 * @param props - Component props.
 * @param props.children - Actions.
 * @param props.className - Class name applied to the container.
 * @returns The back page hero actions.
 */
export const Actions = ({ children, className }: ActionsProps): JSX.Element => {
  return (
    <BackPageHeroActions className={className}>{children}</BackPageHeroActions>
  );
};
