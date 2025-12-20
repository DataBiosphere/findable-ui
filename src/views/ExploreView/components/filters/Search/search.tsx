import React, { ComponentProps } from "react";
import { useSwitch } from "../../../../../components/common/Switch/provider/hook";
import { FacetAssistant } from "../../../../../components/Filter/components/ai/components/FacetAssistant/facetAssistant";
import { SearchAllFilters } from "../../../../../components/Filter/components/SearchAllFilters/searchAllFilters";

/**
 * Search component.
 * Renders a search all filters component or a facet assistant component based on the switch state.
 * @param props - Component props.
 * @param props.categoryViews - Category views.
 * @param props.onFilter - Filter function.
 * @param props.surfaceType - Surface type.
 * @returns Search component.
 */
export const Search = ({
  categoryViews,
  onFilter,
  surfaceType,
}: ComponentProps<typeof SearchAllFilters>): JSX.Element => {
  const { checked } = useSwitch();

  if (checked) return <FacetAssistant />;

  return (
    <SearchAllFilters
      categoryViews={categoryViews}
      onFilter={onFilter}
      surfaceType={surfaceType}
    />
  );
};
