import { mapColumnFilters } from "../../adapter/columnFilters";
import { SelectedFilter } from "../../../../common/entities";
import { parseJsonQueryParam } from "../../../../utils/parseJsonQueryParam";
import { PARAM } from "../../state/queries/constants";
import { UrlToStatePayload } from "./types";
import { ColumnFiltersState } from "@tanstack/react-table";

/**
 * Builds the next column filters from the URL.
 * @param payload - Payload.
 * @returns Column filters.
 */
export function buildNextColumnFilters(
  payload: UrlToStatePayload,
): ColumnFiltersState {
  const selectedFilter = parseJsonQueryParam<SelectedFilter[]>(
    payload.query[PARAM.COLUMN_FILTERS],
    [],
  )!; // Non-null assertion safe: default value [] ensures return type is SelectedFilter.
  return mapColumnFilters(selectedFilter);
}
