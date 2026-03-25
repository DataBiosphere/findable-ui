import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { InputElement, UseControlledInputProps } from "./types";

/**
 * Manages controlled input state with automatic clearing on form reset.
 * @returns The controlled input state including value, onChange, setValue, and inputRef.
 */
export const useControlledInput = (): UseControlledInputProps => {
  const inputRef = useRef<InputElement>(null);
  const [value, setValue] = useState<string>("");

  const onChange = useCallback((e: ChangeEvent<InputElement>): void => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;

    const onReset = (): void => {
      setValue("");
      inputRef.current?.focus();
    };

    form.addEventListener("reset", onReset);

    return (): void => {
      form.removeEventListener("reset", onReset);
    };
  }, []);

  return { inputRef, onChange, setValue, value };
};
