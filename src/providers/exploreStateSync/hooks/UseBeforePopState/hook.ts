import Router from "next/router";
import { useEffect } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import {
  addPopListener,
  removePopListener,
} from "../../../../services/beforePopState/popStateBus";
import { updateStateFromUrl } from "../../../exploreState/actions/updateStateFromUrl/dispatch";
import { getStateFromUrl } from "./utils";

/**
 * Handles browser back/forward navigation by syncing URL parameters to Explore state.
 *
 * Guards against a race condition where the popstate event fires during component
 * unmount, when the listener is still active but the context is being torn down.
 *
 * For URLs ending with entityListType:
 * - Updates state from URL parameters
 * - Blocks default navigation
 * - Forces a full page reload via Router.replace
 *
 * For other URLs (which only occur during the race condition), allows default navigation to proceed.
 */

export const useBeforePopState = (): void => {
  const { exploreDispatch } = useExploreState();

  useEffect(() => {
    const syncExploreState = ({
      as,
      options,
      url,
    }: {
      as: string;
      options: object; // FIX
      url: string;
    }) => {
      // Grab the expected state from URL.
      const payload = getStateFromUrl(url, as);
      console.log("PAYLOAD", payload);
      // Early return for navigation events that do not end with entity list type.
      if (!payload.entityListType) return true;
      // Dispatch action to update state from URL.
      exploreDispatch(updateStateFromUrl(payload));
      // Force a full route transition to ensure page props are refreshed.
      Router.replace(url, as, { ...options, shallow: false });
      return false;
    };
    addPopListener(syncExploreState);
    return () => {
      removePopListener(syncExploreState);
    };
  }, [exploreDispatch]);
};
