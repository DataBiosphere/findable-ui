import { JSX, ReactNode } from "react";
import { Main as StyledMain } from "./main.styles";

export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Page content region.
 * Carries no header offset: the header is in flow, so it occupies space in
 * `AppLayout`'s column and this element simply follows it.
 * @param props - Component props.
 * @param props.children - Page content.
 * @param props.className - Class name.
 * @returns Main element.
 */
export const Main = ({ children, className }: MainProps): JSX.Element => {
  return <StyledMain className={className}>{children}</StyledMain>;
};
