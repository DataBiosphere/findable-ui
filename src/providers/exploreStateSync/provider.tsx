import React, { ReactNode } from "react";
import { useMetaCommands } from "./hooks/UseMetaCommands/hook";

export function ExploreStateSyncProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // Meta-command related side effects.
  useMetaCommands();

  return <>{children}</>;
}
