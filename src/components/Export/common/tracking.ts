import { track } from "../../../common/analytics/analytics";
import { EVENT_NAME, EVENT_PARAM } from "../../../common/analytics/entities";

/**
 * Executes event tracking for bulk download.
 * @param entity_name - Entity (tab) name.
 * @param toolName - Tool name.
 */
export function bulkDownloadTracking(
  entity_name: string,
  toolName: string
): void {
  // Track the bulk download requested event.
  track(EVENT_NAME.BULK_DOWNLOAD_REQUESTED, {
    [EVENT_PARAM.ENTITY_NAME]: entity_name,
    [EVENT_PARAM.TOOL_NAME]: toolName,
  });
}

/**
 * Executes event tracking for the file manifest export.
 * @param entity_name - Entity (tab) name.
 */
export function fileManifestTracking(entity_name: string): void {
  // Track the file manifest requested event.
  track(EVENT_NAME.INDEX_FILE_MANIFEST_REQUESTED, {
    [EVENT_PARAM.ENTITY_NAME]: entity_name,
  });
}

/**
 * Executes event tracking for the Terra export.
 * @param entity_name - Entity (tab) name.
 */
export function exportToTerraTracking(entity_name: string): void {
  // Track the export to terra event.
  track(EVENT_NAME.INDEX_ANALYZE_IN_TERRA_REQUESTED, {
    [EVENT_PARAM.ENTITY_NAME]: entity_name,
  });
}
