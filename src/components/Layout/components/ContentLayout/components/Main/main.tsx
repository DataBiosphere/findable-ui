import { JSX, ReactNode } from "react";
import { Main as ContentMain } from "../../../Main/main.styles";

/**
 * Props for the Main component.
 */
export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Main content element for the content layout.
 * @param props - Component props.
 * @param props.children - Main content.
 * @param props.className - Class name applied to the main element.
 * @returns The main content element.
 */
export const Main = ({ children, className }: MainProps): JSX.Element => {
  return <ContentMain className={className}>{children}</ContentMain>;
};
