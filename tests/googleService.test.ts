import { jest } from "@jest/globals";
import { resetTokenState, updateToken } from "../src/auth/dispatch/token";
import type { OAuthProvider } from "../src/config/entities";
import { service } from "../src/google/service";
import type { CodeResponse, SessionDispatch } from "../src/google/types";

const PROVIDER_BASE: OAuthProvider = {
  authorization: { params: { scope: "openid email profile" } },
  clientId: "test-client-id",
  icon: null,
  id: "google",
  name: "Google",
  profile: (p) => p,
  userinfo: "https://example.com/userinfo",
};

const AUTHORIZE_URL = "https://service.example.com/user/authorize";

const CODE_RESPONSE: CodeResponse = {
  code: "test-code",
  error: "",
  error_description: "",
  error_uri: "",
  scope: "",
  state: "",
};

type LoginDispatch = Pick<
  SessionDispatch,
  "authDispatch" | "authenticationDispatch" | "tokenDispatch"
>;

const flushPromises = async (): Promise<void> => {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
  }
};

describe("service.login (Google)", () => {
  let initCodeClient: jest.Mock;
  let initTokenClient: jest.Mock;
  let requestCode: jest.Mock;
  let requestAccessToken: jest.Mock;
  let dispatch: LoginDispatch;

  beforeEach(() => {
    requestCode = jest.fn();
    requestAccessToken = jest.fn();
    initCodeClient = jest.fn(() => ({ requestCode }));
    initTokenClient = jest.fn(() => ({ requestAccessToken }));
    dispatch = {
      authDispatch: jest.fn(),
      authenticationDispatch: jest.fn(),
      tokenDispatch: jest.fn(),
    };
    (globalThis as unknown as { google: unknown }).google = {
      accounts: { oauth2: { initCodeClient, initTokenClient } },
    };
  });

  afterEach(() => {
    delete (globalThis as unknown as { google?: unknown }).google;
    delete (globalThis as unknown as { fetch?: unknown }).fetch;
  });

  it("uses the authorization code flow when provider.authorize is set", () => {
    const provider: OAuthProvider = {
      ...PROVIDER_BASE,
      authorize: AUTHORIZE_URL,
    };

    service.login(provider, dispatch);

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
    service.login(PROVIDER_BASE, dispatch);

    expect(initTokenClient).toHaveBeenCalledTimes(1);
    expect(requestAccessToken).toHaveBeenCalledTimes(1);
    expect(initCodeClient).not.toHaveBeenCalled();
    expect(requestCode).not.toHaveBeenCalled();
  });

  it("exchanges the authorization code at provider.authorize and dispatches updateToken", async () => {
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ access_token: "fake-access-token" }),
        ok: true,
      } as Response),
    );
    (globalThis as unknown as { fetch: typeof fetch }).fetch =
      fetchMock as unknown as typeof fetch;

    const provider: OAuthProvider = {
      ...PROVIDER_BASE,
      authorize: AUTHORIZE_URL,
    };
    service.login(provider, dispatch);

    const config = initCodeClient.mock.calls[0]?.[0] as {
      callback: (response: CodeResponse) => void;
    };
    config.callback(CODE_RESPONSE);
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledWith(AUTHORIZE_URL, {
      body: JSON.stringify(CODE_RESPONSE),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    expect(dispatch.tokenDispatch).toHaveBeenCalledWith(
      updateToken({ providerId: "google", token: "fake-access-token" }),
    );
  });

  it("resets session state when the authorize request returns a non-ok response", async () => {
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: false,
        status: 500,
      } as Response),
    );
    (globalThis as unknown as { fetch: typeof fetch }).fetch =
      fetchMock as unknown as typeof fetch;

    const provider: OAuthProvider = {
      ...PROVIDER_BASE,
      authorize: AUTHORIZE_URL,
    };
    service.login(provider, dispatch);

    const config = initCodeClient.mock.calls[0]?.[0] as {
      callback: (response: CodeResponse) => void;
    };
    config.callback(CODE_RESPONSE);
    await flushPromises();

    expect(dispatch.tokenDispatch).toHaveBeenCalledWith(resetTokenState());
    expect(dispatch.tokenDispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({ token: expect.any(String) }),
      }),
    );
  });

  it("resets session state when the authorize response is missing access_token", async () => {
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
      } as Response),
    );
    (globalThis as unknown as { fetch: typeof fetch }).fetch =
      fetchMock as unknown as typeof fetch;

    const provider: OAuthProvider = {
      ...PROVIDER_BASE,
      authorize: AUTHORIZE_URL,
    };
    service.login(provider, dispatch);

    const config = initCodeClient.mock.calls[0]?.[0] as {
      callback: (response: CodeResponse) => void;
    };
    config.callback(CODE_RESPONSE);
    await flushPromises();

    expect(dispatch.tokenDispatch).toHaveBeenCalledWith(resetTokenState());
  });
});
