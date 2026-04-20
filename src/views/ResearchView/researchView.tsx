import { Fragment, JSX } from "react";
import { ChildrenProps } from "../../components/types";
import { Assistant } from "./assistant/assistant";

/**
 * Main view for the research assistant feature.
 * Renders the assistant drawer and any related components.
 * @param props - Component props.
 * @param props.children - Children components to be rendered within the research view.
 * @returns The research view component.
 */
export const ResearchView = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <Fragment>
      <Assistant />
      {children}
    </Fragment>
  );
};
