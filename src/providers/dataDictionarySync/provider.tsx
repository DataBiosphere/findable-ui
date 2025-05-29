import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef } from "react";
import {
  addPopListener,
  removePopListener,
} from "../../services/beforePopState/popStateBus";
import { syncStateAndUrl } from "../dataDictionary/actions/syncStateAndUrl/dispatch";
import { updateStateFromUrl } from "../dataDictionary/actions/updateStateFromUrl/dispatch";
import { useDataDictionaryState } from "../dataDictionary/hooks/UseDataDictionaryState/hook";
import { useMetaCommands } from "./hook";

export function DataDictionarySyncProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { dataDictionaryDispatch, dataDictionaryState } =
    useDataDictionaryState();
  const { events, isReady, query } = useRouter();

  // Synced flag to indicate that state and URL sync action has been requested.
  const isSynced = useRef<boolean>(false);

  useEffect(() => {
    if (isSynced.current) return;
    if (!isReady) return;
    console.log("mounting");
    // Sync state from URL when provider mounts.
    dataDictionaryDispatch?.(syncStateAndUrl(query));
    // Mark as synced.
    isSynced.current = true;
  }, [dataDictionaryDispatch, isReady, query]);

  // Meta-command related side effects.
  useMetaCommands({ dataDictionaryDispatch, dataDictionaryState });

  useEffect(() => {
    const syncFilters = ({ as, ...rest }: { as: string }) => {
      console.log("syncing filters", rest, as);
      dataDictionaryDispatch?.(updateStateFromUrl({ filter: "[]" }));
      return true;
    };

    addPopListener(syncFilters);
    return () => removePopListener(syncFilters);
  }, [dataDictionaryDispatch]);

  return <>{children}</>;
}
