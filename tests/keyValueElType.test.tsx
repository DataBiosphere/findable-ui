import { jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { KeyValueElType } from "../src/components/common/KeyValuePairs/components/KeyValueElType/keyValueElType";
import type {
  KeyValue,
  KeyValueFn,
} from "../src/components/common/KeyValuePairs/keyValuePairs";

const KEY_VALUE: KeyValue = ["Portal", "CELLxGENE"];
const TEST_ID = "key-value";

/**
 * Renders a key value element and returns it.
 * @param keyValueFn - Function invoked with the key value tuple.
 * @returns The rendered element.
 */
function renderEl(keyValueFn?: KeyValueFn): HTMLElement {
  render(
    <KeyValueElType
      data-testid={TEST_ID}
      keyValue={KEY_VALUE}
      keyValueFn={keyValueFn}
    >
      Portal CELLxGENE
    </KeyValueElType>,
  );
  return screen.getByTestId(TEST_ID);
}

describe("KeyValueElType", () => {
  it("is not a button and not focusable without a keyValueFn", () => {
    const el = renderEl();
    expect(screen.queryByRole("button")).toBeNull();
    expect(el.hasAttribute("tabindex")).toBe(false);
  });

  it("is a focusable button with a keyValueFn", () => {
    renderEl(jest.fn());
    const button = screen.getByRole("button", { name: "Portal CELLxGENE" });
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  // fireEvent returns false when the default action is prevented; preventing
  // it on Space stops the page scrolling.
  it.each([
    ["a click", (el: HTMLElement): boolean => fireEvent.click(el), true],
    [
      "Enter",
      (el: HTMLElement): boolean => fireEvent.keyDown(el, { key: "Enter" }),
      false,
    ],
    [
      "Space",
      (el: HTMLElement): boolean => fireEvent.keyDown(el, { key: " " }),
      false,
    ],
  ])(
    "calls keyValueFn with the key value on %s",
    (_, activate, notPrevented) => {
      const keyValueFn = jest.fn();
      const el = renderEl(keyValueFn);
      expect(activate(el)).toBe(notPrevented);
      expect(keyValueFn).toHaveBeenCalledTimes(1);
      expect(keyValueFn).toHaveBeenCalledWith(KEY_VALUE);
    },
  );

  it.each([
    ["Enter", "Enter"],
    ["Space", " "],
  ])("does not repeat keyValueFn while %s is held", (_, key) => {
    const keyValueFn = jest.fn();
    const el = renderEl(keyValueFn);
    expect(fireEvent.keyDown(el, { key, repeat: true })).toBe(false);
    expect(keyValueFn).not.toHaveBeenCalled();
  });

  it("ignores other keys", () => {
    const keyValueFn = jest.fn();
    const el = renderEl(keyValueFn);
    expect(fireEvent.keyDown(el, { key: "a" })).toBe(true);
    expect(keyValueFn).not.toHaveBeenCalled();
  });
});
