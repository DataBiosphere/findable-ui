import { JSX } from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import { Input } from "./components/Input/input";

/**
 * Renders the research panel.
 * @returns The research panel container element.
 */
export const Panel = (): JSX.Element => {
  return (
    <div data-testid={TEST_IDS.RESEARCH_PANEL}>
      <Input />
    </div>
  );
};
