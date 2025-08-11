import { Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { ButtonTextPrimary } from "../../../common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import { FilterNoResultsFound as FilterNoResults } from "./filterNoResultsFound.styles";

type OnClearSearchTermFn = () => void;

export interface FilterNoResultsFoundProps {
  onClearSearchTerm?: OnClearSearchTermFn;
}

export const FilterNoResultsFound = forwardRef<
  HTMLDivElement,
  FilterNoResultsFoundProps
>(function FilterNoResultsFound(
  { onClearSearchTerm }: FilterNoResultsFoundProps,
  ref
): JSX.Element {
  return (
    <FilterNoResults ref={ref}>
      <Typography component="div" variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}>
        No results found!
      </Typography>
      <Typography
        color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
        component="div"
        mb={onClearSearchTerm ? 2 : 0}
        mt={1}
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
      >
        Try adjusting your search or filter to find what you’re looking for.
      </Typography>
      {onClearSearchTerm && (
        <ButtonTextPrimary onClick={onClearSearchTerm}>
          Clear Search
        </ButtonTextPrimary>
      )}
    </FilterNoResults>
  );
});
