import { useIdleTimer } from "react-idle-timer";
import { IIdleTimerProps } from "react-idle-timer/dist/types/IIdleTimerProps";

/**
 * Sets a session timeout that triggers when the user has been idle for the specified duration.
 * @param idleTimerProps - The parameters for the session timeout.
 */
export const useSessionIdleTimer = (idleTimerProps: IIdleTimerProps): void => {
  useIdleTimer(idleTimerProps);
};
