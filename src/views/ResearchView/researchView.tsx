import { Fragment, JSX } from "react";
import { Assistant } from "./assistant/assistant";

/**
 * Main view for the research assistant feature.
 * Renders the assistant drawer and any related components.
 * @returns The research view component.
 */
export const ResearchView = (): JSX.Element => {
  return (
    <Fragment>
      <Assistant />
      {/* Artifact Component */}
    </Fragment>
  );
};
