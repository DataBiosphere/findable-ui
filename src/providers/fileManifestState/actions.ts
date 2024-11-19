import { buildFileManifestRequestURL } from "../../hooks/useFileManifest/common/buildFileManifestRequestURL";
import {
  FileManifestContext,
  FileManifestState,
  UpdateFileManifestPayload,
} from "../fileManifestState";
import { getRequestFilters, updateFilesFacetsStatus } from "./utils";

/**
 * Update file manifest action.
 * @param state - State.
 * @param payload - Payload.
 * @param context - Context.
 * @returns state.
 */
export function updateFileManifestAction(
  state: FileManifestState,
  payload: UpdateFileManifestPayload,
  context: FileManifestContext
): FileManifestState {
  const { catalog, URL } = context;
  const filesFacetsStatus = updateFilesFacetsStatus(state, payload);
  const nextState = { ...state, ...payload, filesFacetsStatus };
  const fileManifestRequest = buildFileManifestRequestURL(
    URL,
    getRequestFilters(nextState),
    catalog,
    nextState.fileManifestFormat
  );
  return {
    ...nextState,
    ...fileManifestRequest,
  };
}
