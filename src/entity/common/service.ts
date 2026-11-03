import {
  AzulEntitiesResponse,
  AzulEntityStaticResponse,
} from "../../apis/azul/common/entities";
import { fetchApi } from "./client";
import { getKyRequestOptions } from "./utils";

/**
 * Fetch entities from the given URL.
 * @param URL - URL.
 * @param accessToken - Access token.
 * @param signal - Signal that cancels the request, if any.
 * @returns entities.
 */
export const fetchEntitiesFromURL = async (
  URL: string,
  accessToken?: string,
  signal?: AbortSignal,
): Promise<AzulEntitiesResponse> => {
  const res = await fetchApi<AzulEntitiesResponse>(URL, {
    ...getKyRequestOptions(accessToken),
    signal,
  });
  return await res.json();
};

/**
 * Fetch entity from the given URL.
 * @param URL - URL.
 * @param accessToken - Access token.
 * @returns entity.
 */
export const fetchEntityFromURL = async (
  URL: string,
  accessToken?: string,
): Promise<AzulEntityStaticResponse> => {
  const res = await fetchApi<AzulEntityStaticResponse>(
    URL,
    getKyRequestOptions(accessToken),
  );
  return await res.json();
};
