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

  // The trigger declares aria-haspopup="dialog", so the dialog it opens needs a
  // name; its content is a list of filters with no heading of its own.
  it("should name the drawer dialog", () => {
    render(
      <Drawer
        categoryFilters={[]}
        count={0}
        filterSortEnabled={false}
        onFilter={(): void => {}}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: TRIGGER_NAME }));

    expect(
      screen.getByRole("dialog", { hidden: true, name: "Filters" }),
    ).toBeTruthy();
  });

  // A caller's own name wins over the default; only the id is not theirs.
  it("should let a caller's paper aria-label override the default name", () => {
    render(
      <Drawer
        categoryFilters={[]}
        count={0}
        filterSortEnabled={false}
        onFilter={(): void => {}}
        slotProps={{ paper: { "aria-label": "Refine results" } }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: TRIGGER_NAME }));

    expect(
      screen.getByRole("dialog", { hidden: true, name: "Refine results" }),
    ).toBeTruthy();
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

  // MUI's mergeSlotProps adds ownerState.className to a callback's result, and
  // the drawer's owner state carries its root className, so without care the
  // root's classes would be copied onto the paper as well.
  it("should not copy the drawer's className onto a callback paper slot", () => {
    render(
      <Drawer
        categoryFilters={[]}
        className="drawer-root"
        count={0}
        filterSortEnabled={false}
        onFilter={(): void => {}}
        slotProps={{ paper: () => ({ className: "from-callback" }) }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: TRIGGER_NAME }));

    const drawer = screen.getByRole("dialog", { hidden: true });
    expect(drawer.classList.contains("from-callback")).toBe(true);
    expect(drawer.classList.contains("drawer-root")).toBe(false);
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
