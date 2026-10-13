/**
 * Return type for the useTransition hook.
 */
export interface UseTransition {
  isIn: boolean;
  onEnter: () => void;
  onExit: () => void;
}
