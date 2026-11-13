import type { BoxProps } from "@mui/material";
import type { KeyboardEvent } from "react";
import type { KeyValue, KeyValueFn } from "../../keyValuePairs";

// Keys that activate a native button.
const ACTIVATION_KEYS = new Set(["Enter", " "]);

/**
 * Returns the button props for a key value element: a focusable button that
 * invokes the key value function on click, Enter or Space, once per key press
 * (a held key does not repeat it). Returns no props when there is no key value
 * function, so the element is not a button.
 * @param keyValue - Key value tuple, passed to the key value function.
 * @param keyValueFn - Function invoked with the key value tuple.
 * @returns The element's role, tab index, click and keydown props, or none.
 */
export function getButtonProps(
  keyValue: KeyValue,
  keyValueFn?: KeyValueFn,
): Pick<BoxProps, "onClick" | "onKeyDown" | "role" | "tabIndex"> {
  if (!keyValueFn) return {};
  return {
    onClick: (): void => keyValueFn(keyValue),
    onKeyDown: (event: KeyboardEvent<HTMLElement>): void => {
      if (!ACTIVATION_KEYS.has(event.key)) return;
      // Stops Space scrolling the page, including while the key is held.
      event.preventDefault();
      if (event.repeat) return;
      keyValueFn(keyValue);
    },
    role: "button",
    tabIndex: 0,
  };
}
