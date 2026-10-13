import { JSX } from "react";
import { BaseComponentProps } from "../../types";
import { DotSeparator } from "./dot.styles";

/**
 * Renders a dot separator.
 * @param props - Component props.
 * @param props.className - Class name applied to the dot.
 * @returns The dot separator.
 */
export const Dot = ({ className }: BaseComponentProps): JSX.Element => {
  return <DotSeparator className={className} />;
};
