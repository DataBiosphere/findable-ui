import { JSX, useCallback, useId, useState } from "react";
import { DrawerContext } from "./context";
import { DrawerProviderProps } from "./types";

export function DrawerProvider({ children }: DrawerProviderProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const id = useId();

  const onClose = useCallback(() => setOpen(false), []);

  const onOpen = useCallback(() => setOpen(true), []);

  return (
    <DrawerContext.Provider value={{ id, onClose, onOpen, open }}>
      {typeof children === "function"
        ? children({ id, onClose, onOpen, open })
        : children}
    </DrawerContext.Provider>
  );
}
