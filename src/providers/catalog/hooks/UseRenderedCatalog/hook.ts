import { useCatalog } from "../../../../hooks/useCatalog";
import { useConfig } from "../../../../hooks/useConfig";
import { useIsHydrated } from "../../../../hooks/useIsHydrated/hook";
import { getDefaultCatalog } from "../../utils";

/**
 * Returns the catalog to render, e.g. in a label: the config's default catalog, which the static HTML is built with,
 * until the page has hydrated, then the catalog from `useCatalog`. Rendering `useCatalog` instead causes a hydration
 * mismatch, because the catalog can come from the URL, which the static HTML doesn't know: an attribute such as `href`
 * keeps the static HTML's value, and text is rendered again on the client with a hydration error.
 * @returns The catalog to render, or undefined when none is selected and the config has no default.
 */
export function useRenderedCatalog(): string | undefined {
  const { config } = useConfig();
  const catalog = useCatalog();
  const isHydrated = useIsHydrated();
  return isHydrated ? catalog : getDefaultCatalog(config);
}
