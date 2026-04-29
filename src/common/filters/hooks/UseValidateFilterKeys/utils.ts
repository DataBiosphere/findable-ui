import { DataExplorerError } from "../../../../types/error";

const INVALID_FILTER_PARAM = "Invalid filter parameter in URL";
const INVALID_FILTER_SHAPE = "Invalid filter entry shape in URL";
const UNKNOWN_FILTER_KEY = "Unknown filter key in URL";

/**
 * Validates a filter query parameter value against a set of valid keys.
 * Returns a DataExplorerError if the param is malformed, has an invalid
 * entry shape, or contains a key not in the valid set.
 * @param filterParam - Raw URL query param value.
 * @param validKeys - Set of valid keys, or undefined to skip key validation.
 * @param entryValidator - Type guard that validates each parsed entry's shape.
 * @param keyExtractor - Extracts the key string from a validated entry. Required when validKeys is provided.
 * @returns DataExplorerError if invalid, undefined if valid.
 */
export function validateFilterParam(
  filterParam: string | string[] | undefined,
  validKeys: Set<string> | undefined,
  entryValidator: (value: unknown) => boolean,
  keyExtractor?: (entry: unknown) => string,
): DataExplorerError | undefined {
  if (filterParam === undefined) return undefined;

  if (typeof filterParam !== "string") {
    return new DataExplorerError({ message: INVALID_FILTER_PARAM });
  }

  let decoded: string;

  try {
    decoded = decodeURIComponent(filterParam);
  } catch {
    return new DataExplorerError({ message: INVALID_FILTER_PARAM });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(decoded);
  } catch {
    return new DataExplorerError({ message: INVALID_FILTER_PARAM });
  }

  if (!Array.isArray(parsed)) {
    return new DataExplorerError({ message: INVALID_FILTER_PARAM });
  }

  // An empty array (e.g. "[]") is valid — it means no filters selected.
  if (parsed.length === 0) return undefined;

  // Validate shape: every entry must match the expected shape.
  if (!parsed.every(entryValidator)) {
    return new DataExplorerError({ message: INVALID_FILTER_SHAPE });
  }

  // Validate keys: every extracted key must be in the valid set.
  if (validKeys && keyExtractor) {
    const invalidKey = parsed
      .map(keyExtractor)
      .find((key) => !validKeys.has(key));
    if (invalidKey !== undefined) {
      return new DataExplorerError({
        message: `${UNKNOWN_FILTER_KEY}: ${invalidKey}`,
      });
    }
  }

  return undefined;
}
