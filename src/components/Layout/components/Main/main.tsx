import { JSX, ReactNode } from "react";
import { useLayoutDimensions } from "../../../../providers/layoutDimensions/hook";
import { MainWithOffset } from "./main.styles";

export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Main = ({ children, className }: MainProps): JSX.Element => {
  const { dimensions } = useLayoutDimensions();
  return (
    <MainWithOffset className={className} offset={dimensions.header.height}>
      {children}
    </MainWithOffset>
  );
};
