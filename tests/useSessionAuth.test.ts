import { renderHook } from "@testing-library/react";
import { useAuthReducer } from "../src/hooks/authentication/auth/useAuthReducer";
import { useAuthenticationReducer } from "../src/hooks/authentication/authentication/useAuthenticationReducer";
import { useSessionAuth } from "../src/hooks/authentication/session/useSessionAuth";
import {
  AUTH_STATUS,
  AuthState,
} from "../src/providers/authentication/auth/types";
import {
  AUTHENTICATION_STATUS,
  AuthenticationState,
} from "../src/providers/authentication/authentication/types";

describe("useSessionAuth", () => {
  test("auth status SETTLED with no profile", async () => {
    testAuthenticationState(
      {
        profile: undefined,
        status: AUTHENTICATION_STATUS.SETTLED,
      },
      {
        isAuthenticated: false,
        status: AUTH_STATUS.SETTLED,
      }
    );
  });

  test("auth status PENDING with no profile", async () => {
    testAuthenticationState(
      {
        profile: undefined,
        status: AUTHENTICATION_STATUS.PENDING,
      },
      {
        isAuthenticated: false,
        status: AUTH_STATUS.PENDING,
      }
    );
  });

  test("auth status PENDING with profile", async () => {
    testAuthenticationState(
      {
        profile: {
          email: "test@example.com",
          name: "Test",
        },
        status: AUTHENTICATION_STATUS.PENDING,
      },
      {
        isAuthenticated: false,
        status: AUTH_STATUS.PENDING,
      }
    );
  });

  test("auth status SETTLED with profile", async () => {
    testAuthenticationState(
      {
        profile: {
          email: "test@example.com",
          name: "Test",
        },
        status: AUTHENTICATION_STATUS.SETTLED,
      },
      {
        isAuthenticated: true,
        status: AUTH_STATUS.SETTLED,
      }
    );
  });
});

function testAuthenticationState(
  authenticationState: AuthenticationState,
  expectedAuthState: AuthState
): void {
  const { result: authenticationReducerResult } = renderHook(() =>
    useAuthenticationReducer(authenticationState)
  );
  const { result: authReducerResult } = renderHook(() => useAuthReducer());

  renderHook(() =>
    useSessionAuth({
      authReducer: authReducerResult.current,
      authenticationReducer: authenticationReducerResult.current,
    })
  );

  expect(authReducerResult.current.authState).toMatchObject(expectedAuthState);
}
