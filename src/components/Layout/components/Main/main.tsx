import { JSX, ReactNode } from "react";
import { useLayoutDimensions } from "../../../../providers/layoutDimensions/hook";
import { MainWithOffset } from "./main.styles";

/**
 * Props for the Main component.
 */
export interface MainProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

/**
 * Main content, offset by the header height.
 * @param props - Component props.
 * @param props.children - Main content.
 * @param props.className - Class name applied to the main element.
 * @returns The main content.
 */
export const Main = ({ children, className }: MainProps): JSX.Element => {
  const { dimensions } = useLayoutDimensions();
  return (
    <MainWithOffset className={className} offset={dimensions.header.height}>
      {children}
    </MainWithOffset>
  );
};
