import { jest } from "@jest/globals";
import type { MenuProps } from "@mui/material";
import type { KeyboardEvent } from "react";
import {
  getMenuSlotProps,
  getPopupAriaProps,
  HAS_POPUP,
} from "../src/utils/ariaPopup";

const SURFACE_ID = "menu-id";

describe("getPopupAriaProps", () => {
  it("should reference the surface while it is open", () => {
    expect(getPopupAriaProps({ id: SURFACE_ID, open: true })).toEqual({
      "aria-controls": SURFACE_ID,
      "aria-expanded": true,
    });
  });

  // Menu, Popper and Dialog all unmount their children when closed, so holding
  // aria-controls would leave it pointing at an id that is not in the document.
  it("should drop the reference while the surface is closed", () => {
    expect(getPopupAriaProps({ id: SURFACE_ID, open: false })).toEqual({
      "aria-controls": undefined,
      "aria-expanded": false,
    });
  });

  it("should omit aria-haspopup for a disclosure", () => {
    expect(
      getPopupAriaProps({ id: SURFACE_ID, open: true }),
    ).not.toHaveProperty("aria-haspopup");
  });

  it.each([
    ["a menu", HAS_POPUP.MENU],
    ["a dialog", HAS_POPUP.DIALOG],
  ])("should declare %s popup", (_, hasPopup) => {
    expect(
      getPopupAriaProps({ hasPopup, id: SURFACE_ID, open: false }),
    ).toEqual({
      "aria-controls": undefined,
      "aria-expanded": false,
      "aria-haspopup": hasPopup,
    });
  });

  // Callers whose surface has no id still need the expanded state announced.
  it("should omit aria-controls when no id is given", () => {
    expect(getPopupAriaProps({ open: true })).toEqual({
      "aria-controls": undefined,
      "aria-expanded": true,
    });
  });

  // A blank id would render aria-controls="", which resolves to no element.
  it("should omit aria-controls when the id is blank", () => {
    expect(getPopupAriaProps({ id: "", open: true })).toEqual({
      "aria-controls": undefined,
      "aria-expanded": true,
    });
  });

  // A disabled control cannot open its surface, so announcing expanded state
  // or a controlled element would describe an interaction that is not offered.
  // What it would open has not changed, so aria-haspopup stays.
  it("should omit expanded state and controls while disabled", () => {
    expect(
      getPopupAriaProps({
        disabled: true,
        hasPopup: HAS_POPUP.DIALOG,
        id: SURFACE_ID,
        open: false,
      }),
    ).toEqual({
      "aria-controls": undefined,
      "aria-expanded": undefined,
      "aria-haspopup": HAS_POPUP.DIALOG,
    });
  });

  // A control can become disabled while its surface is showing, e.g. when the
  // data behind it refreshes. The surface is still on screen, so it is still
  // announced as open.
  it("should still announce a surface that is open when disabled", () => {
    expect(
      getPopupAriaProps({ disabled: true, id: SURFACE_ID, open: true }),
    ).toEqual({
      "aria-controls": SURFACE_ID,
      "aria-expanded": true,
    });
  });
});

type MenuListSlotProps = NonNullable<
  NonNullable<MenuProps["slotProps"]>["list"]
>;

/**
 * The callback form of the list slot props. Extracted against a variadic
 * signature: the callback takes an owner state, so it does not match a
 * zero-argument function type and `Extract` would silently resolve to `never`.
 */
type MenuListSlotPropsCallback = Extract<
  MenuListSlotProps,
  (...args: never[]) => unknown
>;

/**
 * Resolves a menu's list slot props, failing the test if they are not a
 * callback.
 * @param slotProps - Menu slot props.
 * @returns The props the list callback derives from the owner state.
 */
function resolveList(slotProps: MenuProps["slotProps"]): object {
  const list = slotProps?.list;
  if (typeof list !== "function") throw new Error("Expected a callback");
  return list({} as Parameters<MenuListSlotPropsCallback>[0]);
}

describe("getMenuSlotProps", () => {
  // The id cannot go on the menu root: that is a presentational modal wrapper,
  // so aria-controls would resolve to the backdrop container, not the list.
  it("should place the id on the list slot", () => {
    expect(getMenuSlotProps(SURFACE_ID)).toEqual({
      list: { id: SURFACE_ID },
    });
  });

  // A wholesale spread would drop a default's list props — MENU_PROPS relies on
  // list: { component: "div" } surviving alongside a caller's own list props.
  it("should merge the caller's list slot with the default's", () => {
    expect(
      getMenuSlotProps(
        SURFACE_ID,
        { list: { component: "div" } },
        { slotProps: { list: { dense: true } } },
      ),
    ).toEqual({ list: { component: "div", dense: true, id: SURFACE_ID } });
  });

  // Every slot is merged, not just the list: a caller setting elevation must
  // not silently drop DropdownMenu's default paper variant.
  it("should merge the caller's other slots with the default's", () => {
    expect(
      getMenuSlotProps(
        SURFACE_ID,
        { paper: { variant: "menu" } },
        { slotProps: { paper: { elevation: 2 } } },
      ),
    ).toEqual({
      list: { id: SURFACE_ID },
      paper: { elevation: 2, variant: "menu" },
    });
  });

  it("should let the caller win where it sets the same prop as a default", () => {
    expect(
      getMenuSlotProps(
        SURFACE_ID,
        { paper: { variant: "menu" } },
        { slotProps: { paper: { variant: "outlined" } } },
      ),
    ).toEqual({ list: { id: SURFACE_ID }, paper: { variant: "outlined" } });
  });

  // MUI Menu builds `{ list: MenuListProps, ..., ...slotProps }`, so setting
  // slotProps would silently drop a caller's deprecated props; the helper folds
  // them in, so a call site cannot forget to.
  it("should fold the caller's deprecated slot props into their slots", () => {
    expect(
      getMenuSlotProps(
        SURFACE_ID,
        { paper: { variant: "menu" } },
        {
          MenuListProps: { dense: true },
          PaperProps: { elevation: 2 },
          TransitionProps: { timeout: 100 },
        },
      ),
    ).toEqual({
      list: { dense: true, id: SURFACE_ID },
      paper: { elevation: 2, variant: "menu" },
      transition: { timeout: 100 },
    });
  });

  it("should let the caller's slotProps win over its deprecated props", () => {
    expect(
      getMenuSlotProps(SURFACE_ID, undefined, {
        MenuListProps: { dense: true },
        slotProps: { list: { dense: false } },
      }),
    ).toEqual({ list: { dense: false, id: SURFACE_ID } });
  });

  // MUI v7 allows a slot prop to be an (ownerState) => props callback, which a
  // spread would silently drop.
  it("should keep a callback list slot and still apply the id", () => {
    const slotProps = getMenuSlotProps(SURFACE_ID, {
      list: () => ({ component: "div" }),
    });
    expect(resolveList(slotProps)).toEqual({
      component: "div",
      id: SURFACE_ID,
    });
  });

  // Built on MUI's mergeSlotProps, so a caller's className joins the default's
  // rather than replacing it, and both event handlers run.
  it("should combine class names and chain handlers with the defaults", () => {
    const onKeyDown = jest.fn();
    const callerOnKeyDown = jest.fn();
    const slotProps = getMenuSlotProps(
      SURFACE_ID,
      { list: { className: "base", onKeyDown } },
      {
        slotProps: {
          list: { className: "caller", onKeyDown: callerOnKeyDown },
        },
      },
    );
    const list = slotProps?.list;
    if (typeof list !== "object") throw new Error("Expected a props object");

    expect(list.className).toBe("base caller");
    expect(list.id).toBe(SURFACE_ID);

    list.onKeyDown?.({} as KeyboardEvent<HTMLUListElement>);

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(callerOnKeyDown).toHaveBeenCalledTimes(1);
  });

  // The id is the component's own: it is what the trigger's aria-controls
  // points at, so honouring a caller's id would leave that reference dangling.
  it("should override a caller's list id", () => {
    expect(
      getMenuSlotProps(SURFACE_ID, undefined, {
        slotProps: { list: { id: "caller-id" } },
      }),
    ).toEqual({ list: { id: SURFACE_ID } });
  });
});
