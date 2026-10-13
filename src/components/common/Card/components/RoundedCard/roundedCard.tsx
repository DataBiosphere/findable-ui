import { Card as MCard } from "@mui/material";
import { JSX, ReactNode } from "react";
import { RoundedPaper } from "../../../Paper/paper.styles";

/**
 * Props for the RoundedCard component.
 */
export interface RoundedCardProps {
  children: ReactNode;
}

/**
 * Renders a card on rounded paper.
 * @param props - Component props.
 * @param props.children - Card content.
 * @returns The rounded card.
 */
export const RoundedCard = ({ children }: RoundedCardProps): JSX.Element => {
  return <MCard component={RoundedPaper}>{children}</MCard>;
};
