import type {
  FILTER_SORT,
  FilterSortConfig,
} from "../../../../../../../common/filters/sort/config/types";

/**
 * Story table row: a sample with an assay and an organ.
 */
export interface Row {
  assay: string;
  organ: string;
}

/**
 * Props for the story adapter: the table meta filter sort.
 */
export interface StoryAdapterProps {
  filterSort: FILTER_SORT | FilterSortConfig;
}
