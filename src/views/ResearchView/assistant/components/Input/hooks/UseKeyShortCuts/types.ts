import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from "react";
import { InputElement } from "../../../../providers/InputProvider/types";

export type KeyboardInputEvent = KeyboardEvent<InputElement>;

export interface Refs {
  draftRef: RefObject<string>;
  historyIndexRef: RefObject<number>;
}

export type SetValue = Dispatch<SetStateAction<string>>;

export interface UseKeyShortCutsProps {
  onKeyDown: (e: KeyboardInputEvent) => void;
}
