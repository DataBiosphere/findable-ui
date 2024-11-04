import { useCallback, useState } from "react";
import { UseTransition } from "./types";

/**
 * Hook to manage transition state for alert component wrapped in a transition component.
 * @param initialState - Initial state of the transition.
 * @returns transition state and handlers.
 */
export const useTransition = (initialState?: boolean): UseTransition => {
  const [isIn, setIsIn] = useState<boolean>(initialState || false);

  const onEnter = useCallback((): void => {
    setIsIn(true);
  }, []);

  const onExit = useCallback((): void => {
    setIsIn(false);
  }, []);

  return {
    isIn,
    onEnter,
    onExit,
  };
};
