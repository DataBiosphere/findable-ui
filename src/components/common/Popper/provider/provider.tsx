import { JSX, MouseEvent, useCallback, useState } from "react";
import { PopperContext } from "./context";
import { PopperProviderProps } from "./types";

/**
 * Provides the popper anchor element, open state, and open and close handlers through PopperContext.
 * @param props - Component props.
 * @param props.children - Children, or a render function receiving the popper context values.
 * @returns The popper provider.
 */
export function PopperProvider({ children }: PopperProviderProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const onClose = useCallback(() => setAnchorEl(null), []);

  const onOpen = useCallback(
    (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  return (
    <PopperContext.Provider value={{ anchorEl, onClose, onOpen, open }}>
      {typeof children === "function"
        ? children({ anchorEl, onClose, onOpen, open })
        : children}
    </PopperContext.Provider>
  );
}
