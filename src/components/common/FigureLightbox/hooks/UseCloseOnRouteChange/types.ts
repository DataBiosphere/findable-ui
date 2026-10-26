/**
 * Props for the useCloseOnRouteChange hook.
 */
export interface UseCloseOnRouteChangeProps {
  /** Closes the lightbox. */
  onClose: () => void;
  /** Whether the lightbox is open. */
  open: boolean;
}

/**
 * Options Next.js passes to a routeChangeStart listener.
 */
export interface RouteChangeOptions {
  shallow?: boolean;
}
