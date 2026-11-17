import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { NextRouter } from "next/router";
import type { JSX, ReactNode } from "react";

const ROUTER = {
  isReady: true,
  query: {} as NextRouter["query"],
};

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ROUTER),
}));
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    config: {
      entities: [
        { route: "datasets" },
        { route: "files" },
        { route: "projects" },
      ],
    },
  })),
}));

const { ExploreOriginProvider } =
  await import("../src/providers/exploreOrigin/provider");
const { useExploreOrigin, useOptionalExploreOrigin } =
  await import("../src/providers/exploreOrigin/hook");
const { useSetExploreOrigin } =
  await import("../src/providers/exploreOrigin/hooks/UseSetExploreOrigin/hook");

/**
 * Wraps a hook in an ExploreOriginProvider.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns The wrapped children.
 */
function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  return <ExploreOriginProvider>{children}</ExploreOriginProvider>;
}

/**
 * Sets the browser URL's search string.
 * @param search - Search string, e.g. "?from=files".
 */
function setLocationSearch(search: string): void {
  window.history.replaceState(null, "", `/${search}`);
}

beforeEach(() => {
  ROUTER.isReady = true;
  ROUTER.query = {};
  setLocationSearch("");
});

describe("ExploreOriginProvider", () => {
  it("starts from the first configured entity when the URL has no from", () => {
    const { result } = renderHook(useExploreOrigin, { wrapper: Wrapper });

    expect(result.current).toBe("datasets");
  });

  it("starts from the browser URL's from before the router has it", () => {
    setLocationSearch("?from=files");

    const { result } = renderHook(useExploreOrigin, { wrapper: Wrapper });

    expect(result.current).toBe("files");
  });

  it("ignores a from that names no configured entity", () => {
    setLocationSearch("?from=not-an-entity");
    ROUTER.query = { from: "not-an-entity" };

    const { result } = renderHook(useExploreOrigin, { wrapper: Wrapper });

    expect(result.current).toBe("datasets");
  });

  it("ignores a repeated from", () => {
    setLocationSearch("?from=files&from=projects");
    ROUTER.query = { from: ["files", "projects"] };

    const { result } = renderHook(useExploreOrigin, { wrapper: Wrapper });

    expect(result.current).toBe("datasets");
  });

  it("follows a change to a valid from", () => {
    ROUTER.query = { from: "files" };
    const { rerender, result } = renderHook(useExploreOrigin, {
      wrapper: Wrapper,
    });
    expect(result.current).toBe("files");

    ROUTER.query = { from: "projects" };
    rerender();

    expect(result.current).toBe("projects");
  });

  it("keeps the explore origin when a later URL has no from", () => {
    ROUTER.query = { from: "files" };
    const { rerender, result } = renderHook(useExploreOrigin, {
      wrapper: Wrapper,
    });

    ROUTER.query = {};
    rerender();

    expect(result.current).toBe("files");
  });

  it("takes the explore page's entity list type, over a from left in the URL", () => {
    ROUTER.query = { from: "files" };

    const { result } = renderHook(
      () => {
        useSetExploreOrigin("projects");
        return useExploreOrigin();
      },
      { wrapper: Wrapper },
    );

    expect(result.current).toBe("projects");
  });

  it("keeps the explore page's entity list type when the router becomes ready with a from left in the URL", () => {
    setLocationSearch("?from=files");
    ROUTER.isReady = false;
    const { rerender, result } = renderHook(
      () => {
        useSetExploreOrigin("projects");
        return useExploreOrigin();
      },
      { wrapper: Wrapper },
    );
    expect(result.current).toBe("projects");

    ROUTER.isReady = true;
    ROUTER.query = { from: "files" };
    rerender();

    expect(result.current).toBe("projects");
  });

  it("follows the explore page when the user moves between explore pages", () => {
    const { rerender, result } = renderHook(
      ({ entityListType }) => {
        useSetExploreOrigin(entityListType);
        return useExploreOrigin();
      },
      { initialProps: { entityListType: "files" }, wrapper: Wrapper },
    );
    expect(result.current).toBe("files");

    act(() => rerender({ entityListType: "projects" }));

    expect(result.current).toBe("projects");
  });
});

describe("explore origin hooks without ExploreOriginProvider", () => {
  it("useExploreOrigin throws an error naming ExploreOriginProvider", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(useExploreOrigin)).toThrow("ExploreOriginProvider");

    jest.mocked(console.error).mockRestore();
  });

  it("useOptionalExploreOrigin returns undefined", () => {
    const { result } = renderHook(useOptionalExploreOrigin);

    expect(result.current).toBeUndefined();
  });

  it("useSetExploreOrigin does nothing", () => {
    expect(() => renderHook(() => useSetExploreOrigin("files"))).not.toThrow();
  });
});
