import { useEffect } from "react";
import {
  registerBeforePopCallback,
  unregisterBeforePopCallback,
} from "./popStateBus";
import { BeforePopStateCallback } from "./types";

export const useOnPopState = (cb: BeforePopStateCallback): void => {
  useEffect(() => {
    registerBeforePopCallback(cb);
    return (): void => {
      unregisterBeforePopCallback(cb);
    };
  }, [cb]);
};
