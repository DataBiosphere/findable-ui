import { useRouter } from "next/router";
import { JSX, useMemo, useState } from "react";
import { FROM_URL_PARAM } from "../../common/constants";
import { ExploreOriginContext } from "./context";
import type { ExploreOriginProviderProps } from "./types";
import { getExploreOriginParam, getLocationExploreOriginParam } from "./utils";

/**
 * Holds the entity list type the user explored from, for pages outside the explore view. Mount it in `_app`, above the
 * explore state provider. The explore view sets it to its entity list type. Otherwise it starts from the URL's `from`
 * param, when that is an allowed origin, else the initial origin, and follows a change to an allowed
 * `from`. A URL without `from` keeps the current value.
 * @param props - Provider props.
 * @param props.allowedOrigins - Entity list types the URL's `from` may name, e.g. the configured entity routes.
 * @param props.children - Children.
 * @param props.initialOrigin - Explore origin used when the URL has no allowed `from`.
 * @returns The provider element.
 */
export function ExploreOriginProvider({
  allowedOrigins,
  children,
  initialOrigin,
}: ExploreOriginProviderProps): JSX.Element {
  const { isReady, query } = useRouter();
  // Seeded from the browser URL's `from`, read once, so the first render already uses it, before the router is ready.
  const [prevOriginParam, setPrevOriginParam] = useState(() =>
    getExploreOriginParam(getLocationExploreOriginParam(), allowedOrigins),
  );
  const [exploreOrigin, setExploreOrigin] = useState(
    prevOriginParam ?? initialOrigin,
  );
  const originParam = getExploreOriginParam(
    query[FROM_URL_PARAM],
    allowedOrigins,
  );

  // Adjust-during-render: follow a change to the URL's `from`, in the same render as the URL. Only a change is
  // followed, so a `from` left in the URL doesn't override the explore view setting the origin. The router's query is
  // empty until it is ready, so an unready router would read as a change.
  if (isReady && originParam !== prevOriginParam) {
    setPrevOriginParam(originParam);
    if (originParam) setExploreOrigin(originParam);
  }

  const value = useMemo(
    () => ({ exploreOrigin, setExploreOrigin }),
    [exploreOrigin],
  );

  return (
    <ExploreOriginContext.Provider value={value}>
      {children}
    </ExploreOriginContext.Provider>
  );
}
