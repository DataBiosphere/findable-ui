import { type IIdleTimerProps, useIdleTimer } from "react-idle-timer";

/**
 * Sets a session timeout that triggers when the user has been idle for the specified duration.
 * @param idleTimerProps - The parameters for the session timeout.
 */
export const useSessionIdleTimer = (idleTimerProps: IIdleTimerProps): void => {
  useIdleTimer(idleTimerProps);
};
