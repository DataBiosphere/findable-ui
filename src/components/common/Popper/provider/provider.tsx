import { JSX, MouseEvent, useCallback, useState } from "react";
import { PopperContext } from "./context";
import { PopperProviderProps } from "./types";

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
