import { useEffect } from "react";
import { registerPopStateHandler } from "./popStateBus";

/**
 * Registers the single global `router.beforePopState` handler that
 * fans out to all feature listeners.
 * Safe to call multiple times - only the first invocation does the real install.
 */

export const usePopStateBus = (): void => {
  useEffect(() => {
    registerPopStateHandler();
  }, []);
};
