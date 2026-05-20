import { JSX, useCallback, useState } from "react";
import { CollapseContext } from "./context";
import { CollapseProviderProps } from "./types";

/**
 * Holds in-memory collapse state for any UI that opts in. Exposes `isIn`
 * and a toggle callback to descendants via `CollapseContext`. Accepts a
 * render-prop child so the value can be passed to a sibling context without
 * an extra hook consumer.
 * @param props - Provider props.
 * @param props.children - React children or a render function receiving the context value.
 * @param props.initialState - Initial value for `isIn` (defaults to `false`).
 * @returns Collapse provider component.
 */
export function CollapseProvider({
  children,
  initialState = false,
}: CollapseProviderProps): JSX.Element {
  const [isIn, setIsIn] = useState<boolean>(initialState);

  const onChange = useCallback(() => setIsIn((prev) => !prev), []);

  return (
    <CollapseContext.Provider value={{ isIn, onChange }}>
      {typeof children === "function" ? children({ isIn, onChange }) : children}
    </CollapseContext.Provider>
  );
}
