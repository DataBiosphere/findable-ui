import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import type { NextRouter } from "next/router";
import type { JSX, ReactNode } from "react";
import type { SelectedFilter } from "../src/common/entities";

const FILTER_STATE: SelectedFilter[] = [
  { categoryKey: "species", value: ["dog"] },
];

const replace = jest.fn();

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

const { CatalogProvider } = await import("../src/providers/catalog/provider");
const { ExploreOriginProvider } =
  await import("../src/providers/exploreOrigin/provider");
const { useUpdateURLParams } =
  await import("../src/hooks/useUpdateURLParams/hook");

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
      <ExploreOriginProvider
        allowedOrigins={["projects", "files"]}
        initialOrigin="projects"
      >
        {children}
      </ExploreOriginProvider>
    </CatalogProvider>
  );
}

beforeEach(() => {
  replace.mockClear();
  ROUTER.isReady = true;
  ROUTER.query = {};
});

describe("useUpdateURLParams", () => {
  it("puts the selected catalog and the explore origin back into a URL that lacks them, in one replace", () => {
    ROUTER.query = {
      catalog: "dcp2",
      entityListType: "projects",
      list: "files",
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
          list: "files",
          params: ["uuid"],
        },
      },
      undefined,
      { shallow: true },
    );
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
        query: { entityListType: "projects", list: "projects" },
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

describe("useUpdateURLParams with filters", () => {
  it("puts the filters into the URL with the catalog and explore origin, keeping the URL's other params", () => {
    ROUTER.query = { catalog: "dcp2", list: "files", other: "kept" };

    renderHook(() => useUpdateURLParams(FILTER_STATE), { wrapper: Wrapper });

    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith(
      {
        pathname: ROUTER.pathname,
        query: {
          catalog: "dcp2",
          filter: JSON.stringify(FILTER_STATE),
          list: "files",
          other: "kept",
        },
      },
      undefined,
      { shallow: true },
    );
  });

  it("leaves a URL whose filters already match alone", () => {
    ROUTER.query = {
      catalog: "dcp2",
      filter: JSON.stringify(FILTER_STATE),
      list: "files",
    };

    renderHook(() => useUpdateURLParams(FILTER_STATE), { wrapper: Wrapper });

    expect(replace).not.toHaveBeenCalled();
  });

  it("leaves an empty filter state out of the URL", () => {
    ROUTER.query = { list: "files" };

    renderHook(() => useUpdateURLParams([]), { wrapper: Wrapper });

    expect(replace).not.toHaveBeenCalled();
  });
});
