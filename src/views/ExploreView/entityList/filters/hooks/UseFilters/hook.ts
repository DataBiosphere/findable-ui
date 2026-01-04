import { useCallback } from "react";
import { OnFilterWithTracking, UseFilters } from "./types";
import { useTracking } from "../../tracking/hooks/UseTracking/hook";
import { OnFilterChange } from "../../../../../../common/tables/hooks/UseTableFilters/types";
import { parseFilterArgs } from "./utils";

export const useFilters = (onFilterChange: OnFilterChange): UseFilters => {
  const { trackFilterEvent } = useTracking();

  const onFilter = useCallback(
    (...args: Parameters<OnFilterWithTracking>) => {
      const { categoryKey, value, viewKind } = parseFilterArgs(args);

      onFilterChange(categoryKey, value, viewKind);

      trackFilterEvent(...args);
    },
    [onFilterChange, trackFilterEvent],
  );

  return { onFilter };
};
