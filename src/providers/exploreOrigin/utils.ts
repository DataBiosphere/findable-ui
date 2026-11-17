import { FROM_URL_PARAM } from "../../common/constants";
import type { SiteConfig } from "../../config/entities";
import { isSSR } from "../../utils/ssr";

/**
 * Returns the configured entity routes, for `ExploreOriginProvider`'s `allowedOrigins`.
 * @param config - Site config.
 * @returns The route of each configured entity.
 */
export function getAllowedOrigins(config: SiteConfig): string[] {
  return config.entities.map(({ route }) => route);
}

/**
 * Returns the entity list type named by a `from` URL param value, when it is an allowed origin.
 * @param value - Router query value of the `from` param.
 * @param allowedOrigins - Entity list types the param may name.
 * @returns The entity list type, or undefined when the value is missing, repeated or not allowed.
 */
export function getExploreOriginParam(
  value: string | string[] | undefined,
  allowedOrigins: string[],
): string | undefined {
  if (typeof value !== "string") return undefined;
  return allowedOrigins.includes(value) ? value : undefined;
}

/**
 * Returns the `from` param in the browser's current URL, shaped like a Next.js router query value, so the first render
 * can read it before the router is ready.
 * @returns The value; an array when the param repeats; undefined during server rendering or when the URL has none.
 */
export function getLocationExploreOriginParam(): string | string[] | undefined {
  if (isSSR()) return undefined;
  const values = new URLSearchParams(window.location.search).getAll(
    FROM_URL_PARAM,
  );
  if (values.length === 0) return undefined;
  return values.length === 1 ? values[0] : values;
}
