import { isSSR } from "../../../../../../utils/ssr";
import { UseHash } from "./types";

/**
 * Hook to get the current URL hash without the leading '#' character.
 *
 * @description
 * Extracts the hash from window.location.hash and removes the leading '#'.
 * Returns empty string when running in SSR environment.
 *
 * @returns Object containing the hash without leading '#', or empty string if SSR.
 */
export function useHash(): UseHash {
  if (isSSR()) return { hash: "" };
  const { hash } = window.location;
  return { hash: hash.replace(/^#/, "") };
}
