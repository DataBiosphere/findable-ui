import { jest } from "@jest/globals";
import { Session } from "next-auth";
import { SessionContextValue } from "next-auth/react";
import { AUTH_STATUS } from "../src/auth/types/auth";
import { AUTHENTICATION_STATUS } from "../src/auth/types/authentication";
import { mapAuth, mapAuthentication } from "../src/nextauth/utils";

const TEST_USER = {
  email: "test@example.com",
  image: "https://example.com/image.jpg",
  name: "Test User",
};

const mockUpdate = jest.fn(() =>
  Promise.resolve(null),
) as unknown as SessionContextValue["update"];

const AUTHENTICATED_SESSION: SessionContextValue = {
  data: { expires: "2099-01-01", user: TEST_USER } as Session,
  status: "authenticated",
  update: mockUpdate,
};

const UNAUTHENTICATED_SESSION: SessionContextValue = {
  data: null,
  status: "unauthenticated",
  update: mockUpdate,
};

const LOADING_SESSION: SessionContextValue = {
  data: null,
  status: "loading",
  update: mockUpdate,
};

describe("mapAuth", () => {
  it("maps authenticated session correctly", () => {
    const result = mapAuth(AUTHENTICATED_SESSION);
    expect(result.isAuthenticated).toBe(true);
    expect(result.status).toBe(AUTH_STATUS.SETTLED);
  });

  it("maps unauthenticated session correctly", () => {
    const result = mapAuth(UNAUTHENTICATED_SESSION);
    expect(result.isAuthenticated).toBe(false);
    expect(result.status).toBe(AUTH_STATUS.SETTLED);
  });

  it("maps loading session correctly", () => {
    const result = mapAuth(LOADING_SESSION);
    expect(result.isAuthenticated).toBe(false);
    expect(result.status).toBe(AUTH_STATUS.PENDING);
  });
});

describe("mapAuthentication", () => {
  it("maps authenticated session with profile", () => {
    const result = mapAuthentication(AUTHENTICATED_SESSION);
    expect(result.profile).toEqual({
      email: "test@example.com",
      image: "https://example.com/image.jpg",
      name: "Test User",
    });
    expect(result.status).toBe(AUTHENTICATION_STATUS.SETTLED);
  });

  it("maps unauthenticated session without profile", () => {
    const result = mapAuthentication(UNAUTHENTICATED_SESSION);
    expect(result.profile).toBeUndefined();
    expect(result.status).toBe(AUTHENTICATION_STATUS.SETTLED);
  });

  it("maps loading session without profile", () => {
    const result = mapAuthentication(LOADING_SESSION);
    expect(result.profile).toBeUndefined();
    expect(result.status).toBe(AUTHENTICATION_STATUS.PENDING);
  });

  it("handles session with missing user properties", () => {
    const sessionWithPartialUser: SessionContextValue = {
      data: { expires: "2099-01-01", user: { name: null } } as Session,
      status: "authenticated",
      update: mockUpdate,
    };
    const result = mapAuthentication(sessionWithPartialUser);
    expect(result.profile).toEqual({
      email: "",
      image: "",
      name: "",
    });
  });

  it("handles session with no user", () => {
    const sessionWithNoUser: SessionContextValue = {
      data: { expires: "2099-01-01" } as Session,
      status: "authenticated",
      update: mockUpdate,
    };
    const result = mapAuthentication(sessionWithNoUser);
    expect(result.profile).toBeUndefined();
  });
});
