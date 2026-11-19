import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import type { NextRouter } from "next/router";
import type { JSX, ReactNode } from "react";
import type { SelectedFilter } from "../src/common/entities";

const FILTER_STATE: SelectedFilter[] = [
  { categoryKey: "species", value: ["dog"] },
];

const replace = jest.fn();
const updateFilterQueryString = jest.fn();

const ROUTER = {
  basePath: "",
  isReady: true,
  pathname: "/[entityListType]/[...params]",
  query: {} as NextRouter["query"],
};

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  default: { replace },
  useRouter: jest.fn(() => ROUTER),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({
    exploreState: { filterState: FILTER_STATE },
  })),
}));
jest.unstable_mockModule("../src/hooks/useURLFilterParams", () => ({
  useURLFilterParams: jest.fn(() => ({ updateFilterQueryString })),
}));

const { CatalogProvider } = await import("../src/providers/catalog/provider");
const { useUpdateURLCatalogParams } =
  await import("../src/hooks/useUpdateURLCatalogParam");
const { useUpdateURLSearchParams } =
  await import("../src/hooks/useUpdateURLSearchParams");

/**
 * Wraps a hook in a CatalogProvider.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns The wrapped children.
 */
function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  return <CatalogProvider>{children}</CatalogProvider>;
}

beforeEach(() => {
  replace.mockClear();
  updateFilterQueryString.mockClear();
  ROUTER.query = {};
});

describe("useUpdateURLCatalogParams", () => {
  it("puts the selected catalog back into a URL that lacks it", () => {
    ROUTER.query = { catalog: "dcp2", entityListType: "projects" };
    const { rerender } = renderHook(useUpdateURLCatalogParams, {
      wrapper: Wrapper,
    });
    expect(replace).not.toHaveBeenCalled();

    ROUTER.query = { entityListType: "projects", params: ["uuid"] };
    rerender();

    expect(replace).toHaveBeenCalledWith({
      pathname: ROUTER.pathname,
      query: { catalog: "dcp2", entityListType: "projects", params: ["uuid"] },
    });
  });

  it("leaves the URL alone when no catalog is selected", () => {
    // An empty param selects no catalog, but isn't missing, so only the no-catalog guard skips the replace.
    ROUTER.query = { catalog: "", entityListType: "projects" };

    renderHook(useUpdateURLCatalogParams, { wrapper: Wrapper });

    expect(replace).not.toHaveBeenCalled();
  });
});

describe("useUpdateURLSearchParams", () => {
  it("writes the selected catalog and the filters to the URL", () => {
    ROUTER.query = { catalog: "dcp2" };

    renderHook(useUpdateURLSearchParams, { wrapper: Wrapper });

    expect(updateFilterQueryString).toHaveBeenCalledWith("dcp2", FILTER_STATE);
  });
});
