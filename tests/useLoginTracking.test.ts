import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { AUTH_STATUS } from "../src/auth/types/auth";

const mockTrack = jest.fn();

jest.unstable_mockModule("../src/common/analytics/analytics", () => ({
  track: mockTrack,
}));

const { useLoginTracking } =
  await import("../src/hooks/authentication/useLoginTracking");

const SETTLED = AUTH_STATUS.SETTLED;
const PENDING = AUTH_STATUS.PENDING;

describe("useLoginTracking", () => {
  beforeEach(() => {
    mockTrack.mockReset();
  });

  test("does not fire on initial mount when unauthenticated", () => {
    renderHook(() => useLoginTracking(false, SETTLED));
    expect(mockTrack).not.toHaveBeenCalled();
  });

  test("does not fire on initial mount when already authenticated", () => {
    renderHook(() => useLoginTracking(true, SETTLED));
    expect(mockTrack).not.toHaveBeenCalled();
  });

  test("fires login event on transition from unauthenticated to authenticated", () => {
    const { rerender } = renderHook(
      ({ isAuthenticated, status }) =>
        useLoginTracking(isAuthenticated, status),
      { initialProps: { isAuthenticated: false, status: SETTLED } },
    );
    rerender({ isAuthenticated: true, status: SETTLED });
    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith("login", { tool_name: "google" });
  });

  test("does not fire on transition from authenticated to unauthenticated", () => {
    const { rerender } = renderHook(
      ({ isAuthenticated, status }) =>
        useLoginTracking(isAuthenticated, status),
      { initialProps: { isAuthenticated: true, status: SETTLED } },
    );
    rerender({ isAuthenticated: false, status: SETTLED });
    expect(mockTrack).not.toHaveBeenCalled();
  });

  test("fires for each login transition", () => {
    const { rerender } = renderHook(
      ({ isAuthenticated, status }) =>
        useLoginTracking(isAuthenticated, status),
      { initialProps: { isAuthenticated: false, status: SETTLED } },
    );
    rerender({ isAuthenticated: true, status: SETTLED });
    rerender({ isAuthenticated: false, status: SETTLED });
    rerender({ isAuthenticated: true, status: SETTLED });
    expect(mockTrack).toHaveBeenCalledTimes(2);
  });

  test("does not fire during session hydration when status is pending", () => {
    const { rerender } = renderHook(
      ({ isAuthenticated, status }) =>
        useLoginTracking(isAuthenticated, status),
      { initialProps: { isAuthenticated: false, status: PENDING } },
    );
    // Session hydrates: isAuthenticated becomes true while status settles.
    rerender({ isAuthenticated: true, status: SETTLED });
    expect(mockTrack).not.toHaveBeenCalled();
  });
});
