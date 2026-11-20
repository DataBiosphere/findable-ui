import { jest } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { EXPLORE_MODE } from "../src/hooks/useExploreMode/types";

const UUID = "entity-uuid";

const fetchEntityDetail = jest.fn(() => Promise.resolve({ id: UUID }));

let catalogParam: string | undefined;

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ query: { params: [UUID] } })),
}));
jest.unstable_mockModule("../src/hooks/authentication/token/useToken", () => ({
  useToken: jest.fn(() => ({ token: undefined })),
}));
jest.unstable_mockModule("../src/hooks/useExploreMode/useExploreMode", () => ({
  useExploreMode: jest.fn(() => EXPLORE_MODE.SS_FETCH_SS_FILTERING),
}));
jest.unstable_mockModule("../src/hooks/useEntityService", () => ({
  useEntityService: jest.fn(() => ({
    catalog: catalogParam,
    fetchEntityDetail,
    path: "projects",
  })),
}));
jest.unstable_mockModule("../src/providers/catalog/hook", () => ({
  useCatalogParam: jest.fn(() => catalogParam),
}));

const { useFetchEntity } = await import("../src/hooks/useFetchEntity");

// A statically built detail page, viewed signed out.
const DETAIL_VIEW_PROPS = { data: { id: UUID }, entityListType: "projects" };

beforeEach(() => {
  catalogParam = undefined;
  fetchEntityDetail.mockClear();
});

describe("useFetchEntity", () => {
  it("fetches the statically built entity again when the URL selects a catalog", async () => {
    catalogParam = "dcp2";

    renderHook(() => useFetchEntity(DETAIL_VIEW_PROPS));

    await waitFor(() =>
      expect(fetchEntityDetail).toHaveBeenCalledWith(
        UUID,
        "projects",
        "dcp2",
        undefined,
        undefined,
      ),
    );
  });

  it("uses the statically built entity when no catalog is selected", () => {
    const { result } = renderHook(() => useFetchEntity(DETAIL_VIEW_PROPS));

    expect(fetchEntityDetail).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});
