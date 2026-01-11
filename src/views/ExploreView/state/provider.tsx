import { JSX, ReactNode } from "react";
import { ExploreViewContext } from "./context";
import { useExploreViewReducer } from "./hooks/UseExploreViewReducer/hook";

/**
 * Provider for ExploreView state.
 * Manages UI intent state such as preset selection per entity list.
 * Mount at the application root for persistence across navigation.
 *
 * @param props - Props.
 * @param props.children - Children.
 *
 * @returns A context provider wrapping the given children.
 */
export function ExploreViewStateProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const reducer = useExploreViewReducer();
  return (
    <ExploreViewContext.Provider value={reducer}>
      {children}
    </ExploreViewContext.Provider>
  );
}
