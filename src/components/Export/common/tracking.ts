import { track } from "../../../common/analytics/analytics";
import { EVENT_NAME, EVENT_PARAM } from "../../../common/analytics/entities";

/**
 * Executes event tracking for bulk download.
 * @param entity_name - Entity (tab) name.
 * @param toolName - Tool name.
 */
export function trackBulkDownloadRequested(
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
export function trackFileManifestRequested(entity_name: string): void {
  // Track the file manifest requested event.
  track(EVENT_NAME.INDEX_FILE_MANIFEST_REQUESTED, {
    [EVENT_PARAM.ENTITY_NAME]: entity_name,
  });
}

/**
 * Executes event tracking for the Terra export.
 * @param entity_name - Entity (tab) name.
 */
export function trackExportToTerraRequested(entity_name: string): void {
  // Track the export to terra event.
  track(EVENT_NAME.INDEX_ANALYZE_IN_TERRA_REQUESTED, {
    [EVENT_PARAM.ENTITY_NAME]: entity_name,
  });
}

/**
 * Executes event tracking for individual file downloads
 * @param entity_name - The name of the file downloaded.
 * @param related_entity_id - The ID of the file's dataset / project
 * @param related_entity_name -The name of the file's dataset / project
 */
export function trackFileDownloaded(
  entity_name: string,
  related_entity_id: string,
  related_entity_name: string
): void {
  // Track the file downloaded event.
  track(EVENT_NAME.FILE_DOWNLOADED, {
    [EVENT_PARAM.ENTITY_NAME]: entity_name,
    [EVENT_PARAM.RELATED_ENTITY_ID]: related_entity_id,
    [EVENT_PARAM.RELATED_ENTITY_NAME]: related_entity_name,
  });
}
