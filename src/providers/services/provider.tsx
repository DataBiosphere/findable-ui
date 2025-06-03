import React, { ReactNode } from "react";
import { usePopStateBus } from "../../services/beforePopState/usePopStateBus";
import { WasPopProvider } from "../services/wasPop/provider";

/**
 * ServicesProvider is a component that initializes and provides access to various service-related
 * functionality throughout the application.
 *
 * This provider:
 * 1. Registers the pop state bus to handle browser navigation events.
 * 2. Provides the WasPopProvider context to track browser back/forward navigation
 *
 * This provider should be placed at the _app root level to ensure all components have access to these services.
 */

export function ServicesProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // Register the pop state bus.
  usePopStateBus();

  return <WasPopProvider>{children}</WasPopProvider>;
}
