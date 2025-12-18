import React, { ComponentProps } from "react";
import { useSwitch } from "../../../../../components/common/Switch/provider/hook";
import { FacetAssistant } from "../../../../../components/Filter/components/ai/components/FacetAssistant/facetAssistant";
import { SearchAllFilters } from "../../../../../components/Filter/components/SearchAllFilters/searchAllFilters";

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
