import { KeyboardEvent, useCallback, useEffect, useRef } from "react";
import { useChatState } from "../../../../../state/hooks/UseChatState/hook";
import { KEY } from "./constants";
import { UseKeyShortCutsProps } from "./types";
import {
  getHistory,
  handleArrowKey,
  handleEnterKey,
  handleEscapeKey,
  handleTabKey,
} from "./utils";

/**
 * Provides a keydown handler that implements keyboard shortcuts for the assistant input.
 * @returns An object containing the onKeyDown handler.
 */
export const useKeyShortCuts = (): UseKeyShortCutsProps => {
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
    (e: KeyboardEvent<HTMLInputElement>) => {
      const refs = { draftRef, historyIndexRef };
      if (e.key === KEY.ENTER) return handleEnterKey(e);
      if (e.key === KEY.ESCAPE) return handleEscapeKey(e, refs);
      if (e.key === KEY.ARROW_UP || e.key === KEY.ARROW_DOWN)
        return handleArrowKey(e, history, refs);
      if (e.key === KEY.TAB) return handleTabKey(e);
    },
    [history],
  );

  return { onKeyDown };
};
