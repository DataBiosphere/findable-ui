import { useRouter } from "next/router";
import { type Dispatch, useEffect } from "react";
import type { ExploreAction } from "../../../../providers/exploreState";
import { stateToUrl } from "../../../../providers/exploreState/actions/stateToUrl/dispatch";
import { ROUTER_METHOD } from "../../../../providers/exploreState/actions/stateToUrl/types";
import { EXPLORE_URL_PARAMS } from "../../../../providers/exploreState/constants";

/**
 * Puts the selected catalog back into the explore view's URL when the URL lacks
 * it, for example a link that carries filters but no catalog. The URL is replaced
 * shallowly with the state's query, which includes the selected catalog. The
 * explore view's URL is written by its state sync manager, so this goes through
 * `stateToUrl` rather than `useUpdateURLParams`, whose replace isn't
 * shallow and would race the sync manager's own replace.
 * @param catalog - Catalog selected by the URL, if any.
 * @param dispatch - Explore state dispatch.
 */
export function useRestoreCatalogParam(
  catalog: string | undefined,
  dispatch: Dispatch<ExploreAction>,
): void {
  const { isReady, query } = useRouter();
  const catalogParam = query[EXPLORE_URL_PARAMS.CATALOG];

  useEffect(() => {
    if (!isReady || !catalog || catalogParam) return;
    dispatch(stateToUrl({ method: ROUTER_METHOD.REPLACE }));
  }, [catalog, catalogParam, dispatch, isReady]);
}
