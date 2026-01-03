import { AzulTermFacets } from "../../../../../../../apis/azul/common/entities";
import { EntityListData } from "../../../types";

export interface UseAdapter<T = unknown> extends EntityListData<T> {
  pageCount: number;
  termFacets?: AzulTermFacets;
}
