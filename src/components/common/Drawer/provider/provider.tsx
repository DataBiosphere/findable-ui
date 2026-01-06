import { JSX, useCallback, useState } from "react";
import { DrawerContext } from "./context";
import { DrawerProviderProps } from "./types";

export function DrawerProvider({ children }: DrawerProviderProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = useCallback(() => setOpen(false), []);

  const onOpen = useCallback(() => setOpen(true), []);

  return (
    <DrawerContext.Provider value={{ onClose, onOpen, open }}>
      {typeof children === "function"
        ? children({ onClose, onOpen, open })
        : children}
    </DrawerContext.Provider>
  );
}
