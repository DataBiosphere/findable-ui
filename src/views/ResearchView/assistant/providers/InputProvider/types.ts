import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface InputContextValue {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
}
