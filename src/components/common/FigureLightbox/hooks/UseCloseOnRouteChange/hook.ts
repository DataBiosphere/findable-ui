import { useRouter } from "next/router";
import { useEffect } from "react";
import type { UseCloseOnRouteChangeProps } from "./types";
import { createRouteChangeStartListener } from "./utils";

/**
 * Closes the open lightbox on client-side navigation. A page component reused across routes would otherwise keep the lightbox open over the next page. Shallow URL updates on the same page leave it open.
 * @param props - Hook props.
 * @param props.onClose - Closes the lightbox.
 * @param props.open - Whether the lightbox is open.
 */
export function useCloseOnRouteChange({
  onClose,
  open,
}: UseCloseOnRouteChangeProps): void {
  const { events } = useRouter();
  useEffect(() => {
    if (!open || !events) return;
    const onRouteChangeStart = createRouteChangeStartListener(onClose);
    events.on("routeChangeStart", onRouteChangeStart);
    return (): void => events.off("routeChangeStart", onRouteChangeStart);
  }, [events, onClose, open]);
}
