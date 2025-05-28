import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef } from "react";
import { syncStateAndUrl } from "../dataDictionary/actions/syncStateAndUrl/dispatch";
import { useDataDictionaryState } from "../dataDictionary/hooks/UseDataDictionaryState/hook";
import { useMetaCommands } from "./hook";

export function DataDictionaryMetaProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { dataDictionaryDispatch, dataDictionaryState } =
    useDataDictionaryState();
  const { isReady, query } = useRouter();

  // Synced flag to indicate that state and URL sync action has been requested.
  const isSynced = useRef<boolean>(false);

  useEffect(() => {
    if (isSynced.current) return;
    if (!isReady) return;
    // Sync state from URL when provider mounts.
    dataDictionaryDispatch?.(syncStateAndUrl(query));
    // Mark as synced.
    isSynced.current = true;
  }, [dataDictionaryDispatch, isReady, query]);

  // Meta-command related side effects.
  useMetaCommands({ dataDictionaryDispatch, dataDictionaryState });

  return <>{children}</>;
}
