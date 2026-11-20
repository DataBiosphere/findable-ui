import { useRouter } from "next/router";
import { JSX, useMemo, useState } from "react";
import { LIST_URL_PARAM } from "../../common/constants";
import { ExploreListContext } from "./context";
import type { ExploreListProviderProps } from "./types";
import { getExploreListParam, getLocationExploreListParam } from "./utils";

/**
 * Holds the entity list type the user explored from, for pages outside the explore view. Mount it in `_app`, above the
 * explore state provider. The explore view sets it to its entity list type. Otherwise it starts from the URL's `list`
 * param, when it names an allowed list, else from `initialList`, and follows a change to an allowed `list`. A URL
 * without `list` keeps the current value.
 * @param props - Provider props.
 * @param props.allowedLists - Entity list types the URL's `list` may name, e.g. the configured entity routes.
 * @param props.children - Children.
 * @param props.initialList - Explore list used when the URL has no allowed `list`.
 * @returns The provider element.
 */
export function ExploreListProvider({
  allowedLists,
  children,
  initialList,
}: ExploreListProviderProps): JSX.Element {
  const { isReady, query } = useRouter();
  // Seeded from the browser URL's `list`, read once, so the first render already uses it, before the router is ready.
  const [prevListParam, setPrevListParam] = useState(() =>
    getExploreListParam(getLocationExploreListParam(), allowedLists),
  );
  const [exploreList, setExploreList] = useState(prevListParam ?? initialList);
  const listParam = getExploreListParam(query[LIST_URL_PARAM], allowedLists);

  // Adjust-during-render: follow a change to the URL's `list`, in the same render as the URL. Only a change is
  // followed, so a `list` left in the URL doesn't override the explore view setting the explore list. The router's
  // query is empty until it is ready, so an unready router would read as a change.
  if (isReady && listParam !== prevListParam) {
    setPrevListParam(listParam);
    if (listParam) setExploreList(listParam);
  }

  const value = useMemo(() => ({ exploreList, setExploreList }), [exploreList]);

  return (
    <ExploreListContext.Provider value={value}>
      {children}
    </ExploreListContext.Provider>
  );
}
