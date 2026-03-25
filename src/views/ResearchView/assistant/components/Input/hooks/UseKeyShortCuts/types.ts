import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from "react";

export interface Refs {
  draftRef: RefObject<string>;
  historyIndexRef: RefObject<number>;
}

export type SetValue = Dispatch<SetStateAction<string>>;

export interface UseKeyShortCutsProps {
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}
