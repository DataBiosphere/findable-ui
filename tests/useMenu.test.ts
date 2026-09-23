import { act, renderHook } from "@testing-library/react";
import type { MouseEvent } from "react";
import { useMenu } from "../src/components/common/Menu/hooks/useMenu";

describe("useMenu", () => {
  // The hook owns both the id and the open state, so it can hand the trigger
  // ready-made ARIA props; callers should not have to wire them by hand.
  it("should give the trigger menu popup props that follow the open state", () => {
    const { result } = renderHook(() => useMenu<HTMLButtonElement>());
    expect(result.current.triggerProps).toEqual({
      "aria-controls": undefined,
      "aria-expanded": false,
      "aria-haspopup": true,
    });

    act(() => {
      result.current.onOpen({
        currentTarget: document.createElement("button"),
      } as MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.triggerProps).toEqual({
      "aria-controls": result.current.id,
      "aria-expanded": true,
      "aria-haspopup": true,
    });
  });

  it("should place the id on the menu list slot over the given slot props", () => {
    const { result } = renderHook(() => useMenu());
    expect(
      result.current.getSlotProps(
        { list: { component: "div" }, paper: { variant: "menu" } },
        { MenuListProps: { dense: true } },
      ),
    ).toEqual({
      list: { component: "div", dense: true, id: result.current.id },
      paper: { variant: "menu" },
    });
  });

  // A disabled trigger cannot open the menu, so triggerProps drop the
  // expanded state rather than announce an interaction that is not offered.
  it("should omit expanded state from triggerProps while disabled", () => {
    const { result } = renderHook(() => useMenu({ disabled: true }));
    expect(result.current.triggerProps).toEqual({
      "aria-controls": undefined,
      "aria-expanded": undefined,
      "aria-haspopup": true,
    });
  });

  it("should give each instance its own id", () => {
    const first = renderHook(() => useMenu());
    const second = renderHook(() => useMenu());
    expect(first.result.current.id).not.toBe(second.result.current.id);
  });
});
