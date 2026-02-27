import { Fragment, JSX } from "react";
import { Assistant } from "./assistant/assistant";
import { ChildrenProps } from "../../components/types";

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
