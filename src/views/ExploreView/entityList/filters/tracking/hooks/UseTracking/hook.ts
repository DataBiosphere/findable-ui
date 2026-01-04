import {
  EVENT_NAME,
  EVENT_PARAM,
} from "../../../../../../../common/analytics/entities";
import { track } from "../../../../../../../common/analytics/analytics";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useCallback } from "react";
import { UseTracking } from "./types";
import { OnFilterWithTracking } from "../../../hooks/UseFilters/types";
import { parseFilterArgs } from "../../../hooks/UseFilters/utils";

export const useTracking = (): UseTracking => {
  const { config } = useConfig();
  const { trackingConfig } = config;

  const trackFilterEvent = useCallback(
    (...args: Parameters<OnFilterWithTracking>) => {
      const parsedArgs = parseFilterArgs(args);

      const { categoryKey, selected, value } = parsedArgs;

      trackingConfig?.trackFilterApplied?.({
        category: categoryKey,
        fromSearchAll: parsedArgs.fromSearchAll,
        searchTerm: parsedArgs.searchTerm,
        section: parsedArgs.categorySection,
        selected,
        value,
      });

      // Execute GTM tracking.
      if (selected) {
        track(EVENT_NAME.FILTER_SELECTED, {
          [EVENT_PARAM.FILTER_NAME]: categoryKey,
          [EVENT_PARAM.FILTER_VALUE]: String(value),
        });
      }
    },
    [trackingConfig],
  );

  return { trackFilterEvent };
};
