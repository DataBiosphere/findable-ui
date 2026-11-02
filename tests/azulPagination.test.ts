import { AzulPaginationResponse } from "../src/apis/azul/common/entities";
import { transformAzulPagination } from "../src/apis/azul/common/filterTransformer";
import {
  ExploreState,
  PaginationIndex,
  PaginationState,
} from "../src/providers/exploreState";
import { urlToStateAction } from "../src/providers/exploreState/actions/urlToState/action";
import { DEFAULT_PAGINATION_STATE } from "../src/providers/exploreState/initializer/constants";
import { paginate } from "../src/providers/exploreState/utils";

const NEXT_URL =
  "https://service.azul.data/index/projects?catalog=dcp1&filters=%7B%7D&size=25&sort=projectTitle&order=asc&search_after=Brain&search_after_uid=doc%23a";
const PREVIOUS_URL =
  "https://service.azul.data/index/projects?catalog=dcp1&filters=%7B%7D&size=25&sort=projectTitle&order=asc&search_before=Atlas&search_before_uid=doc%23b";

const AZUL_PAGINATION: AzulPaginationResponse = {
  count: 25,
  next: NEXT_URL,
  pages: 4,
  previous: PREVIOUS_URL,
  size: 25,
  total: 90,
};

const NEXT_INDEX: PaginationIndex = {
  type: "search_after",
  url: NEXT_URL,
  value: "Brain",
};

const PREVIOUS_INDEX: PaginationIndex = {
  type: "search_before",
  url: PREVIOUS_URL,
  value: "Atlas",
};

const PAGE_2: PaginationState = {
  ...DEFAULT_PAGINATION_STATE,
  currentPage: 2,
  index: NEXT_INDEX,
  nextIndex: NEXT_INDEX,
  pages: 4,
  previousIndex: PREVIOUS_INDEX,
};

/**
 * Creates a minimal ExploreState for paging.
 * @param paginationState - Pagination state.
 * @param loading - Whether a request is pending.
 * @returns Minimal ExploreState.
 */
function makeState(
  paginationState: PaginationState,
  loading = false,
): ExploreState {
  return {
    catalogState: "dcp1",
    entities: {
      files: { entityKey: "files", query: {} },
      projects: { entityKey: "projects", query: {} },
    },
    entityPageState: {
      files: { categoryGroupConfigKey: "files" },
      projects: { categoryGroupConfigKey: "projects" },
    },
    entityStateByCategoryGroupConfigKey: new Map(),
    filterState: [],
    loading,
    paginationState,
    tabValue: "projects",
  } as unknown as ExploreState;
}

describe("transformAzulPagination", () => {
  it("keeps the next and previous links intact", () => {
    const result = transformAzulPagination(AZUL_PAGINATION);
    expect(result.nextIndex).toEqual(NEXT_INDEX);
    expect(result.previousIndex).toEqual(PREVIOUS_INDEX);
  });

  it("gives no index for a missing link", () => {
    const result = transformAzulPagination({
      ...AZUL_PAGINATION,
      next: undefined,
      previous: undefined,
    });
    expect(result.nextIndex).toBeNull();
    expect(result.previousIndex).toBeNull();
  });

  it("gives an empty response without pagination", () => {
    expect(transformAzulPagination(undefined)).toEqual({
      nextIndex: null,
      pageSize: 0,
      pages: 0,
      previousIndex: null,
      rows: 0,
    });
  });
});

describe("paginate", () => {
  it("moves to the next page, requesting the next link", () => {
    const result = paginate(makeState(PAGE_2), "next");
    expect(result?.currentPage).toBe(3);
    expect(result?.index).toBe(NEXT_INDEX);
  });

  it("moves to the previous page, requesting the previous link", () => {
    const result = paginate(makeState(PAGE_2), "prev");
    expect(result?.currentPage).toBe(1);
    expect(result?.index).toBe(PREVIOUS_INDEX);
  });

  // While a request is pending, the links are from the previous result set.
  it("does not move while a request is pending", () => {
    expect(paginate(makeState(PAGE_2, true), "next")).toBeUndefined();
    expect(paginate(makeState(PAGE_2, true), "prev")).toBeUndefined();
  });

  it("does not move without a link", () => {
    const state = makeState({
      ...PAGE_2,
      nextIndex: null,
      previousIndex: null,
    });
    expect(paginate(state, "next")).toBeUndefined();
    expect(paginate(state, "prev")).toBeUndefined();
  });
});

describe("urlToStateAction", () => {
  // E.g. back/forward navigation to other filters while on a later page.
  it("returns to the first page, with no pagination link", () => {
    const result = urlToStateAction(makeState(PAGE_2), {
      query: { entityListType: "projects", filter: "[]" },
    });
    expect(result.paginationState.currentPage).toBe(1);
    expect(result.paginationState.index).toBeNull();
  });

  // Selecting the other entity resets the page itself.
  it("leaves the page alone for another entity", () => {
    const result = urlToStateAction(makeState(PAGE_2), {
      query: { entityListType: "files", filter: "[]" },
    });
    expect(result.paginationState).toBe(PAGE_2);
  });
});
