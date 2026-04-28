import { useRouter } from "next/router";
import { useMemo } from "react";
import { parseFilterParam } from "../../../../common/filters/typeGuards";
import { EXPLORE_URL_PARAMS } from "../../../../providers/exploreState/constants";
import { DataExplorerError } from "../../../../types/error";

const INVALID_FILTER_PARAM_ERROR = "Invalid filter parameter in URL";

/**
 * Validates the filter query parameter from the URL.
 * Throws a DataExplorerError during render if the filter param is present
 * but contains malformed JSON or an invalid filter shape, allowing the
 * ErrorBoundary to catch and display the error page.
 * @returns Nothing; this hook performs validation and throws on invalid input.
 */
export function useValidateFilterParam(): void {
  const { query } = useRouter();
  const filterParam = query[EXPLORE_URL_PARAMS.FILTER];

  const validationError = useMemo((): DataExplorerError | undefined => {
    if (filterParam === undefined) return undefined;

    if (typeof filterParam !== "string") {
      return new DataExplorerError({ message: INVALID_FILTER_PARAM_ERROR });
    }

    let decoded: string;

    try {
      decoded = decodeURIComponent(filterParam);
    } catch {
      return new DataExplorerError({ message: INVALID_FILTER_PARAM_ERROR });
    }

    // Parse and validate the filter param.
    // An empty array (e.g. "[]") is valid — it means no filters selected.
    // A non-empty array with no valid entries is invalid.
    let parsed: unknown;
    try {
      parsed = JSON.parse(decoded);
    } catch {
      return new DataExplorerError({ message: INVALID_FILTER_PARAM_ERROR });
    }
    if (!Array.isArray(parsed)) {
      return new DataExplorerError({ message: INVALID_FILTER_PARAM_ERROR });
    }
    if (parsed.length === 0) return undefined;
    const filters = parseFilterParam(decoded);
    if (filters.length === 0) {
      return new DataExplorerError({ message: INVALID_FILTER_PARAM_ERROR });
    }

    return undefined;
  }, [filterParam]);

  if (validationError) {
    throw validationError;
  }
}
