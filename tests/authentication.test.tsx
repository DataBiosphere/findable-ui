import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const PUBLIC_PATH = "/requesting-elevated-permissions";
const CUSTOM_SIGNIN_PATH = "/";

let mockAsPath = "/";
let mockPathname = "/";

jest.unstable_mockModule("next/router", () => {
  const push = jest.fn(async (): Promise<boolean> => true);
  return {
    ...jest.requireActual<typeof import("next/router")>("next/router"),
    default: { push },
    useRouter: jest.fn(() => ({ asPath: mockAsPath, push })),
  };
});
jest.unstable_mockModule("next/navigation", () => ({
  ...jest.requireActual<typeof import("next/navigation")>("next/navigation"),
  usePathname: jest.fn(() => mockPathname),
}));
// jsdom has no matchMedia, so no breakpoint resolves and Header renders no
// actions. Pin a desktop breakpoint so the labelled Sign In button renders.
jest.unstable_mockModule("../src/hooks/useBreakpoint", () => ({
  useBreakpoint: jest.fn(() => ({
    breakpoint: "lg",
    lg: true,
    lgDown: false,
    lgUp: true,
    md: false,
    mdDown: false,
    mdUp: true,
    sm: false,
    smDown: false,
    smUp: true,
    xs: false,
    xsDown: false,
    xsUp: true,
  })),
}));
jest.unstable_mockModule(
  "../src/hooks/authentication/profile/useProfile",
  () => ({
    useProfile: jest.fn(() => ({ isLoading: false, profile: undefined })),
  }),
);

const Router = (await import("next/router")).default;
const { Authentication } =
  await import("../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/authentication");
const { createAppTheme } = await import("../src/theme/theme");
const { Header } =
  await import("../src/components/Layout/components/Header/header");
const { navigateToSignIn } =
  await import("../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/utils");
const { ARIA_LABEL } =
  await import("../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/constants");

const closeMenu = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockAsPath = "/";
  mockPathname = "/";
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

describe("navigateToSignIn", () => {
  test("closes the menu and still rejects when navigation fails", async () => {
    const error = new Error("navigation failed");
    jest.mocked(Router.push).mockRejectedValueOnce(error);
    await expect(
      navigateToSignIn(CUSTOM_SIGNIN_PATH, PUBLIC_PATH, closeMenu),
    ).rejects.toBe(error);
    expect(closeMenu).toHaveBeenCalledTimes(1);
  });
});

describe("Authentication Sign In highlight", () => {
  test("highlights the labelled button on the default sign-in route", () => {
    mockPathname = "/login";
    render(<Authentication authenticationEnabled closeMenu={closeMenu} />);
    const button = screen.getByRole("button", { name: "Sign in" });
    expect(button.classList).toContain("MuiButton-activeNav");
  });

  test("highlights the labelled button on a custom sign-in route", () => {
    mockPathname = CUSTOM_SIGNIN_PATH;
    render(
      <Authentication
        authenticationEnabled={CUSTOM_SIGNIN_PATH}
        closeMenu={closeMenu}
      />,
    );
    const button = screen.getByRole("button", { name: "Sign in" });
    expect(button.classList).toContain("MuiButton-activeNav");
  });

  test("does not highlight the labelled button on other routes", () => {
    mockPathname = PUBLIC_PATH;
    render(
      <Authentication
        authenticationEnabled={CUSTOM_SIGNIN_PATH}
        closeMenu={closeMenu}
      />,
    );
    const button = screen.getByRole("button", { name: "Sign in" });
    expect(button.classList).toContain("MuiButton-nav");
    expect(button.classList).not.toContain("MuiButton-activeNav");
  });
});

describe("Authentication button variants", () => {
  /*
   * Both variants are named "Sign in", so the accessible name alone cannot
   * tell them apart. The text node can: the icon variant renders only an
   * aria-hidden icon, while the labelled variant renders visible text.
   */
  test("renders the icon variant when isMenuIn is set", () => {
    render(
      <Authentication authenticationEnabled closeMenu={closeMenu} isMenuIn />,
    );
    const button = screen.getByRole("button", { name: ARIA_LABEL.SIGN_IN });
    expect(button.textContent).toBe("");
  });

  test("renders the labelled variant when isMenuIn is not set", () => {
    render(<Authentication authenticationEnabled closeMenu={closeMenu} />);
    const button = screen.getByRole("button", { name: "Sign in" });
    expect(button.textContent).toContain("Sign in");
  });
});

describe("Authentication in the Header", () => {
  /*
   * A component-type prop created inline in Header would be a new type on
   * every render, so React would unmount and remount the Sign In button each
   * time. The same DOM node across a rerender proves the button is kept.
   */
  test("keeps the same Sign In button across Header re-renders", () => {
    const { rerender } = render(
      <ThemeProvider theme={createAppTheme()}>
        <Header authenticationEnabled logo={null} />
      </ThemeProvider>,
    );
    const button = screen.getByRole("button", { name: "Sign in" });
    rerender(
      <ThemeProvider theme={createAppTheme()}>
        <Header authenticationEnabled logo={null} />
      </ThemeProvider>,
    );
    expect(screen.getByRole("button", { name: "Sign in" })).toBe(button);
  });
});
