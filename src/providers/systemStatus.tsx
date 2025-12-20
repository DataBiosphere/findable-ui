import React, { createContext, ReactNode, useEffect, useMemo } from "react";
import { fetchSystemStatusFromURL } from "../entity/api/service";
import { useAsync } from "../hooks/useAsync";
import { useCatalog } from "../hooks/useCatalog";
import { useConfig } from "../hooks/useConfig";

// Default system status.
const DEFAULT_SYSTEM_STATUS: SystemStatus = {
  indexing: false,
  loading: false,
  ok: true,
};

/**
 * Possible values of indexing status check.
 */
export enum INDEXING_STATUS {
  "COMPLETE" = "COMPLETE",
  "FAILED" = "FAILED",
}

/**
 * Model of current system status.
 */
export interface SystemStatusResponse {
  indexing: boolean;
  indexingStatus: INDEXING_STATUS;
  ok: boolean;
}

/**
 * Model of system-related state.
 */
export interface SystemStatus {
  indexing: boolean;
  loading: boolean;
  ok: boolean;
}

/**
 * System status context.
 */
export const SystemStatusContext = createContext<SystemStatus>(
  DEFAULT_SYSTEM_STATUS,
);

export interface SystemStatusProps {
  children: ReactNode | ReactNode[];
}

export function SystemStatusProvider<R>({
  children,
}: SystemStatusProps): JSX.Element {
  const catalog = useCatalog();
  const { config } = useConfig();
  const { systemStatus: systemStatusConfig } = config || {};
  const { apiPath, bindResponse } = systemStatusConfig || {};

  // Build system status URL.
  const url = useMemo(
    () => getSystemStatusURL(apiPath, catalog),
    [apiPath, catalog],
  );

  // System status (raw) response.
  const { data, isIdle, isLoading, run } = useAsync<R>();

  // Bind system status response.
  const response = useMemo(() => bindResponse?.(data), [bindResponse, data]);

  // Remove indexing status from response.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- using destructuring to remove indexingStatus from response.
  const { indexingStatus, ...systemStatusResponse } = response || {};
  // Build system status.
  const systemStatus = { ...DEFAULT_SYSTEM_STATUS, ...systemStatusResponse };
  // If the system status is configured, update the loading state.
  if (config.systemStatus) {
    systemStatus.loading = isIdle || isLoading;
  }

  // Fetch system status from URL.
  useEffect(() => {
    if (!url) return;
    run(fetchSystemStatusFromURL(url));
  }, [run, url]);

  return (
    <SystemStatusContext.Provider
      value={{
        ...systemStatus,
      }}
    >
      {children}
    </SystemStatusContext.Provider>
  );
}

/**
 * Returns system status URL.
 * @param path - System status endpoint.
 * @param catalog - Catalog.
 * @returns system status URL.
 */
function getSystemStatusURL(
  path: string | undefined,
  catalog: string | undefined,
): string | undefined {
  if (!path || !catalog) return;
  const url = new URL(path);
  url.searchParams.set("catalog", catalog);
  return url.href;
}
