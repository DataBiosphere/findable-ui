import { JSX } from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import { useAdapter } from "../adapter/useAdapter";
import { Input } from "./components/Input/input";

/**
 * Renders the research panel.
 * @returns The research panel container element.
 */
export const Panel = (): JSX.Element => {
  const { actions, status } = useAdapter();
  return (
    <div data-testid={TEST_IDS.RESEARCH_PANEL}>
      <form data-testid={TEST_IDS.RESEARCH_FORM} onSubmit={actions.onSubmit}>
        <Input disabled={status.loading} />
      </form>
    </div>
  );
};
