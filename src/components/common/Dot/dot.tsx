import React from "react";
import { DotSeparator } from "./dot.styles";

export interface DotProps {
  className?: string;
}

export const Dot = ({ className }: DotProps): JSX.Element => {
  return <DotSeparator className={className} />;
};
