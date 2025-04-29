import { EXPLORE_MODE } from "hooks/useExploreMode/types";
import { RowPreviewOptions } from "../../../../../components/Table/features/RowPreview/entities";

export const ROW_PREVIEW_OPTIONS: Record<EXPLORE_MODE, RowPreviewOptions> = {
  CS_FETCH_CS_FILTERING: {
    enableRowPreview: false,
  },
  SS_FETCH_CS_FILTERING: {
    enableRowPreview: false,
  },
  SS_FETCH_SS_FILTERING: {
    enableRowPreview: false,
  },
};
