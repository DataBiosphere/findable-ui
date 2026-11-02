import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Slogan } from "../src/components/Layout/components/Header/components/Content/components/Slogan/slogan";
import { createAppTheme } from "../src/theme/theme";

const SLOGAN = "Slogan";
const TEST_ID = "navigation";

// navigation.tsx and the menu's navigation styles import each other (via
// NavigationDrawer), and the styles call styled(Navigation) at load time.
// Load the menu first, as header.tsx does, so Navigation is defined by then.
await import("../src/components/Layout/components/Header/components/Content/components/Actions/components/Menu/menu");

const { Navigation } =
  await import("../src/components/Layout/components/Header/components/Content/components/Navigation/navigation");

describe("Header Navigation ref", () => {
  // React 19 passes ref as a regular prop, so with forwardRef removed the ref
  // must still reach the navigation element.
  it("should forward ref to the navigation element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Navigation links={[]} ref={ref} testId={TEST_ID} />);
    expect(ref.current).toBe(screen.getByTestId(TEST_ID));
  });
});

describe("Header Slogan ref", () => {
  // The ref lands on the slogan container, not the slogan text inside it.
  it("should forward ref to the slogan container element", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ThemeProvider theme={createAppTheme()}>
        <Slogan ref={ref} slogan={SLOGAN} />
      </ThemeProvider>,
    );
    expect(ref.current).toBe(screen.getByText(SLOGAN).parentElement);
  });
});
