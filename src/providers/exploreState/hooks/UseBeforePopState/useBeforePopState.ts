import { useRouter } from "next/router";
import { useEffect } from "react";
import { ExploreStateContextProps } from "../../../exploreState";
import { syncStateFromUrl } from "../../../exploreState/actions/syncStateFromUrl/dispatch";
import { getSyncStateFromUrl } from "./utils";

/**
 * useBeforePopState
 *
 * Keeps ExploreState, URL, and page props aligned when the user clicks
 * the browser Back / Forward buttons.
 *
 * This hook runs inside `ExploreStateProvider` (mounted once in `_app`).
 * It adds a single `router.beforePopState` handler that:
 * - Parses the destination URL.
 * - Dispatches `syncStateFromUrl` so filters, catalogue, and feature-flags in context match the URL.
 * - Calls `router.replace(...{ shallow: false })` to trigger a full page transition, ensuring Next.js
 *   re-executes data-fetching methods that shallow routing would otherwise skip.
 *
 * The provider never unmounts, and a second call to `router.beforePopState` simply overwrites the handler.
 * Cleaning up here would wipe out any handler registered later by other code.
 */

export const useBeforePopState = ({
  exploreDispatch,
  exploreState,
}: ExploreStateContextProps): void => {
  const router = useRouter();
  useEffect(() => {
    router.beforePopState(({ as, options, url }) => {
      // Grab the expected state from URL.
      const payload = getSyncStateFromUrl(url, url);
      // Only dispatch if the url contains the dynamic segment `[entityListType]`.
      if (payload.entityListType) {
        // Sync state from URL.
        exploreDispatch(syncStateFromUrl(payload));
        // Force a full route transition to ensure page props are refreshed.
        router.replace(url, as, { ...options, shallow: false });
        return false;
      }
      // Return true to allow the popstate event to continue.
      return true;
    });
    // No cleanup handler: see the JSDoc above for why we do not reset beforePopState here.
    // Resetting would remove any handler registered by other parts of the app after this hook mounted.
  }, [exploreDispatch, exploreState, router]);
};
