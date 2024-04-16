import React, {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import {
  AzulSummaryResponse,
  ManifestDownloadFormat,
} from "../apis/azul/common/entities";
import { getFilterParameterValue } from "../apis/azul/common/utils";
import {
  CategoryKey,
  CategoryValueKey,
  Filters,
  SelectedFilterValue,
} from "../common/entities";
import { useCatalog } from "../hooks/useCatalog";
import { buildNextFilterState } from "../hooks/useCategoryFilter";
import { buildFileManifestRequestURL } from "../hooks/useFileManifest/common/buildFileManifestRequestURL";
import { FileFacet } from "../hooks/useFileManifest/common/entities";
import { useFetchFilesFacets } from "../hooks/useFileManifest/useFetchFilesFacets";
import { useFetchSummary } from "../hooks/useFileManifest/useFetchSummary";
import { useFileManifestURL } from "../hooks/useFileManifest/useFileManifestURL";

// Default file manifest state.
export const DEFAULT_FILE_MANIFEST_STATE = {
  fileManifestFormat: undefined,
  fileSummary: undefined,
  fileSummaryFacetName: undefined,
  fileSummaryFilters: [],
  filesFacets: [],
  filters: [],
  isEnabled: false,
  isFacetsLoading: false,
  isFacetsSuccess: false,
  isFileSummaryLoading: false,
  isLoading: false,
  isSummaryLoading: false,
  requestParams: undefined,
  requestURL: undefined,
  summary: undefined,
};

/**
 * File manifest state.
 */
export type FileManifestState = {
  fileManifestFormat?: ManifestDownloadFormat;
  filesFacets: FileFacet[];
  fileSummary?: AzulSummaryResponse;
  fileSummaryFacetName?: string;
  fileSummaryFilters: Filters;
  filters: Filters;
  isEnabled: boolean;
  isFacetsLoading: boolean;
  isFacetsSuccess: boolean;
  isFileSummaryLoading: boolean;
  isLoading: boolean;
  isSummaryLoading: boolean;
  requestParams?: URLSearchParams;
  requestURL?: string;
  summary?: AzulSummaryResponse;
};

/**
 * Model of file manifest state context.
 */
export type FileManifestStateContextProps = {
  fileManifestDispatch: Dispatch<FileManifestAction>;
  fileManifestState: FileManifestState;
};

export const FileManifestStateContext =
  createContext<FileManifestStateContextProps>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
    fileManifestDispatch: () => {},
    fileManifestState: DEFAULT_FILE_MANIFEST_STATE,
  });

export interface FileManifestStateProps {
  children: ReactNode | ReactNode[];
}

export function FileManifestStateProvider({
  children,
}: FileManifestStateProps): JSX.Element {
  // Determine catalog.
  const catalog = useCatalog() as string; // catalog should be defined.

  // Determine file manifest request data URL.
  const URL = useFileManifestURL();

  // File manifest state.
  const [fileManifestState, fileManifestDispatch] = useReducer(
    (s: FileManifestState, a: FileManifestAction) =>
      fileManifestReducer(s, a, { URL, catalog }),
    DEFAULT_FILE_MANIFEST_STATE
  );

  const { fileSummaryFacetName, fileSummaryFilters, filters, isEnabled } =
    fileManifestState;

  // Fetch files facets.
  const {
    filesFacets,
    isLoading: isFacetsLoading,
    isSuccess: isFacetsSuccess,
  } = useFetchFilesFacets(filters, catalog, { size: "25" }, isEnabled);

  // Fetch summary.
  const { isLoading: isSummaryLoading, summary } = useFetchSummary(
    filters,
    catalog,
    isEnabled
  );

  // Fetch file summary.
  const { isLoading: isFileSummaryLoading, summary: fileSummary } =
    useFetchSummary(fileSummaryFilters, catalog, Boolean(fileSummaryFacetName));

  // Update file manifest state.
  useEffect(() => {
    fileManifestDispatch({
      payload: {
        fileSummary,
        filesFacets,
        isFacetsLoading,
        isFacetsSuccess,
        isFileSummaryLoading,
        isLoading: isFacetsLoading || isFileSummaryLoading || isSummaryLoading,
        isSummaryLoading,
        summary,
      },
      type: FileManifestActionKind.UpdateFileManifest,
    });
  }, [
    filesFacets,
    fileSummary,
    isFacetsLoading,
    isFacetsSuccess,
    isFileSummaryLoading,
    isSummaryLoading,
    summary,
  ]);

  return (
    <FileManifestStateContext.Provider
      value={{
        fileManifestDispatch,
        fileManifestState,
      }}
    >
      {children}
    </FileManifestStateContext.Provider>
  );
}

/**
 * File manifest action kind.
 */
export enum FileManifestActionKind {
  ClearFileManifest = "CLEAR_FILE_MANIFEST",
  FetchFileManifest = "FETCH_FILE_MANIFEST",
  UpdateFileManifest = "UPDATE_FILE_MANIFEST",
  UpdateFileManifestFormat = "UPDATE_FILE_MANIFEST_FORMAT",
  UpdateFilter = "UPDATE_FILTER",
  UpdateFiltersCategory = "UPDATE_FILTERS_CATEGORY",
}

/**
 * File manifest action.
 */
export type FileManifestAction =
  | ClearFileManifestAction
  | FetchFileManifestAction
  | UpdateFileManifestAction
  | UpdateFileManifestFormatAction
  | UpdateFilterAction
  | UpdateFiltersCategoryAction;

/**
 * Resets file manifest state.
 */
type ClearFileManifestAction = {
  payload: undefined;
  type: FileManifestActionKind.ClearFileManifest;
};

/**
 * Fetch file manifest action.
 */
type FetchFileManifestAction = {
  payload: FetchFileManifestPayload;
  type: FileManifestActionKind.FetchFileManifest;
};

/**
 * Update file manifest action.
 */
type UpdateFileManifestAction = {
  payload: UpdateFileManifestPayload;
  type: FileManifestActionKind.UpdateFileManifest;
};

/**
 * Update file manifest format action.
 */
type UpdateFileManifestFormatAction = {
  payload: ManifestDownloadFormat | undefined;
  type: FileManifestActionKind.UpdateFileManifestFormat;
};

/**
 * Update filter action.
 */
type UpdateFilterAction = {
  payload: UpdateFilterPayload;
  type: FileManifestActionKind.UpdateFilter;
};

/**
 * Update filters by category action.
 */
type UpdateFiltersCategoryAction = {
  payload: CategoryKey;
  type: FileManifestActionKind.UpdateFiltersCategory;
};

/**
 * Initialize file manifest payload.
 */
type FetchFileManifestPayload = {
  fileManifestFormat?: ManifestDownloadFormat;
  fileSummaryFacetName?: string;
  filters: Filters;
};

/**
 * Update file manifest payload.
 */
type UpdateFileManifestPayload = {
  filesFacets: FileFacet[];
  fileSummary?: AzulSummaryResponse;
  isFacetsLoading: boolean;
  isFacetsSuccess: boolean;
  isFileSummaryLoading: boolean;
  isLoading: boolean;
  isSummaryLoading: boolean;
  summary?: AzulSummaryResponse;
};

/**
 * Update filter payload.
 */
export type UpdateFilterPayload = {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
};

/**
 * File manifest context.
 */
export interface FileManifestContext {
  catalog: string;
  URL: string;
}

/**
 * File manifest reducer.
 * @param state - File manifest state.
 * @param action - File manifest action.
 * @param fileManifestContext - File manifest context.
 * @returns file manifest state.
 */
function fileManifestReducer(
  state: FileManifestState,
  action: FileManifestAction,
  fileManifestContext: FileManifestContext
): FileManifestState {
  const { payload, type } = action;
  const { catalog, URL } = fileManifestContext;
  switch (type) {
    // Resets file manifest.
    case FileManifestActionKind.ClearFileManifest: {
      return {
        ...state,
        fileManifestFormat: undefined,
        isEnabled: false,
        requestParams: undefined,
        requestURL: undefined,
      };
    }
    // Fetches file manifest.
    case FileManifestActionKind.FetchFileManifest: {
      // Get file summary filters.
      const fileSummaryFilters = buildNextFileSummaryFilterState(
        payload.filters,
        payload.fileSummaryFacetName
      );
      // Build request params and request URL.
      const { requestParams, requestURL } =
        buildFileManifestRequestURL(
          URL,
          payload.filters,
          catalog,
          payload.fileManifestFormat
        ) || {};
      return {
        ...state,
        ...payload,
        fileSummaryFilters,
        isEnabled: true,
        requestParams,
        requestURL,
      };
    }
    // Updates file manifest.
    case FileManifestActionKind.UpdateFileManifest: {
      return {
        ...state,
        ...payload,
      };
    }
    // Updates file manifest format.
    case FileManifestActionKind.UpdateFileManifestFormat: {
      // Build request params and request URL.
      const { requestParams, requestURL } =
        buildFileManifestRequestURL(URL, state.filters, catalog, payload) || {};
      return {
        ...state,
        fileManifestFormat: payload,
        requestParams,
        requestURL,
      };
    }
    // Updates selected file manifest filters with given selected category value.
    case FileManifestActionKind.UpdateFilter: {
      // Build next filter state.
      const filters = buildNextFilterState(
        state.filters,
        payload.categoryKey,
        getFilterParameterValue(payload.selectedValue) as unknown as string, // TODO CategoryValueKey may be boolean or null.
        payload.selected
      );
      // Get file summary filters.
      const fileSummaryFilters = buildNextFileSummaryFilterState(
        filters,
        state.fileSummaryFacetName
      );
      // Build request params and request URL.
      const { requestParams, requestURL } =
        buildFileManifestRequestURL(
          URL,
          filters,
          catalog,
          state.fileManifestFormat
        ) || {};
      return {
        ...state,
        fileSummaryFilters,
        filters,
        requestParams,
        requestURL,
      };
    }
    // Updates selected file manifest filters by category.
    case FileManifestActionKind.UpdateFiltersCategory: {
      // Build next filter state.
      const filters = updateCategoryFilterState(
        state.filters,
        payload,
        state.filesFacets
      );
      // Get file summary filters.
      const fileSummaryFilters = buildNextFileSummaryFilterState(
        filters,
        state.fileSummaryFacetName
      );
      // Build request params and request URL.
      const { requestParams, requestURL } =
        buildFileManifestRequestURL(
          URL,
          filters,
          catalog,
          state.fileManifestFormat
        ) || {};
      return {
        ...state,
        fileSummaryFilters,
        filters,
        requestParams,
        requestURL,
      };
    }
    default:
      return state;
  }
}

/**
 * Returns the file summary filters; comprising selected facets except any of the given facet name.
 * @param filters - Current set of selected category and category values.
 * @param facetName - Name of facet to exclude from file summary filters.
 * @returns file summary filters.
 */
function buildNextFileSummaryFilterState(
  filters: Filters,
  facetName?: string
): Filters {
  if (!facetName) {
    return [];
  }
  return filters.filter(({ categoryKey }) => categoryKey !== facetName);
}

/**
 * Returns all terms for the given category.
 * @param fileFacet - File facet.
 * @returns all terms for the given category.
 */
function getFileFacetTerms(fileFacet: FileFacet): SelectedFilterValue {
  return fileFacet.terms.map(
    (term) => getFilterParameterValue(term.name) as unknown as string // TODO CategoryValueKey may be boolean or null.
  );
}

/**
 * Build new set of selected filters on de/select of filter category.
 * @param filters - Current set of selected category and category values.
 * @param categoryKey - Key of category that has been de/selected.
 * @param filesFacets - File facets.
 * @returns New filter state generated from the current set of selected values and the newly selected category.
 */
function updateCategoryFilterState(
  filters: Filters,
  categoryKey: CategoryKey,
  filesFacets: FileFacet[]
): Filters {
  // Find the selected category facet.
  const categoryFacet = filesFacets.find(({ name }) => name === categoryKey);

  if (!categoryFacet) {
    return filters;
  }

  const { selectedTermCount, termCount } = categoryFacet;

  // Create a copy of the current filter state. Remove the selected filter for the selected category, if any.
  const nextFilterState = filters.filter(
    ({ categoryKey: key }) => key !== categoryKey
  );

  // If the selected category already has all selected values, return the next filter state with removed selected category.
  if (selectedTermCount === termCount) {
    return nextFilterState;
  }

  // Create new selected filter for this category.
  const nextCategorySelectedFilter = {
    categoryKey,
    value: getFileFacetTerms(categoryFacet),
  };

  nextFilterState.push(nextCategorySelectedFilter);

  return nextFilterState;
}
