import React, { ReactNode } from "react";
import { useLayoutState } from "../../../../hooks/useLayoutState";
import { MainWithOffset } from "./main.styles";

export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Main = ({ children, className }: MainProps): JSX.Element => {
  const { layoutState } = useLayoutState();
  const { headerHeight } = layoutState;
  return (
    <MainWithOffset className={className} offset={headerHeight}>
      {children}
    </MainWithOffset>
  );
};
