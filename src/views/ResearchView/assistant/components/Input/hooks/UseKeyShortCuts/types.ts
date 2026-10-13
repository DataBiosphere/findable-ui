import { KeyboardEvent, RefObject } from "react";
import { InputElement } from "../UseControlledInput/types";

export type KeyboardInputEvent = KeyboardEvent<InputElement>;

/**
 * Refs that track the unsent draft and the position in message history while navigating it.
 */
export interface Refs {
  draftRef: RefObject<string>;
  historyIndexRef: RefObject<number>;
}

/**
 * Return type for the useKeyShortCuts hook.
 */
export interface UseKeyShortCutsProps {
  onKeyDown: (e: KeyboardInputEvent) => void;
}
