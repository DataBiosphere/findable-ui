import { useRouter } from "next/router";
import { useMemo } from "react";
import { useConfig } from "../../useConfig";
import { INACTIVITY_PARAM } from "../../useSessionTimeout";

export interface UseSessionCallbackUrl {
  callbackUrl: string | undefined;
}

export const useSessionCallbackUrl = (): UseSessionCallbackUrl => {
  const {
    config: { redirectRootToPath: path },
  } = useConfig();
  const { basePath } = useRouter();
  const pathname = getPathname(basePath, path);
  const callbackUrl = useMemo(() => getUrl(pathname), [pathname]);
  return { callbackUrl };
};

/**
 * Returns the pathname.
 * @param basePath - Base path.
 * @param path - Path.
 * @returns pathname.
 */
function getPathname(basePath: string, path: string): string {
  return `${basePath}${path}`;
}

/**
 * Returns the URL with the inactivity query parameter set to true.
 * @param url - URL.
 * @returns URL.
 */
function getUrl(url: string): string | undefined {
  if (typeof window === "undefined") return;
  const urlObj = new URL(url, window.location.origin);
  urlObj.searchParams.set(INACTIVITY_PARAM, "true");
  return urlObj.href;
}
