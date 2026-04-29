import { useMemo } from "react";
import { useValidateFilterKeys } from "../../../../common/filters/hooks/UseValidateFilterKeys/hook";
import { isSelectedFilter } from "../../../../common/filters/typeGuards";
import { useConfig } from "../../../../hooks/useConfig";
import { EXPLORE_URL_PARAMS } from "../../../../providers/exploreState/constants";
import { extractCategoryKey, getValidCategoryKeys } from "./utils";

/**
 * Validates the filter query parameter from the URL for the ExploreView.
 * Throws a DataExplorerError during render if the filter param is present
 * but contains malformed JSON, an invalid filter shape, or a categoryKey
 * that does not exist in the configured categories, allowing the
 * ErrorBoundary to catch and display the error page.
 */
export function useValidateFilterParam(): void {
  const { config, entityConfig } = useConfig();
  const validKeys = useMemo(
    () => getValidCategoryKeys(config, entityConfig),
    [config, entityConfig],
  );

  useValidateFilterKeys(
    EXPLORE_URL_PARAMS.FILTER,
    validKeys,
    isSelectedFilter,
    extractCategoryKey,
  );
}
