import { JSX, ReactNode } from "react";
import { Main as ContentMain } from "../../../Main/main.styles";

export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Main = ({ children, className }: MainProps): JSX.Element => {
  return <ContentMain className={className}>{children}</ContentMain>;
};
