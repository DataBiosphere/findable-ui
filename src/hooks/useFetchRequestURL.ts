import { APIEndpoints } from "../apis/azul/common/entities";
import { useConfig } from "./useConfig";

/**
 * Returns request URL for the given endpoint and request params.
 * @param endpoint - Endpoint.
 * @param requestParams - Request params.
 * @returns request URL.
 */
export const useFetchRequestURL = (
  endpoint: APIEndpoints,
  requestParams: URLSearchParams
): string => {
  const { config } = useConfig();
  const { dataSource } = config;
  const { url } = dataSource;

  // Returns request URL.
  return `${url}index${endpoint}?${requestParams.toString()}`;
};
