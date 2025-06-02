import React, { ReactNode } from "react";
import { usePopStateBus } from "../../services/beforePopState/usePopStateBus";
import { WasPopProvider } from "../services/wasPop/provider";

export function ServicesProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // Register the pop state bus.
  usePopStateBus();

  return <WasPopProvider>{children}</WasPopProvider>;
}
