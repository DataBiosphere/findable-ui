import { JSX } from "react";
import { useChatState } from "../state/hooks/UseChatState/hook";
import { Form } from "./components/Form/form";
import { Input } from "./components/Input/input";
import { getPlaceholder } from "./components/Input/utils";
import { Messages } from "./components/Messages/messages";
import { Drawer } from "./components/Drawer/drawer";
import { ToggleButtonGroup } from "./components/ToggleButtonGroup/toggleButtonGroup";

/**
 * Renders the research assistant drawer.
 * @returns The assistant drawer.
 */
export const Assistant = (): JSX.Element => {
  const { state } = useChatState();
  return (
    <Drawer>
      <ToggleButtonGroup />
      <Form status={state.status}>
        <Messages state={state} />
        <Input
          disabled={state.status.loading}
          placeholder={getPlaceholder(state)}
        />
      </Form>
    </Drawer>
  );
};
