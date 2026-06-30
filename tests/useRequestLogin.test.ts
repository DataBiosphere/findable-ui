import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { AuthContextProps } from "../src/auth/types/auth";

const mockRequestLogin = jest.fn();
// The auth service the mocked useAuth returns; reset per test, set to undefined
// to simulate rendering outside an auth provider.
let mockService: { requestLogin: typeof mockRequestLogin } | undefined;

jest.unstable_mockModule("../src/auth/hooks/useAuth", () => ({
  useAuth: (): AuthContextProps =>
    ({ service: mockService }) as unknown as AuthContextProps,
}));

const { useRequestLogin } =
  await import("../src/components/Login/hooks/useRequestLogin/useRequestLogin");

describe("useRequestLogin", () => {
  beforeEach(() => {
    mockRequestLogin.mockReset();
    mockService = { requestLogin: mockRequestLogin };
  });

  test("submits to the auth service and tracks the in-flight provider", () => {
    const { result } = renderHook(() => useRequestLogin());

    expect(result.current.submittingProviderId).toBeNull();

    act(() => result.current.submit("google"));

    expect(mockRequestLogin).toHaveBeenCalledTimes(1);
    expect(mockRequestLogin).toHaveBeenCalledWith("google");
    expect(result.current.submittingProviderId).toBe("google");
  });

  test("ignores re-submission while a login is in flight (double-submit guard)", () => {
    const { result } = renderHook(() => useRequestLogin());

    act(() => result.current.submit("google"));
    act(() => result.current.submit("google")); // same provider, double-tap
    act(() => result.current.submit("github")); // different provider while in flight

    expect(mockRequestLogin).toHaveBeenCalledTimes(1);
    expect(result.current.submittingProviderId).toBe("google");
  });

  test("blocks a second synchronous submit in the same tick (ref guard)", () => {
    const { result } = renderHook(() => useRequestLogin());

    // Two clicks fired in one tick, before React commits the state update and
    // the DOM `disabled` can block the second. The ref-backed guard must still
    // catch this.
    act(() => {
      result.current.submit("google");
      result.current.submit("google");
    });

    expect(mockRequestLogin).toHaveBeenCalledTimes(1);
    expect(result.current.submittingProviderId).toBe("google");
  });

  test("resets the in-flight provider when the window regains focus", () => {
    const { result } = renderHook(() => useRequestLogin());

    act(() => result.current.submit("google"));
    expect(result.current.submittingProviderId).toBe("google");

    // Window focus = popup closed/cancelled; buttons re-enable.
    act(() => {
      window.dispatchEvent(new Event("focus"));
    });
    expect(result.current.submittingProviderId).toBeNull();

    // A fresh submission is accepted after the reset.
    act(() => result.current.submit("google"));
    expect(mockRequestLogin).toHaveBeenCalledTimes(2);
  });

  test("resets the in-flight provider and rethrows on a synchronous failure", () => {
    mockRequestLogin.mockImplementation(() => {
      throw new Error("GIS script not loaded");
    });
    const { result } = renderHook(() => useRequestLogin());

    act(() => {
      expect(() => result.current.submit("google")).toThrow(
        "GIS script not loaded",
      );
    });

    expect(result.current.submittingProviderId).toBeNull();
  });

  test("is a no-op when no auth service is wired", () => {
    mockService = undefined;
    const { result } = renderHook(() => useRequestLogin());

    act(() => result.current.submit("google"));

    expect(result.current.submittingProviderId).toBeNull();
  });
});
