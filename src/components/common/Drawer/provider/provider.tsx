import { JSX, useCallback, useId, useState } from "react";
import { DrawerContext } from "./context";
import { DrawerProviderProps } from "./types";

/**
 * Provides the drawer's id and open state, with open and close callbacks, through DrawerContext.
 * @param props - Component props.
 * @param props.children - Children, or a render function receiving the drawer context values.
 * @returns The drawer provider.
 */
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
