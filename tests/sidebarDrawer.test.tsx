import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { SidebarDrawer } from "../src/components/Layout/components/Sidebar/components/SidebarDrawer/sidebarDrawer";
import { createAppTheme } from "../src/theme/theme";

const DRAWER_ID = "sidebar-drawer-id";

/**
 * Renders the open sidebar drawer.
 * @param id - Id of the drawer surface.
 */
function renderDrawer(id?: string): void {
  render(
    // The drawer's styled paper reads theme breakpoints.
    <ThemeProvider theme={createAppTheme()}>
      <SidebarDrawer id={id} open>
        <div>Sidebar content</div>
      </SidebarDrawer>
    </ThemeProvider>,
  );
}

describe("SidebarDrawer", () => {
  // TemporarySidebar is a MUI Popover, which - unlike Drawer - gives its paper
  // no role of its own, so a trigger declaring aria-haspopup="dialog" would
  // otherwise point at a role-less container.
  it("should render the paper as a modal dialog", () => {
    renderDrawer(DRAWER_ID);
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.contains(screen.getByText("Sidebar content"))).toBe(true);
  });

  // The trigger and the drawer are siblings under one DrawerProvider, so the id
  // comes from the provider; aria-controls has to resolve to the dialog itself.
  it("should carry the given id on the dialog", () => {
    renderDrawer(DRAWER_ID);
    expect(document.getElementById(DRAWER_ID)).toBe(
      screen.getByRole("dialog", { hidden: true }),
    );
  });

  // The drawer's content is consumer-supplied and has no heading of its own, so
  // without an explicit label the dialog is announced unnamed.
  it("should name the dialog", () => {
    renderDrawer(DRAWER_ID);
    expect(
      screen.getByRole("dialog", { hidden: true, name: "Sidebar" }),
    ).toBeTruthy();
  });

  // Outside a DrawerProvider the context default id is "", which must not
  // render as id="" — an invalid attribute value that the earlier `.id === ""`
  // assertion could not distinguish from no attribute at all.
  it("should render no id attribute when no id is given", () => {
    renderDrawer();
    expect(
      screen
        .getByRole("dialog", { hidden: true, name: "Sidebar" })
        .hasAttribute("id"),
    ).toBe(false);
  });

  it("should render no id attribute when the id is blank", () => {
    renderDrawer("");
    expect(
      screen
        .getByRole("dialog", { hidden: true, name: "Sidebar" })
        .hasAttribute("id"),
    ).toBe(false);
  });
});
