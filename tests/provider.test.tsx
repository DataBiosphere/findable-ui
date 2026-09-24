import { jest } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import { JSX, useContext } from "react";
import { LoginGuardContext } from "../src/providers/loginGuard/context";

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(),
}));

jest.unstable_mockModule("../src/auth/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.unstable_mockModule(
  "../src/hooks/authentication/config/useAuthenticationConfig",
  () => ({
    useAuthenticationConfig: jest.fn(),
  }),
);

jest.unstable_mockModule("../src/hooks/authentication/token/useToken", () => ({
  useToken: jest.fn(),
}));

const TEST_ID_LOGIN_DIALOG = "login-dialog";
const TEXT_DIALOG_CLOSED = "closed";
const TEXT_DIALOG_OPEN = "open";
jest.unstable_mockModule(
  "../src/components/common/LoginDialog/loginDialog",
  () => ({
    LoginDialog: ({ open }: { open: boolean }): JSX.Element => (
      <div data-testid={TEST_ID_LOGIN_DIALOG}>
        {open ? TEXT_DIALOG_OPEN : TEXT_DIALOG_CLOSED}
      </div>
    ),
  }),
);

const { useConfig } = await import("../src/hooks/useConfig");
const { useAuth } = await import("../src/auth/hooks/useAuth");
const { useAuthenticationConfig } =
  await import("../src/hooks/authentication/config/useAuthenticationConfig");
const { useToken } = await import("../src/hooks/authentication/token/useToken");
const { useRequestFileLocation } =
  await import("../src/hooks/useRequestFileLocation");
const { withTokenRequirement } =
  await import("../src/providers/loginGuard/common/types");

const { LoginGuardProvider } =
  await import("../src/providers/loginGuard/provider");

const TEXT_BUTTON_EXPORT = "export";
const TEXT_BUTTON_FIRST = "first";
const TEXT_BUTTON_SECOND = "second";
const REQUEST_URL = "https://example.com/file-location";
const RESPONSE_URL = "https://example.com/download";
const originalFetch = global.fetch;

describe("LoginGuardProvider", () => {
  beforeEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    global.fetch = originalFetch;
    // Mock hooks used by login guard.
    (useConfig as jest.Mock).mockReturnValue({
      config: {
        exportsRequireAuth: true,
      },
    });
    (useAuth as jest.Mock).mockReturnValue({
      authState: {
        isAuthenticated: false,
      },
    });
    (useAuthenticationConfig as jest.Mock).mockReturnValue({});
    (useToken as jest.Mock).mockReturnValue({ token: undefined });
  });

  afterEach(() => {
    jest.useRealTimers();
    global.fetch = originalFetch;
  });

  it("should render children and login dialog closed", () => {
    render(
      <LoginGuardProvider>
        <div data-testid="child">child component</div>
      </LoginGuardProvider>,
    );

    expect(screen.getByTestId("child")).toBeTruthy();
    expect(screen.getByTestId(TEST_ID_LOGIN_DIALOG).textContent).toBe(
      TEXT_DIALOG_CLOSED,
    );
  });

  it("calls callback immediately if user is authenticated", () => {
    const callback = jest.fn();

    // Simulate user authentication.
    (useAuth as jest.Mock).mockReturnValue({
      authState: { isAuthenticated: true },
    });

    render(
      <LoginGuardProvider>
        <LoginGuardContext.Consumer>
          {({ requireLogin }) => (
            <button onClick={() => requireLogin(callback)}>
              {TEXT_BUTTON_EXPORT}
            </button>
          )}
        </LoginGuardContext.Consumer>
      </LoginGuardProvider>,
    );

    // Click button requiring login.
    act(() => {
      screen.getByText(TEXT_BUTTON_EXPORT).click();
    });

    // User is authenticated; callback should be fired immediately.
    expect(callback).toHaveBeenCalled();

    // Login dialog should not be open.
    expect(screen.getByTestId(TEST_ID_LOGIN_DIALOG).textContent).toBe(
      TEXT_DIALOG_CLOSED,
    );
  });

  it("calls callback immediately if exportsRequireAuth is false", () => {
    const callback = jest.fn();

    // Simulate exportsRequireAuth being false.
    (useConfig as jest.Mock).mockReturnValue({
      config: {
        exportsRequireAuth: false,
      },
    });

    render(
      <LoginGuardProvider>
        <LoginGuardContext.Consumer>
          {({ requireLogin }) => (
            <button onClick={() => requireLogin(callback)}>
              {TEXT_BUTTON_EXPORT}
            </button>
          )}
        </LoginGuardContext.Consumer>
      </LoginGuardProvider>,
    );

    // Click button requiring login.
    act(() => {
      screen.getByText(TEXT_BUTTON_EXPORT).click();
    });

    // exportsRequireAuth is false; callback should be fired immediately.
    expect(callback).toHaveBeenCalled();

    // Login dialog should not be open.
    expect(screen.getByTestId(TEST_ID_LOGIN_DIALOG).textContent).toBe(
      TEXT_DIALOG_CLOSED,
    );
  });

  it("calls a token-required callback immediately if exportsRequireAuth is false", () => {
    const callback = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      authState: { isAuthenticated: true },
    });
    (useConfig as jest.Mock).mockReturnValue({
      config: {
        exportsRequireAuth: false,
      },
    });

    render(
      <LoginGuardProvider>
        <LoginGuardContext.Consumer>
          {({ requireLogin }) => (
            <button
              onClick={() => requireLogin(withTokenRequirement(callback))}
            >
              {TEXT_BUTTON_EXPORT}
            </button>
          )}
        </LoginGuardContext.Consumer>
      </LoginGuardProvider>,
    );

    act(() => {
      screen.getByText(TEXT_BUTTON_EXPORT).click();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should call callback after user authenticates", async () => {
    const callback = jest.fn();

    const { rerender } = render(
      <LoginGuardProvider>
        <LoginGuardContext.Consumer>
          {({ requireLogin }) => (
            <button onClick={() => requireLogin(callback)}>
              {TEXT_BUTTON_EXPORT}
            </button>
          )}
        </LoginGuardContext.Consumer>
      </LoginGuardProvider>,
    );

    // Click button requiring login.
    act(() => {
      screen.getByText(TEXT_BUTTON_EXPORT).click();
    });

    // User is not authenticated; callback should not have been called.
    expect(callback).not.toHaveBeenCalled();

    // User is not authenticated; login dialog should be open.
    expect(screen.getByTestId(TEST_ID_LOGIN_DIALOG).textContent).toBe(
      TEXT_DIALOG_OPEN,
    );

    // Simulate user authentication.
    await act(async () => {
      (useAuth as jest.Mock).mockReturnValue({
        authState: { isAuthenticated: true },
      });
    });

    // Rerender to trigger useEffect.
    rerender(
      <LoginGuardProvider>
        <div />
      </LoginGuardProvider>,
    );

    // Callback should be called (in useEffect called on re-render).
    expect(callback).toHaveBeenCalled();
  });

  it("uses the refreshed token for a deferred request after auth and token resolve in separate renders", async () => {
    jest.useFakeTimers();
    const fetchMock = jest.fn().mockResolvedValue(createFileLocationResponse());
    global.fetch = fetchMock as typeof fetch;

    const tokenState: { current: string | undefined } = { current: undefined };
    (useToken as jest.Mock).mockImplementation(() => ({
      token: tokenState.current,
    }));

    function DeferredRequestButton(): JSX.Element {
      const { requireLogin } = useContext(LoginGuardContext);
      const { run } = useRequestFileLocation(REQUEST_URL);

      return (
        <button onClick={() => requireLogin(withTokenRequirement(run))}>
          {TEXT_BUTTON_EXPORT}
        </button>
      );
    }

    const { rerender } = render(
      <LoginGuardProvider>
        <DeferredRequestButton />
      </LoginGuardProvider>,
    );

    act(() => {
      screen.getByText(TEXT_BUTTON_EXPORT).click();
    });

    expect(fetchMock).not.toHaveBeenCalled();

    (useAuth as jest.Mock).mockReturnValue({
      authState: { isAuthenticated: true },
    });

    await act(async () => {
      rerender(
        <LoginGuardProvider>
          <DeferredRequestButton />
        </LoginGuardProvider>,
      );
    });

    expect(fetchMock).not.toHaveBeenCalled();

    tokenState.current = "new-token";

    await act(async () => {
      rerender(
        <LoginGuardProvider>
          <DeferredRequestButton />
        </LoginGuardProvider>,
      );
    });

    await act(async () => {
      jest.runOnlyPendingTimers();
      await Promise.resolve();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      REQUEST_URL,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: ["Bearer", tokenState.current].join(" "),
        }),
      }),
    );
  });

  it("uses the latest queued token-required callback when credentials arrive", async () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    const tokenState: { current: string | undefined } = { current: undefined };

    (useAuth as jest.Mock).mockReturnValue({
      authState: { isAuthenticated: true },
    });
    (useToken as jest.Mock).mockImplementation(() => ({
      token: tokenState.current,
    }));

    const { rerender } = render(
      <LoginGuardProvider>
        <LoginGuardContext.Consumer>
          {({ requireLogin }) => (
            <>
              <button
                onClick={() =>
                  requireLogin(withTokenRequirement(firstCallback))
                }
              >
                {TEXT_BUTTON_FIRST}
              </button>
              <button
                onClick={() =>
                  requireLogin(withTokenRequirement(secondCallback))
                }
              >
                {TEXT_BUTTON_SECOND}
              </button>
            </>
          )}
        </LoginGuardContext.Consumer>
      </LoginGuardProvider>,
    );

    act(() => {
      screen.getByText(TEXT_BUTTON_FIRST).click();
      screen.getByText(TEXT_BUTTON_SECOND).click();
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).not.toHaveBeenCalled();

    tokenState.current = "new-token";

    await act(async () => {
      rerender(
        <LoginGuardProvider>
          <div />
        </LoginGuardProvider>,
      );
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });
});

/**
 * Creates a mock file location fetch response.
 * @returns A resolved fetch response with a successful file location payload.
 */
function createFileLocationResponse(): Response {
  return {
    json: async () => ({
      Location: RESPONSE_URL,
      Status: 302,
    }),
  } as Response;
}
