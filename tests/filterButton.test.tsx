import { fireEvent, render, screen } from "@testing-library/react";
import { DrawerProvider } from "../src/components/common/Drawer/provider/provider";
import { Button as DrawerFilterButton } from "../src/components/Filter/components/surfaces/drawer/components/Button/button";
import { Drawer } from "../src/components/Filter/components/surfaces/drawer/Drawer/drawer";

const TRIGGER_NAME = /Filter/;

describe("Filter drawer button", () => {
  // The drawer is a dialog, not a menu, so aria-haspopup has to say "dialog".
  it("should declare that the trigger opens a dialog", () => {
    render(
      <DrawerProvider>
        <DrawerFilterButton />
      </DrawerProvider>,
    );
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  // The trigger and the drawer are siblings under one DrawerProvider, so the
  // id has to come from the provider — neither can generate it alone.
  it("should reference the drawer surface once it is open", () => {
    render(
      <Drawer
        categoryFilters={[]}
        count={0}
        filterSortEnabled={false}
        onFilter={(): void => {}}
      />,
    );
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });

    fireEvent.click(trigger);

    const drawerId = trigger.getAttribute("aria-controls") as string;
    expect(drawerId).toBeTruthy();
    expect(document.getElementById(drawerId)).toBe(
      screen.getByRole("dialog", { hidden: true }),
    );
  });

  // MUI v7 allows a slot prop to be an (ownerState) => props callback. The id
  // is merged onto the paper, and a spread would drop such a callback silently.
  it("should keep a caller's paper slot callback alongside the id", () => {
    render(
      <Drawer
        categoryFilters={[]}
        count={0}
        filterSortEnabled={false}
        onFilter={(): void => {}}
        slotProps={{ paper: () => ({ className: "from-callback" }) }}
      />,
    );
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });

    fireEvent.click(trigger);

    const drawer = screen.getByRole("dialog", { hidden: true });
    expect(drawer.classList.contains("from-callback")).toBe(true);
    expect(drawer.id).toBe(trigger.getAttribute("aria-controls"));
  });

  // MUI Drawer builds `{ paper: PaperProps, ...slotProps }`, so setting the
  // paper slot for the id would silently drop a caller's deprecated PaperProps.
  it("should keep a caller's PaperProps alongside the id", () => {
    render(
      <Drawer
        categoryFilters={[]}
        count={0}
        filterSortEnabled={false}
        onFilter={(): void => {}}
        PaperProps={{ className: "from-paper-props" }}
      />,
    );
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });

    fireEvent.click(trigger);

    const drawer = screen.getByRole("dialog", { hidden: true });
    expect(drawer.classList.contains("from-paper-props")).toBe(true);
    expect(drawer.id).toBe(trigger.getAttribute("aria-controls"));
  });
});
