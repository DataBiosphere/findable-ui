import React, { ReactNode } from "react";
import { usePopStateBus } from "../../services/beforePopState/usePopStateBus";

export function ServicesProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // Register the pop state bus.
  usePopStateBus();

  return <>{children}</>;
}
