import { Method } from "../useRequestFileLocation";

/**
 * Return value of the useRequestManifest hook.
 */
export interface UseRequestManifest {
  requestMethod: Method;
  requestParams?: URLSearchParams;
  requestUrl?: string;
}
