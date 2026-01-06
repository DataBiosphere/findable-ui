import { Card as MCard } from "@mui/material";
import { JSX, ReactNode } from "react";
import { RoundedPaper } from "../../../Paper/paper.styles";

export interface RoundedCardProps {
  children: ReactNode;
}

export const RoundedCard = ({ children }: RoundedCardProps): JSX.Element => {
  return <MCard component={RoundedPaper}>{children}</MCard>;
};
