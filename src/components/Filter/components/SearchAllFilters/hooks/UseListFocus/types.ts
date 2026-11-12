import type { FocusEvent, KeyboardEvent, RefObject } from "react";
import type { OnCloseFn } from "../../common/entities";

/**
 * Return value of the useListFocus hook.
 */
export interface UseListFocus {
  onListBlur: (event: FocusEvent<HTMLElement>) => void;
  onListKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

/**
 * Parameters of the useListFocus hook.
 */
export interface UseListFocusParams {
  autocompleteRef: RefObject<HTMLDivElement | null>;
  onClose: OnCloseFn;
}
