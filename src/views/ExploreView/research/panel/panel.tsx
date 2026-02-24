import { JSX } from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import { useAdapter } from "../adapter/useAdapter";
import { Input } from "./components/Input/input";
import { Form } from "./components/Form/form";

/**
 * Renders the research panel.
 * @returns The research panel container element.
 */
export const Panel = (): JSX.Element => {
  const { actions, status } = useAdapter();
  return (
    <div data-testid={TEST_IDS.RESEARCH_PANEL}>
      <Form actions={actions}>
        <Input disabled={status.loading} />
      </Form>
    </div>
  );
};
