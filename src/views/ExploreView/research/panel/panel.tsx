import { JSX } from "react";
import { TEST_IDS } from "../../../../tests/testIds";
import { useAdapter } from "../adapter/useAdapter";
import { useChatState } from "../state/hooks/UseChatState/hook";
import { Form } from "./components/Form/form";
import { Input } from "./components/Input/input";

/**
 * Renders the research panel.
 * @returns The research panel container element.
 */
export const Panel = (): JSX.Element => {
  const { actions } = useAdapter();
  const { state } = useChatState();
  return (
    <div data-testid={TEST_IDS.RESEARCH_PANEL}>
      <Form actions={actions} status={state.status}>
        <Input disabled={state.status.loading} />
      </Form>
    </div>
  );
};
