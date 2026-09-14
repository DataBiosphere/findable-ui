import { MenuItem } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { JSX } from "react";
import { DropdownButton } from "../src/components/common/Button/components/DropdownButton/dropdownButton";
import { DropdownMenu } from "../src/components/common/DropdownMenu/dropdownMenu";
import { expectControlsResolveToMenu } from "./utils/ariaPopup";

const TRIGGER_NAME = "Edit Columns";

/**
 * Renders a dropdown menu whose trigger spreads the render prop's props, which
 * is how every consumer in this repo wires it up.
 */
function renderDropdownMenu(): void {
  render(
    <DropdownMenu
      button={(props): JSX.Element => (
        <DropdownButton {...props}>{TRIGGER_NAME}</DropdownButton>
      )}
    >
      {(): JSX.Element[] => [<MenuItem key="edit">Edit</MenuItem>]}
    </DropdownMenu>,
  );
}

describe("DropdownMenu", () => {
  // The trigger is consumer-supplied, so DropdownMenu can only reach it through
  // the render prop — these props have to travel with onClick and open.
  it("should hand the trigger its popup ARIA state", () => {
    renderDropdownMenu();
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-controls")).toBeNull();
  });

  it("should reference the menu once it is open", () => {
    renderDropdownMenu();
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });

    fireEvent.click(trigger);

    expectControlsResolveToMenu(trigger);
  });
});
