import { JSX } from "react";
import { BaseComponentProps } from "../../types";
import { DotSeparator } from "./dot.styles";

export const Dot = ({ className }: BaseComponentProps): JSX.Element => {
  return <DotSeparator className={className} />;
};
