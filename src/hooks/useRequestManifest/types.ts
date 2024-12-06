import { Method } from "../useRequestFileLocation";

export interface UseRequestManifest {
  requestMethod: Method;
  requestParams?: URLSearchParams;
  requestUrl?: string;
}
