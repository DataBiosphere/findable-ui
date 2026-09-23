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
        open: true,
      }),
    ).toEqual({
      "aria-controls": undefined,
      "aria-expanded": undefined,
      "aria-haspopup": HAS_POPUP.DIALOG,
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
  it("should merge list slots across bases rather than replacing them", () => {
    expect(
      getMenuSlotProps(
        SURFACE_ID,
        { list: { component: "div" } },
        { list: { dense: true } },
      ),
    ).toEqual({ list: { component: "div", dense: true, id: SURFACE_ID } });
  });

  it("should let a later base win for non-list slots", () => {
    expect(
      getMenuSlotProps(
        SURFACE_ID,
        { paper: { variant: "menu" } },
        { paper: { variant: "outlined" } },
      ),
    ).toEqual({ list: { id: SURFACE_ID }, paper: { variant: "outlined" } });
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
  it("should combine class names and chain handlers across bases", () => {
    const onKeyDown = jest.fn();
    const callerOnKeyDown = jest.fn();
    const slotProps = getMenuSlotProps(
      SURFACE_ID,
      { list: { className: "base", onKeyDown } },
      { list: { className: "caller", onKeyDown: callerOnKeyDown } },
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
    expect(getMenuSlotProps(SURFACE_ID, { list: { id: "caller-id" } })).toEqual(
      {
        list: { id: SURFACE_ID },
      },
    );
  });
});
