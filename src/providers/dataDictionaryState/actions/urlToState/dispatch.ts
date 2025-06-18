import { DataDictionaryActionKind } from "../types";
import { UrlToStateAction, UrlToStatePayload } from "./types";

/**
 * Action creator for URL >> state sync.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function urlToState(payload: UrlToStatePayload): UrlToStateAction {
  return {
    payload,
    type: DataDictionaryActionKind.UrlToState,
  };
}
