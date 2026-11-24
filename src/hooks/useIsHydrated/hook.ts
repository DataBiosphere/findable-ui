import { useSyncExternalStore } from "react";
import {
  getClientSnapshot,
  getServerSnapshot,
  subscribeToNothing,
} from "./utils";

/**
 * Returns whether the page has hydrated: false on the server and during the hydration render, then true, in one more
 * render. A component that mounts after hydration, e.g. on a client-side navigation, gets true in its first render.
 * Use it to render a value the static HTML can't know, such as one read from the URL, without a hydration mismatch.
 * @returns True once the page has hydrated.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot,
  );
}
