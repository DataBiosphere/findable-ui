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

const EXPLORE_STATE = { filterState: FILTER_STATE };

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  default: { replace },
  useRouter: jest.fn(() => ROUTER),
}));
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    config: { entities: [{ route: "projects" }, { route: "files" }] },
  })),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({ exploreState: EXPLORE_STATE })),
}));
jest.unstable_mockModule("../src/hooks/useURLFilterParams", () => ({
  useURLFilterParams: jest.fn(() => ({ updateFilterQueryString })),
}));

const { CatalogProvider } = await import("../src/providers/catalog/provider");
const { ExploreOriginProvider } =
  await import("../src/providers/exploreOrigin/provider");
const { useUpdateURLParams } = await import("../src/hooks/useUpdateURLParams");
const { useUpdateURLSearchParams } =
  await import("../src/hooks/useUpdateURLSearchParams");

/**
 * Wraps a hook in a CatalogProvider only.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns The wrapped children.
 */
function CatalogWrapper({ children }: { children: ReactNode }): JSX.Element {
  return <CatalogProvider>{children}</CatalogProvider>;
}

/**
 * Wraps a hook in a CatalogProvider and an ExploreOriginProvider.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns The wrapped children.
 */
function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <CatalogProvider>
      <ExploreOriginProvider>{children}</ExploreOriginProvider>
    </CatalogProvider>
  );
}

beforeEach(() => {
  replace.mockClear();
  updateFilterQueryString.mockClear();
  ROUTER.isReady = true;
  ROUTER.query = {};
});

describe("useUpdateURLParams", () => {
  it("puts the selected catalog and the explore origin back into a URL that lacks them, in one replace", () => {
    ROUTER.query = {
      catalog: "dcp2",
      entityListType: "projects",
      from: "files",
    };
    const { rerender } = renderHook(useUpdateURLParams, { wrapper: Wrapper });
    expect(replace).not.toHaveBeenCalled();

    ROUTER.query = { entityListType: "projects", params: ["uuid"] };
    rerender();

    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: {
          catalog: "dcp2",
          entityListType: "projects",
          from: "files",
          params: ["uuid"],
        },
      },
      undefined,
      { shallow: true },
    );
  });

  it("leaves the URL alone on a site with neither provider, e.g. one without a catalog", () => {
    ROUTER.query = { entityListType: "projects", params: ["uuid"] };

    renderHook(useUpdateURLParams);

    expect(replace).not.toHaveBeenCalled();
  });

  it("leaves a URL's catalog alone on a site without a CatalogProvider", () => {
    ROUTER.query = { catalog: "dcp2", entityListType: "projects" };

    renderHook(useUpdateURLParams);

    expect(replace).not.toHaveBeenCalled();
  });

  it("leaves the explore origin alone when no ExploreOriginProvider is mounted", () => {
    ROUTER.query = { entityListType: "projects" };

    renderHook(useUpdateURLParams, { wrapper: CatalogWrapper });

    expect(replace).not.toHaveBeenCalled();
  });

  it("puts back only the explore origin when no catalog is selected", () => {
    ROUTER.query = { entityListType: "projects" };

    renderHook(useUpdateURLParams, { wrapper: Wrapper });

    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: { entityListType: "projects", from: "projects" },
      },
      undefined,
      { shallow: true },
    );
  });

  it("waits for the router to be ready", () => {
    ROUTER.isReady = false;
    ROUTER.query = {};
    const { rerender } = renderHook(useUpdateURLParams, { wrapper: Wrapper });
    expect(replace).not.toHaveBeenCalled();

    ROUTER.isReady = true;
    ROUTER.query = { entityListType: "projects" };
    rerender();

    expect(replace).toHaveBeenCalledTimes(1);
  });
});

describe("useUpdateURLSearchParams", () => {
  it("writes the selected catalog, the explore origin and the filters to the URL", () => {
    ROUTER.query = { catalog: "dcp2", from: "files" };

    renderHook(useUpdateURLSearchParams, { wrapper: Wrapper });

    expect(updateFilterQueryString).toHaveBeenLastCalledWith(
      "dcp2",
      "files",
      FILTER_STATE,
    );
  });

  it("throws without an ExploreOriginProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() =>
      renderHook(useUpdateURLSearchParams, { wrapper: CatalogWrapper }),
    ).toThrow("ExploreOriginProvider");

    jest.mocked(console.error).mockRestore();
  });
});
