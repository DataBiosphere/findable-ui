import { useCallback, useEffect, useRef } from "react";
import { useChatState } from "../../../../../state/hooks/UseChatState/hook";
import { SetValue } from "../UseControlledInput/types";
import { KEY } from "./constants";
import { KeyboardInputEvent, UseKeyShortCutsProps } from "./types";
import {
  getHistory,
  handleArrowKey,
  handleEnterKey,
  handleEscapeKey,
  handleTabKey,
} from "./utils";

/**
 * Provides a keydown handler that implements keyboard shortcuts for the assistant input.
 * @param setValue - Setter for the controlled input value.
 * @returns An object containing the onKeyDown handler.
 */
export const useKeyShortCuts = (setValue: SetValue): UseKeyShortCutsProps => {
  const { state } = useChatState();
  const { messages } = state;

  const history = getHistory(messages);

  const draftRef = useRef<string>("");
  const historyIndexRef = useRef<number>(-1);

  useEffect(() => {
    // Resets history navigation when messages change.
    draftRef.current = "";
    historyIndexRef.current = -1;
  }, [messages]);

  const onKeyDown = useCallback(
    (e: KeyboardInputEvent) => {
      const refs = { draftRef, historyIndexRef };
      if (e.key === KEY.ENTER) return handleEnterKey(e);
      if (e.key === KEY.ESCAPE) return handleEscapeKey(refs, setValue);
      if (e.key === KEY.ARROW_UP || e.key === KEY.ARROW_DOWN)
        return handleArrowKey(e, history, refs, setValue);
      if (e.key === KEY.TAB) return handleTabKey(e, setValue);
    },
    [history, setValue],
  );

  return { onKeyDown };
};
