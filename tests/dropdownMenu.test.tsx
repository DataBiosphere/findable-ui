import { MenuItem } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { JSX } from "react";
import { DropdownButton } from "../src/components/common/Button/components/DropdownButton/dropdownButton";
import {
  DropdownMenu,
  DropdownMenuProps,
} from "../src/components/common/DropdownMenu/dropdownMenu";
import { expectControlsResolveToMenu } from "./utils/ariaPopup";

const TRIGGER_NAME = "Edit Columns";

/**
 * Renders a dropdown menu whose trigger spreads the render prop's props, which
 * is how every consumer in this repo wires it up.
 * @param props - Dropdown menu props to pass through.
 */
function renderDropdownMenu(
  props: Omit<Partial<DropdownMenuProps>, "button" | "children"> = {},
): void {
  render(
    <DropdownMenu
      {...props}
      button={(buttonProps): JSX.Element => (
        <DropdownButton {...buttonProps}>{TRIGGER_NAME}</DropdownButton>
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

  // MUI Menu builds `{ list: MenuListProps, ...slotProps }`, so setting the
  // list slot for the id would silently drop a caller's deprecated MenuListProps.
  it("should keep a caller's MenuListProps alongside the id", () => {
    renderDropdownMenu({
      MenuListProps: { className: "from-menu-list-props" },
    });
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });

    fireEvent.click(trigger);

    const menu = screen.getByRole("menu", { hidden: true });
    expect(menu.classList.contains("from-menu-list-props")).toBe(true);
    expect(menu.id).toBe(trigger.getAttribute("aria-controls"));
  });

  // A caller setting one paper prop must not silently drop the default paper
  // variant — every slot is merged, not just the list.
  it("should keep the default paper variant alongside a caller's paper props", () => {
    renderDropdownMenu({ slotProps: { paper: { className: "from-paper" } } });

    fireEvent.click(screen.getByRole("button", { name: TRIGGER_NAME }));

    const paper = screen.getByRole("menu", { hidden: true }).parentElement;
    expect(paper?.classList.contains("from-paper")).toBe(true);
    expect(paper?.className).toMatch(/MuiPaper-menu/);
  });

  // A disabled trigger cannot open the menu, so DropdownMenu hands it disabled
  // and omits the expanded state it cannot offer.
  it("should disable the trigger and omit its expanded state", () => {
    renderDropdownMenu({ disabled: true });
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(trigger.hasAttribute("aria-expanded")).toBe(false);
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
  });

  // Consumers already disable the button inside the render prop, spreading the
  // handed props after; an unset disabled must not be handed over to undo that.
  it("should not hand the trigger disabled when it is unset", () => {
    render(
      <DropdownMenu
        button={(buttonProps): JSX.Element => (
          <DropdownButton disabled {...buttonProps}>
            {TRIGGER_NAME}
          </DropdownButton>
        )}
      >
        {(): JSX.Element[] => [<MenuItem key="edit">Edit</MenuItem>]}
      </DropdownMenu>,
    );
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.hasAttribute("disabled")).toBe(true);
  });
});
