import { ReactNode } from "react";
import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for a social link. `Social.label` is typed as
 * `ReactNode` but is a plain string in every known consumer, so it is used
 * directly when it is one — the link's icon is `aria-hidden`, leaving no text
 * to name it. Anything else falls back to the link's host rather than a single
 * generic name, because a list of socials sharing one accessible name is worse
 * than the per-network naming this fallback stands in for.
 * @param label - The social's label.
 * @param url - The social's URL, used to derive a fallback name.
 * @returns The social link's accessible name.
 */
export function getSocialLabel(label: ReactNode, url: string): string {
  const resolved = typeof label === "string" ? label.trim() : "";
  // The host is only parsed when the label cannot name the link, rather than
  // building a URL on every render to hand over a fallback nothing wants.
  return resolved || getUrlHost(url) || ARIA_LABEL.SOCIAL;
}

/**
 * Returns the host of the given URL, without any leading "www.".
 * @param url - URL to take the host from.
 * @returns The URL's host, or undefined when the URL is not absolute.
 */
function getUrlHost(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "") || undefined;
  } catch {
    return undefined;
  }
}
