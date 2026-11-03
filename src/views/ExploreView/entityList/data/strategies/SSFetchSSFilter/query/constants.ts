import type { QueryClientConfig } from "@tanstack/react-query";

/**
 * The entity list's query client defaults. findable-ui owns this client, so apps need no QueryClientProvider and their
 * own query client defaults never apply here.
 * - `gcTime: 0`: responses aren't cached; explore state holds the response, and each query is requested when it is used.
 * - `networkMode: "always"`: requests go to ky even when the browser reports being offline; a paused query would show
 * the previous response's rows as loaded.
 * - `refetchOnReconnect` and `refetchOnWindowFocus` off: the list isn't requested again on reconnecting or refocusing.
 * The client is passed straight to `useQuery` and never mounted (no QueryClientProvider), so it doesn't subscribe to
 * focus or online events: turning these on would also need `queryClient.mount()`.
 * - `retry: false`: ky already retries.
 * - `throwOnError: true`: a failed request's error is thrown to the error boundary once the request has settled. The
 * client is created per mount, so the failed query isn't kept: it is requested again when the list is next shown.
 */
export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 0,
      networkMode: "always",
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError: true,
    },
  },
};
