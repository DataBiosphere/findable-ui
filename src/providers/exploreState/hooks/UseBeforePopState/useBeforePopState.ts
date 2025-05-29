import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  addPopListener,
  removePopListener,
} from "services/beforePopState/popStateBus";
import { ExploreStateContextProps } from "../../../exploreState";
import { syncStateFromUrl } from "../../../exploreState/actions/syncStateFromUrl/dispatch";
import { getSyncStateFromUrl } from "./utils";

export const useBeforePopState = ({
  exploreDispatch,
}: ExploreStateContextProps): void => {
  const router = useRouter();
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
      const payload = getSyncStateFromUrl(url, as);
      // Only dispatch if the url contains the dynamic segment `[entityListType]`.
      // TODO ??
      // Sync URL -> state.
      exploreDispatch(syncStateFromUrl(payload));
      // Force a full route transition to ensure page props are refreshed.
      router.replace(url, as, { ...options, shallow: false });
      return false;
    };
    addPopListener(syncExploreState);
    return () => removePopListener(syncExploreState);
  }, [exploreDispatch, router]);
};
