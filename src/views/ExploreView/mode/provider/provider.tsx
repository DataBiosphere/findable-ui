import { JSX } from "react";
import { ToggleButtonGroupProvider } from "../../../../components/common/ToggleButtonGroup/provider/provider";
import { useConfig } from "../../../../hooks/useConfig";
import { useFeatureFlag } from "../../../../hooks/useFeatureFlag/useFeatureFlag";
import { FEATURE_FLAG } from "../constants";
import { MODE } from "../types";
import { ModeContext } from "./context";
import { ModeProviderProps } from "./types";

/**
 * Mode provider component "search" or "research" i.e. self-directed search vs. chat-based search.
 * Either mode is available based on the "chat" feature flag, or by configuration.
 * Wraps children with mode context based on whether the feature is enabled or not.
 * @param props - Component props.
 * @param props.children - Children.
 * @returns Mode provider component.
 */
export function ModeProvider({ children }: ModeProviderProps): JSX.Element {
  const flagEnabled = useFeatureFlag(FEATURE_FLAG.CHAT);
  const { config } = useConfig();
  const { ai } = config;
  const enabled = flagEnabled || ai?.enabled;
  return (
    <ToggleButtonGroupProvider<MODE> initialValue={MODE.SEARCH}>
      {(props) => (
        <ModeContext.Provider value={enabled ? props : {}}>
          {typeof children === "function"
            ? children(enabled ? props : {})
            : children}
        </ModeContext.Provider>
      )}
    </ToggleButtonGroupProvider>
  );
}
