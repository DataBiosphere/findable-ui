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
 */
export function useValidateFilterParam(): void {
  const { query } = useRouter();
  const filterParam = query[EXPLORE_URL_PARAMS.FILTER];

  useMemo(() => {
    if (filterParam === undefined) return;
    if (typeof filterParam !== "string") {
      throw new DataExplorerError({ message: INVALID_FILTER_PARAM_ERROR });
    }
    let decoded: string;
    try {
      decoded = decodeURIComponent(filterParam);
    } catch {
      throw new DataExplorerError({ message: INVALID_FILTER_PARAM_ERROR });
    }
    // An empty array "[]" is a valid filter param (no filters selected).
    if (decoded === "[]") return;
    const filters = parseFilterParam(decoded);
    if (filters.length === 0) {
      throw new DataExplorerError({ message: INVALID_FILTER_PARAM_ERROR });
    }
  }, [filterParam]);
}
