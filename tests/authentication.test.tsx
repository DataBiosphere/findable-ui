import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const PUBLIC_PATH = "/requesting-elevated-permissions";
const CUSTOM_SIGNIN_PATH = "/";

let mockAsPath = "/";

jest.unstable_mockModule("next/router", () => {
  const push = jest.fn(async (): Promise<boolean> => true);
  return {
    ...jest.requireActual<typeof import("next/router")>("next/router"),
    default: { push },
    useRouter: jest.fn(() => ({ asPath: mockAsPath, push })),
  };
});
jest.unstable_mockModule(
  "../src/hooks/authentication/profile/useProfile",
  () => ({
    useProfile: jest.fn(() => ({ isLoading: false, profile: undefined })),
  }),
);

const Router = (await import("next/router")).default;
const { Authentication } =
  await import("../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/authentication");
const { ARIA_LABEL } =
  await import("../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/constants");

const closeMenu = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockAsPath = "/";
});

describe("Authentication Sign In button", () => {
  test("does not render when authenticationEnabled is falsy", () => {
    const { container } = render(
      <Authentication authenticationEnabled={false} closeMenu={closeMenu} />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("navigates to ROUTE.LOGIN with current asPath as callbackUrl when authenticationEnabled is true", async () => {
    mockAsPath = PUBLIC_PATH;
    render(<Authentication authenticationEnabled closeMenu={closeMenu} />);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(Router.push).toHaveBeenCalledWith({
      pathname: "/login",
      query: { callbackUrl: PUBLIC_PATH },
    });
  });

  test("navigates to the configured signInPath when authenticationEnabled is a string", async () => {
    mockAsPath = PUBLIC_PATH;
    render(
      <Authentication
        authenticationEnabled={CUSTOM_SIGNIN_PATH}
        closeMenu={closeMenu}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(Router.push).toHaveBeenCalledWith({
      pathname: CUSTOM_SIGNIN_PATH,
      query: { callbackUrl: PUBLIC_PATH },
    });
  });

  test("closes the menu after navigating", async () => {
    render(<Authentication authenticationEnabled closeMenu={closeMenu} />);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(closeMenu).toHaveBeenCalledTimes(1);
  });
});

describe("Authentication icon button", () => {
  // The LoginRounded icon is aria-hidden (MUI sets that on every SvgIcon), so
  // the button has no text to fall back on if the name is lost.
  test("names the icon button", () => {
    render(
      <Authentication authenticationEnabled closeMenu={closeMenu} isMenuIn />,
    );
    expect(
      screen.getByRole("button", { name: ARIA_LABEL.SIGN_IN }),
    ).not.toBeNull();
  });

  // The labelled variant carries its own text, so it is named by that.
  test("names the labelled button by its text", () => {
    render(<Authentication authenticationEnabled closeMenu={closeMenu} />);
    expect(screen.getByRole("button", { name: "Sign in" })).not.toBeNull();
  });
});
