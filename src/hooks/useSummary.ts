import { useEffect } from "react";
import { AzulSummaryResponse } from "../apis/azul/common/entities";
import { useToken } from "./authentication/token/useToken";
import { useAsync } from "./useAsync";
import { useConfig } from "./useConfig";
import { useEntityService } from "./useEntityService";
import { useExploreState } from "./useExploreState";

interface UseSummaryResponse {
  summaries: [string, string][];
}

export const useSummary = (): UseSummaryResponse | undefined => {
  const { token } = useToken();
  const { config, entityConfig } = useConfig();
  const { exploreState } = useExploreState();
  const { filterState } = exploreState;
  const { summaryConfig } = config;
  const { ui } = entityConfig;
  const { enableSummary } = ui || {};
  const { data: response, run } = useAsync<AzulSummaryResponse>();
  const { catalog, fetchSummary } = useEntityService();

  // Summary is enabled and summary config is defined.
  const shouldFetch = !!(enableSummary && summaryConfig);

  useEffect(() => {
    if (!shouldFetch) return;
    run(fetchSummary(filterState, catalog, token));
  }, [catalog, fetchSummary, filterState, run, shouldFetch, token]);

  // Summary is disabled or summary config is not defined.
  if (!enableSummary || !summaryConfig) return;

  // Summary response is not defined.
  if (!response) return;

  // Map response to summaries.
  return { summaries: summaryConfig.mapResponse(response) };
};
