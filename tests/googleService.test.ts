import { jest } from "@jest/globals";
import type { OAuthProvider } from "../src/config/entities";
import { service } from "../src/google/service";
import type { SessionDispatch } from "../src/google/types";

const PROVIDER_BASE: OAuthProvider = {
  authorization: { params: { scope: "openid email profile" } },
  clientId: "test-client-id",
  icon: null,
  id: "google",
  name: "Google",
  profile: (p) => p,
  userinfo: "https://example.com/userinfo",
};

const DISPATCH_NO_OPS: Pick<
  SessionDispatch,
  "authDispatch" | "authenticationDispatch" | "tokenDispatch"
> = {
  authDispatch: jest.fn(),
  authenticationDispatch: jest.fn(),
  tokenDispatch: jest.fn(),
};

describe("service.login (Google)", () => {
  let initCodeClient: jest.Mock;
  let initTokenClient: jest.Mock;
  let requestCode: jest.Mock;
  let requestAccessToken: jest.Mock;

  beforeEach(() => {
    requestCode = jest.fn();
    requestAccessToken = jest.fn();
    initCodeClient = jest.fn(() => ({ requestCode }));
    initTokenClient = jest.fn(() => ({ requestAccessToken }));
    (globalThis as unknown as { google: unknown }).google = {
      accounts: { oauth2: { initCodeClient, initTokenClient } },
    };
  });

  afterEach(() => {
    delete (globalThis as unknown as { google?: unknown }).google;
  });

  it("uses the authorization code flow when provider.authorize is set", () => {
    const provider: OAuthProvider = {
      ...PROVIDER_BASE,
      authorize: "https://service.example.com/user/authorize",
    };

    service.login(provider, DISPATCH_NO_OPS);

    expect(initCodeClient).toHaveBeenCalledTimes(1);
    expect(requestCode).toHaveBeenCalledTimes(1);
    expect(initTokenClient).not.toHaveBeenCalled();
    expect(requestAccessToken).not.toHaveBeenCalled();

    const config = initCodeClient.mock.calls[0]?.[0] as {
      client_id: string;
      scope: string;
    };
    expect(config.client_id).toBe(PROVIDER_BASE.clientId);
    expect(config.scope).toBe(PROVIDER_BASE.authorization.params.scope);
  });

  it("falls back to the implicit token flow when provider.authorize is unset", () => {
    service.login(PROVIDER_BASE, DISPATCH_NO_OPS);

    expect(initTokenClient).toHaveBeenCalledTimes(1);
    expect(requestAccessToken).toHaveBeenCalledTimes(1);
    expect(initCodeClient).not.toHaveBeenCalled();
    expect(requestCode).not.toHaveBeenCalled();
  });
});
