import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";

const mockTrack = jest.fn();

jest.unstable_mockModule("../src/common/analytics/analytics", () => ({
  track: mockTrack,
}));

const { useLoginTracking } =
  await import("../src/hooks/authentication/useLoginTracking");

describe("useLoginTracking", () => {
  beforeEach(() => {
    mockTrack.mockReset();
  });

  test("does not fire on initial mount when unauthenticated", () => {
    renderHook(() => useLoginTracking(false));
    expect(mockTrack).not.toHaveBeenCalled();
  });

  test("does not fire on initial mount when already authenticated", () => {
    renderHook(() => useLoginTracking(true));
    expect(mockTrack).not.toHaveBeenCalled();
  });

  test("fires login event on transition from unauthenticated to authenticated", () => {
    const { rerender } = renderHook(
      ({ isAuthenticated }) => useLoginTracking(isAuthenticated),
      { initialProps: { isAuthenticated: false } },
    );
    rerender({ isAuthenticated: true });
    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith("login", { tool_name: "google" });
  });

  test("does not fire on transition from authenticated to unauthenticated", () => {
    const { rerender } = renderHook(
      ({ isAuthenticated }) => useLoginTracking(isAuthenticated),
      { initialProps: { isAuthenticated: true } },
    );
    rerender({ isAuthenticated: false });
    expect(mockTrack).not.toHaveBeenCalled();
  });

  test("fires only once for multiple login transitions", () => {
    const { rerender } = renderHook(
      ({ isAuthenticated }) => useLoginTracking(isAuthenticated),
      { initialProps: { isAuthenticated: false } },
    );
    rerender({ isAuthenticated: true });
    rerender({ isAuthenticated: false });
    rerender({ isAuthenticated: true });
    expect(mockTrack).toHaveBeenCalledTimes(2);
  });
});
