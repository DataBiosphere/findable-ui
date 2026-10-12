import { useEffect } from "react";
import {
  registerBeforePopCallback,
  unregisterBeforePopCallback,
} from "./popStateBus";
import { BeforePopStateCallback } from "./types";

/**
 * Registers a callback to run before browser back/forward navigation, and removes it on unmount.
 * The callback is re-registered whenever its identity changes, so pass a stable (memoized) callback.
 * @param cb - Callback to run before pop state.
 */
export const useOnPopState = (cb: BeforePopStateCallback): void => {
  useEffect(() => {
    registerBeforePopCallback(cb);
    return (): void => {
      unregisterBeforePopCallback(cb);
    };
  }, [cb]);
};
