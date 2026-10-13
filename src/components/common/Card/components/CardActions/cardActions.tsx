import { Divider } from "@mui/material";
import { JSX, ReactNode } from "react";
import { CardActions as Actions } from "./cardActions.styles";

/**
 * Props for the CardActions component.
 */
export interface CardActionsProps {
  children: ReactNode | ReactNode[];
}

/**
 * Card actions, rendered below a divider.
 * @param props - Component props.
 * @param props.children - Card actions.
 * @returns The card actions.
 */
export const CardActions = ({ children }: CardActionsProps): JSX.Element => {
  return (
    <>
      <Divider />
      <Actions>{children}</Actions>
    </>
  );
};
