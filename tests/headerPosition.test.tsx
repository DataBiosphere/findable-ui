import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";

jest.unstable_mockModule("next/navigation", () => ({
  ...jest.requireActual<typeof import("next/navigation")>("next/navigation"),
  usePathname: jest.fn(() => "/"),
}));
jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  default: { push: jest.fn() },
  useRouter: jest.fn(() => ({ asPath: "/", push: jest.fn() })),
}));

const { Header } =
  await import("../src/components/Layout/components/Header/header");
const { createAppTheme } = await import("../src/theme/theme");

describe("Header", () => {
  // The header is in flow, so content follows it at its real height; a fixed
  // header would need every page to be offset by a measured height again.
  it("should render the app bar sticky, not fixed", () => {
    render(
      <ThemeProvider theme={createAppTheme()}>
        <Header logo={null} />
      </ThemeProvider>,
    );
    const header = screen.getByRole("banner");
    expect(header.classList.contains("MuiAppBar-positionSticky")).toBe(true);
    expect(header.classList.contains("MuiAppBar-positionFixed")).toBe(false);
  });
});
