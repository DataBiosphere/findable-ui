import { FILES_FACETS_STATUS } from "../src/hooks/useFileManifest/common/entities";
import {
  FileManifestState,
  UpdateFileManifestPayload,
} from "../src/providers/fileManifestState";
import { FILE_MANIFEST_STATE } from "../src/providers/fileManifestState/constants";
import { updateFilesFacetsStatus } from "../src/providers/fileManifestState/utils";

const FILE_MANIFEST_STATE_NOT_STARTED: FileManifestState = {
  ...FILE_MANIFEST_STATE,
  filesFacetsStatus: FILES_FACETS_STATUS.NOT_STARTED,
};

const FILE_MANIFEST_STATE_IN_PROGRESS: FileManifestState = {
  ...FILE_MANIFEST_STATE,
  filesFacetsStatus: FILES_FACETS_STATUS.IN_PROGRESS,
};

const FILE_MANIFEST_STATE_COMPLETED: FileManifestState = {
  ...FILE_MANIFEST_STATE,
  filesFacetsStatus: FILES_FACETS_STATUS.COMPLETED,
};

const UPDATE_FILE_MANIFEST_PAYLOAD_IDLE = {
  isFacetsLoading: false,
  isFacetsSuccess: false,
} as UpdateFileManifestPayload;

const UPDATE_FILE_MANIFEST_PAYLOAD_LOADING = {
  isFacetsLoading: true,
  isFacetsSuccess: false,
} as UpdateFileManifestPayload;

const UPDATE_FILE_MANIFEST_PAYLOAD_SUCCESS = {
  isFacetsLoading: false,
  isFacetsSuccess: true,
} as UpdateFileManifestPayload;

describe("updateFilesFacetsStatus", () => {
  test("files facets NOT_STARTED, request is IDLE", () => {
    expect(
      updateFilesFacetsStatus(
        FILE_MANIFEST_STATE_NOT_STARTED,
        UPDATE_FILE_MANIFEST_PAYLOAD_IDLE
      )
    ).toBe(FILES_FACETS_STATUS.NOT_STARTED);
  });

  test("files facets NOT_STARTED, request is LOADING", () => {
    expect(
      updateFilesFacetsStatus(
        FILE_MANIFEST_STATE_NOT_STARTED,
        UPDATE_FILE_MANIFEST_PAYLOAD_LOADING
      )
    ).toBe(FILES_FACETS_STATUS.IN_PROGRESS);
  });

  test("files facets IN_PROGRESS, request is LOADING", () => {
    expect(
      updateFilesFacetsStatus(
        FILE_MANIFEST_STATE_IN_PROGRESS,
        UPDATE_FILE_MANIFEST_PAYLOAD_LOADING
      )
    ).toBe(FILES_FACETS_STATUS.IN_PROGRESS);
  });

  test("files facets IN_PROGRESS, request is SUCCESS", () => {
    expect(
      updateFilesFacetsStatus(
        FILE_MANIFEST_STATE_IN_PROGRESS,
        UPDATE_FILE_MANIFEST_PAYLOAD_SUCCESS
      )
    ).toBe(FILES_FACETS_STATUS.COMPLETED);
  });

  test("files facets COMPLETED, request is SUCCESS", () => {
    expect(
      updateFilesFacetsStatus(
        FILE_MANIFEST_STATE_COMPLETED,
        UPDATE_FILE_MANIFEST_PAYLOAD_SUCCESS
      )
    ).toBe(FILES_FACETS_STATUS.COMPLETED);
  });
});
