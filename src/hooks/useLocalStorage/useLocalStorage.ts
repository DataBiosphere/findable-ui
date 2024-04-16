import { useEffect, useState } from "react";
import { getLocalStorage } from "./common/utils";

/**
 * Determine local storage value.
 * @param key - Local storage key.
 * @returns local storage value.
 */
export function useLocalStorage(key: string): string | null {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(getLocalStorage(key));
  }, [key]);

  return value;
}
