import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export type SetValue = Dispatch<SetStateAction<string>>;

export interface UseControlledInputProps {
  inputRef: RefObject<InputElement | null>;
  onChange: (e: ChangeEvent<InputElement>) => void;
  setValue: SetValue;
  value: string;
}
