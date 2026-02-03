import { jest } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import { JSX } from "react";
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

const { LoginGuardProvider } =
  await import("../src/providers/loginGuard/provider");

const TEXT_BUTTON_EXPORT = "export";

describe("LoginGuardProvider", () => {
  beforeEach(() => {
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
});
