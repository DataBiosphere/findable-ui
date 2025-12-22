import { Divider } from "@mui/material";
import { JSX, ReactNode } from "react";
import { CardActions as Actions } from "./cardActions.styles";

export interface CardActionsProps {
  children: ReactNode | ReactNode[];
}

export const CardActions = ({ children }: CardActionsProps): JSX.Element => {
  return (
    <>
      <Divider />
      <Actions>{children}</Actions>
    </>
  );
};
