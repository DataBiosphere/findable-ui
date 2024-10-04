import { track } from "../../../common/analytics/analytics";
import { EVENT_NAME, EVENT_PARAM } from "../../../common/analytics/entities";

/**
 * Executes event tracking for bulk download.
 * @param index - Index.
 * @param toolName - Tool name.
 * @param requestParams - Request params.
 */
export function bulkDownloadTracking(
  index: string,
  toolName: string,
  requestParams?: URLSearchParams
): void {
  if (!requestParams) {
    return;
  }
  // Grab catalog and current query from the request params.
  const catalog = requestParams.get("catalog") as string; // Catalog will be defined.
  const currentQuery = requestParams.get("filters") as string; // Filters will be defined.

  // Track the bulk download requested event.
  track(EVENT_NAME.BULK_DOWNLOAD_REQUESTED, {
    [EVENT_PARAM.CATALOG]: catalog,
    [EVENT_PARAM.CURRENT_QUERY]: currentQuery,
    [EVENT_PARAM.INDEX]: index,
    [EVENT_PARAM.TOOL_NAME]: toolName,
  });
}
