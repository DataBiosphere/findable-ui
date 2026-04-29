import { useRouter } from "next/router";
import { useMemo } from "react";
import { validateFilterParam } from "./utils";

/**
 * Generic hook that validates filter URL param keys against a provided set of
 * valid keys. Throws a DataExplorerError during render if the filter param is
 * present but contains malformed JSON, an invalid entry shape, or a key that
 * is not in the valid set, allowing the ErrorBoundary to catch and display the
 * error page.
 * @param queryParamKey - URL query parameter key to read (e.g. "filter").
 * @param validKeys - Set of valid keys, or undefined to skip key validation.
 * @param entryValidator - Type guard that validates each parsed entry's shape.
 * @param keyExtractor - Extracts the key string from a validated entry. Required when validKeys is provided.
 */
export function useValidateFilterKeys(
  queryParamKey: string,
  validKeys: Set<string> | undefined,
  entryValidator: (value: unknown) => boolean,
  keyExtractor?: (entry: unknown) => string,
): void {
  const { query } = useRouter();
  const filterParam = query[queryParamKey];

  const validationError = useMemo(
    () =>
      validateFilterParam(filterParam, validKeys, entryValidator, keyExtractor),
    [entryValidator, filterParam, keyExtractor, validKeys],
  );

  if (validationError) {
    throw validationError;
  }
}
