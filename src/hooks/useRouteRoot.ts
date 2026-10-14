import { useRouter } from "next/router";
import { useMemo } from "react";
import { useConfig } from "./useConfig";

/**
 * Returns the root route: the configured redirect root path, prefixed with the base path.
 * @returns The root route.
 */
export function useRouteRoot(): string {
  const {
    config: { redirectRootToPath: path },
  } = useConfig();
  const { basePath } = useRouter();
  return useMemo(() => `${basePath}${path}`, [basePath, path]);
}
