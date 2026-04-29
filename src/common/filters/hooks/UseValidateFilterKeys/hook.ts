import { useRouter } from "next/router";
import { useMemo } from "react";
import { validateFilterParam } from "./utils";

/**
 * Validates the filter query parameter shape only (no key validation).
 * Throws a DataExplorerError during render if the filter param is present
 * but contains malformed JSON or an invalid entry shape.
 * @param queryParamKey - URL query parameter key to read (e.g. "filter").
 * @param validKeys - Must be undefined to use this overload.
 * @param entryValidator - Type guard that validates each parsed entry's shape.
 * @returns void; throws DataExplorerError on invalid input.
 */
export function useValidateFilterKeys(
  queryParamKey: string,
  validKeys: undefined,
  entryValidator: (value: unknown) => boolean,
): void;
/**
 * Validates the filter query parameter shape and keys against a valid set.
 * Throws a DataExplorerError during render if the filter param is present
 * but contains malformed JSON, an invalid entry shape, or a key that
 * is not in the valid set.
 * @param queryParamKey - URL query parameter key to read (e.g. "filter").
 * @param validKeys - Set of valid keys.
 * @param entryValidator - Type guard that validates each parsed entry's shape.
 * @param keyExtractor - Extracts the key string from a validated entry.
 * @returns void; throws DataExplorerError on invalid input.
 */
export function useValidateFilterKeys(
  queryParamKey: string,
  validKeys: Set<string>,
  entryValidator: (value: unknown) => boolean,
  keyExtractor: (entry: unknown) => string,
): void;
/**
 * Validates the filter query parameter shape and, when validKeys is defined,
 * keys against the valid set. Use when validKeys is dynamically determined.
 * @param queryParamKey - URL query parameter key to read (e.g. "filter").
 * @param validKeys - Set of valid keys, or undefined to skip key validation.
 * @param entryValidator - Type guard that validates each parsed entry's shape.
 * @param keyExtractor - Extracts the key string from a validated entry.
 * @returns void; throws DataExplorerError on invalid input.
 */
export function useValidateFilterKeys(
  queryParamKey: string,
  validKeys: Set<string> | undefined,
  entryValidator: (value: unknown) => boolean,
  keyExtractor: (entry: unknown) => string,
): void;
export function useValidateFilterKeys(
  queryParamKey: string,
  validKeys: Set<string> | undefined,
  entryValidator: (value: unknown) => boolean,
  keyExtractor?: (entry: unknown) => string,
): void {
  const { query } = useRouter();
  const filterParam = query[queryParamKey];

  const validationError = useMemo(() => {
    if (validKeys && keyExtractor) {
      return validateFilterParam(
        filterParam,
        validKeys,
        entryValidator,
        keyExtractor,
      );
    }
    return validateFilterParam(filterParam, undefined, entryValidator);
  }, [entryValidator, filterParam, keyExtractor, validKeys]);

  if (validationError) {
    throw validationError;
  }
}
