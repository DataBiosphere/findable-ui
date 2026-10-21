import { JSX, ReactNode } from "react";
import { StyledMain } from "./main.styles";

/**
 * Props for the Main component.
 */
export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Main content. Follows the in-flow header, so it carries no header offset.
 * @param props - Component props.
 * @param props.children - Main content.
 * @param props.className - Class name applied to the main element.
 * @returns The main content.
 */
export const Main = ({ children, className }: MainProps): JSX.Element => {
  return <StyledMain className={className}>{children}</StyledMain>;
};
