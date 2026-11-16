import { useRouter } from "next/router";
import { JSX, useMemo, useState } from "react";
import { FROM_URL_PARAM } from "../../common/constants";
import { useConfig } from "../../hooks/useConfig";
import { ExploreOriginContext } from "./context";
import type { ExploreOriginProviderProps } from "./types";
import { getExploreOriginParam, getLocationExploreOriginParam } from "./utils";

/**
 * Holds the entity list type the user explored from, for pages outside the explore view. Mount it in `_app`, inside the
 * config provider and above the explore state provider. The explore view sets it to its entity list type. Otherwise it
 * starts from the URL's `from` param, when that names a configured entity, else the first configured entity, and
 * follows a change to a valid `from`. A URL without `from` keeps the current value.
 * @param props - Provider props.
 * @param props.children - Children.
 * @returns The provider element.
 */
export function ExploreOriginProvider({
  children,
}: ExploreOriginProviderProps): JSX.Element {
  const {
    config: { entities },
  } = useConfig();
  const { isReady, query } = useRouter();
  // The browser URL's `from`, read once, so the first render already uses it, before the router is ready.
  const [locationOriginParam] = useState(() =>
    getExploreOriginParam(getLocationExploreOriginParam(), entities),
  );
  const [exploreOrigin, setExploreOrigin] = useState(
    locationOriginParam ?? entities[0].route,
  );
  const [prevOriginParam, setPrevOriginParam] = useState(locationOriginParam);
  const originParam = getExploreOriginParam(query[FROM_URL_PARAM], entities);

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
