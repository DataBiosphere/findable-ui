import { useEffect } from "react";
import {
  registerBeforePopCallback,
  unregisterBeforePopCallback,
} from "./popStateBus";
import { BeforePopStateCallback } from "./types";

export const useOnPopState = (cb: BeforePopStateCallback) => {
  useEffect(() => {
    registerBeforePopCallback(cb);
    return () => {
      unregisterBeforePopCallback(cb);
    };
  }, [cb]);
};
