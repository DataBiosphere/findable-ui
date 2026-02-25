import { JSX } from "react";
import { useAdapter } from "../adapter/useAdapter";
import { Form } from "./components/Form/form";
import { Input } from "./components/Input/input";
import { Messages } from "./components/Messages/messages";
import { getPlaceholder } from "./components/Input/utils";
import { Drawer } from "./components/Drawer/drawer";
import { useChatState } from "../state/hooks/UseChatState/hook";
import { ToggleButtonGroup } from "./components/ToggleButtonGroup/toggleButtonGroup";

/**
 * Renders the research assistant drawer.
 * @returns The assistant drawer.
 */
export const Assistant = (): JSX.Element => {
  const { actions } = useAdapter();
  const { state } = useChatState();
  return (
    <Drawer>
      <ToggleButtonGroup />
      <Form actions={actions} status={state.status}>
        <Messages state={state} />
        <Input
          disabled={state.status.loading}
          placeholder={getPlaceholder(state)}
        />
      </Form>
    </Drawer>
  );
};
