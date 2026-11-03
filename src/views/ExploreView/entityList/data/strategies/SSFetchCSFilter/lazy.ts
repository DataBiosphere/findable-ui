import { lazy } from "react";

/**
 * The server-side fetch and client-side filter strategy, loaded only when first rendered, so apps that don't fetch from
 * the server never download it or TanStack Query. Render it inside a Suspense boundary.
 */
export const LazySSFetchCSFilter = lazy(() =>
  import("./ssFetchCSFilter").then(({ SSFetchCSFilter }) => ({
    default: SSFetchCSFilter,
  })),
);
