import { KeyboardEvent, RefObject } from "react";
import { InputElement } from "../UseControlledInput/types";

export type KeyboardInputEvent = KeyboardEvent<InputElement>;

export interface Refs {
  draftRef: RefObject<string>;
  historyIndexRef: RefObject<number>;
}

export interface UseKeyShortCutsProps {
  onKeyDown: (e: KeyboardInputEvent) => void;
}
