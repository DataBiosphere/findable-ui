import { useEffect, useState } from "react";
import { getLocalStorage } from "./common/utils";

/**
 * Determine local storage value.
 * @param key - Local storage key.
 * @returns local storage value.
 */
export function useLocalStorage(key: string): string | null | undefined {
  const [value, setValue] = useState<string | null>();

  useEffect(() => {
    setValue(getLocalStorage(key));
  }, [key]);

  return value;
}
