import { useRouter } from "next/router";
import { useEffect } from "react";
import type { UseCloseOnRouteChangeProps } from "./types";
import { createRouteChangeStartListener } from "./utils";

/**
 * Closes the open lightbox on client-side navigation, through the lightbox's own close action, which also clears the inert it puts on the page. A page component reused across routes would otherwise keep the lightbox open over the next page. Shallow URL updates on the same page leave it open.
 * @param props - Hook props.
 * @param props.controllerRef - Ref to the lightbox controller.
 * @param props.open - Whether the lightbox is open.
 */
export function useCloseOnRouteChange({
  controllerRef,
  open,
}: UseCloseOnRouteChangeProps): void {
  const { events } = useRouter();
  useEffect(() => {
    if (!open || !events) return;
    const onRouteChangeStart = createRouteChangeStartListener(controllerRef);
    events.on("routeChangeStart", onRouteChangeStart);
    return (): void => events.off("routeChangeStart", onRouteChangeStart);
  }, [controllerRef, events, open]);
}
