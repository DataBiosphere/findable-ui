import React, { ReactNode, useCallback, useState } from "react";
import { DrawerContext } from "./context";

export function DrawerProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}): JSX.Element {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);

  const onOpen = useCallback(() => setOpen(true), []);

  return (
    <DrawerContext.Provider value={{ onClose, onOpen, open }}>
      {children}
    </DrawerContext.Provider>
  );
}
