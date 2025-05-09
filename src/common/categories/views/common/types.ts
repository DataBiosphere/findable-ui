import { CategoryKey, DataDictionaryAnnotation } from "../../../entities";

/**
 * Common properties for category views.
 */
export interface BaseCategoryView {
  annotation?: DataDictionaryAnnotation;
  isDisabled?: boolean;
  key: CategoryKey;
  label: string;
}
