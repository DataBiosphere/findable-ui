import { mergeSlotProps } from "../src/utils/slotProps";

interface TestProps {
  className?: string;
  id?: string;
  role?: string;
}

interface TestOwnerState {
  open: boolean;
}

type TestSlotProp = TestProps | ((ownerState: TestOwnerState) => TestProps);

const OWNER_STATE: TestOwnerState = { open: true };

/**
 * Resolves a merged slot prop, failing the test if it is not a callback.
 * @param slotProp - Merged slot prop.
 * @returns The props the callback derives from the owner state.
 */
function resolve(slotProp: TestSlotProp): TestProps {
  if (typeof slotProp !== "function") throw new Error("Expected a callback");
  return slotProp(OWNER_STATE);
}

describe("mergeSlotProps", () => {
  it("should merge props objects, with a later value winning", () => {
    expect(
      mergeSlotProps<TestSlotProp>(
        { className: "base", role: "menu" },
        { className: "override" },
      ),
    ).toEqual({ className: "override", role: "menu" });
  });

  it("should ignore undefined values", () => {
    expect(
      mergeSlotProps<TestSlotProp>(undefined, { id: "id" }, undefined),
    ).toEqual({ id: "id" });
  });

  it("should return a props object when no value is a callback", () => {
    expect(typeof mergeSlotProps<TestSlotProp>({ id: "id" })).toBe("object");
  });

  // MUI v7 allows any slot prop to be an (ownerState) => props callback.
  // Spreading a function yields {}, which would drop the caller's props with
  // no error, so the merge has to become a callback itself.
  it("should keep a callback merged beneath a props object", () => {
    const merged = mergeSlotProps<TestSlotProp>(
      () => ({ className: "from-callback", role: "menu" }),
      { className: "override" },
    );
    expect(resolve(merged)).toEqual({
      className: "override",
      role: "menu",
    });
  });

  it("should keep a callback merged above a props object", () => {
    const merged = mergeSlotProps<TestSlotProp>(
      { id: "id", role: "menu" },
      () => ({
        role: "listbox",
      }),
    );
    expect(resolve(merged)).toEqual({ id: "id", role: "listbox" });
  });

  it("should resolve every callback against the owner state", () => {
    const merged = mergeSlotProps<TestSlotProp>(
      ({ open }) => ({ className: open ? "open" : "closed" }),
      ({ open }) => ({ role: open ? "menu" : "none" }),
    );
    expect(resolve(merged)).toEqual({ className: "open", role: "menu" });
  });
});
