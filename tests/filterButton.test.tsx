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
    render(<Drawer categoryFilters={[]} count={0} onFilter={(): void => {}} />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });

    fireEvent.click(trigger);

    const drawerId = trigger.getAttribute("aria-controls") as string;
    expect(drawerId).toBeTruthy();
    expect(document.getElementById(drawerId)).toBe(
      screen.getByRole("dialog", { hidden: true }),
    );
  });
});
