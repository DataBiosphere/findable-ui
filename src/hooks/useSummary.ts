import { useEffect } from "react";
import { AzulSummaryResponse } from "../apis/azul/common/entities";
import { useToken } from "./authentication/token/useToken";
import { useAsync } from "./useAsync";
import { useConfig } from "./useConfig";
import { useEntityService } from "./useEntityService";
import { useExploreState } from "./useExploreState";

interface UseSummaryResponse {
  isLoading: boolean;
  response?: AzulSummaryResponse;
}

/**
 * Hook responsible for handling the load of the summary values displayed on an entity index page.
 * @returns an object with the loaded data and a flag indicating is the data is loading
 */
export const useSummary = (): UseSummaryResponse => {
  const { token } = useToken();
  const { config } = useConfig();
  const { exploreState } = useExploreState();
  const { filterState } = exploreState;
  const { summaryConfig } = config;
  const {
    data: response,
    isLoading: apiIsLoading,
    run,
  } = useAsync<AzulSummaryResponse>();
  const { catalog, fetchSummary } = useEntityService(); // Determine type of fetch to be executed, either API endpoint or TSV.

  useEffect(() => {
    if (summaryConfig) {
      run(fetchSummary(filterState, catalog, token));
    }
  }, [catalog, fetchSummary, filterState, run, summaryConfig, token]);

  // Return if there's no summary config for this site.
  if (!summaryConfig) {
    return { isLoading: false }; //TODO: return a summary placeholder
  }

  // Return the fetch status and summary data once fetch is complete.
  return {
    isLoading: apiIsLoading,
    response,
  };
};
