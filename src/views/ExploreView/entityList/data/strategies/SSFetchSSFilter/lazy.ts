import { lazy } from "react";

/**
 * The server-side fetch and server-side filter strategy, loaded only when first rendered, so apps that never filter on
 * the server never download it or TanStack Query. Render it inside a Suspense boundary.
 */
export const LazySSFetchSSFilter = lazy(() =>
  import("./ssFetchSSFilter").then(({ SSFetchSSFilter }) => ({
    default: SSFetchSSFilter,
  })),
);
