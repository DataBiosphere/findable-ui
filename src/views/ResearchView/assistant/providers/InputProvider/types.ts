import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export interface InputActionsContextValue {
  onChange: (e: ChangeEvent<InputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
}

export interface InputValueContextValue {
  value: string;
}
