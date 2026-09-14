import { getPopupAriaProps, HAS_POPUP } from "../src/utils/ariaPopup";

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
});
