import { JSX } from "react";
import { DrawerTransitionContext } from "./context";
import { DrawerTransitionProviderProps } from "./types";

/**
 * Provides drawer variant to descendant components.
 * @param props - Component props.
 * @param props.children - Children or render function.
 * @param props.variant - Drawer variant.
 * @returns Provider component wrapping children.
 */
export function DrawerTransitionProvider({
  children,
  variant,
}: DrawerTransitionProviderProps): JSX.Element {
  return (
    <DrawerTransitionContext.Provider value={{ variant }}>
      {typeof children === "function" ? children({ variant }) : children}
    </DrawerTransitionContext.Provider>
  );
}
