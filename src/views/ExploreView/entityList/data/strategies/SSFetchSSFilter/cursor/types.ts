import { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";

export type Cursor = {
  search_after: string | undefined;
  search_before: string | undefined;
};

export interface UseCursor<T = unknown> {
  cursor: Cursor;
  onUpdateCursor: (data?: AzulEntitiesResponse<T>) => void;
}
