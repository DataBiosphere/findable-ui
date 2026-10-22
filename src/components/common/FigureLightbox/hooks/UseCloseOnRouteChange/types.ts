import type { RefObject } from "react";
import type { ControllerRef } from "yet-another-react-lightbox";

/**
 * Props for the useCloseOnRouteChange hook.
 */
export interface UseCloseOnRouteChangeProps {
  /** Ref to the lightbox controller, whose close action closes the lightbox. */
  controllerRef: RefObject<ControllerRef | null>;
  /** Whether the lightbox is open. */
  open: boolean;
}

/**
 * Options Next.js passes to a routeChangeStart listener.
 */
export interface RouteChangeOptions {
  shallow?: boolean;
}
