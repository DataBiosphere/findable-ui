import { JSX } from "react";
import { TEST_IDS } from "../../../../tests/testIds";

/**
 * Renders the research panel.
 * @returns The research panel container element.
 */
export const Panel = (): JSX.Element => {
  return <div data-testid={TEST_IDS.RESEARCH_PANEL}>research panel</div>;
};
