import { useRouter } from "next/router";
import { useMemo } from "react";
import { useConfig } from "./useConfig";

export function useRouteRoot(): string {
  const {
    config: { redirectRootToPath: path },
  } = useConfig();
  const { basePath } = useRouter();
  return useMemo(() => `${basePath}${path}`, [basePath, path]);
}
