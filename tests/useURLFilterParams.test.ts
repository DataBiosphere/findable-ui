import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import type { SelectedFilter } from "../src/common/entities";

const FILTER_STATE: SelectedFilter[] = [
  { categoryKey: "species", value: ["dog"] },
];

const FILTER_PARAM = JSON.stringify(FILTER_STATE);

const push = jest.fn();

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ basePath: "", push })),
}));

const { useURLFilterParams } = await import("../src/hooks/useURLFilterParams");

/**
 * Sets the browser URL.
 * @param url - Path and search string, e.g. "/projects?catalog=dcp2".
 */
function setLocation(url: string): void {
  window.history.replaceState(null, "", url);
}

beforeEach(() => {
  push.mockClear();
});

describe("useURLFilterParams", () => {
  it("pushes the catalog and the filters to the URL", () => {
    setLocation("/projects");
    const { result } = renderHook(useURLFilterParams);

    result.current.updateFilterQueryString("dcp2", FILTER_STATE);

    expect(push).toHaveBeenCalledWith(
      {
        pathname: "/projects",
        query: { catalog: "dcp2", filter: FILTER_PARAM },
      },
      undefined,
      { shallow: true },
    );
  });

  it("leaves the URL alone when it already has the catalog and the filters", () => {
    setLocation(
      `/projects?catalog=dcp2&filter=${encodeURIComponent(FILTER_PARAM)}`,
    );
    const { result } = renderHook(useURLFilterParams);

    result.current.updateFilterQueryString("dcp2", FILTER_STATE);

    expect(push).not.toHaveBeenCalled();
  });
});
