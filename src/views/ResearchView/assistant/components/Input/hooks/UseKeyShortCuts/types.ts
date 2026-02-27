import { KeyboardEvent, RefObject } from "react";

export interface Refs {
  draftRef: RefObject<string>;
  historyIndexRef: RefObject<number>;
}

export interface UseKeyShortCutsProps {
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}
