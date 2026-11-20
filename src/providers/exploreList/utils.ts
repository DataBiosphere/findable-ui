import { LIST_URL_PARAM } from "../../common/constants";
import type { SiteConfig } from "../../config/entities";
import { isSSR } from "../../utils/ssr";

/**
 * Returns the configured entity routes, for `ExploreListProvider`'s `allowedLists`.
 * @param config - Site config.
 * @returns The route of each configured entity.
 */
export function getAllowedLists(config: SiteConfig): string[] {
  return config.entities.map(({ route }) => route);
}

/**
 * Returns the entity list type named by a `list` URL param value, when it names an allowed list.
 * @param value - Router query value of the `list` param.
 * @param allowedLists - Entity list types the param may name.
 * @returns The entity list type, or undefined when the value is missing, repeated or not allowed.
 */
export function getExploreListParam(
  value: string | string[] | undefined,
  allowedLists: string[],
): string | undefined {
  if (typeof value !== "string") return undefined;
  return allowedLists.includes(value) ? value : undefined;
}

/**
 * Returns the `list` param in the browser's current URL, shaped like a Next.js router query value, so the first render
 * can read it before the router is ready.
 * @returns The value; an array when the param repeats; undefined during server rendering or when the URL has none.
 */
export function getLocationExploreListParam(): string | string[] | undefined {
  if (isSSR()) return undefined;
  const values = new URLSearchParams(window.location.search).getAll(
    LIST_URL_PARAM,
  );
  if (values.length === 0) return undefined;
  return values.length === 1 ? values[0] : values;
}
