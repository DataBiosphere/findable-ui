import { ColumnDef } from "@tanstack/react-table";
import { GridTrackSize } from "config/entities";

/**
 * Model of a value of a metadata class.
 */
export interface Attribute {
  description: string;
  key: string;
  label: string;
}

/**
 * Model of attribute keys; used mostly when building data dictionary column definitions.
 */
export type AttributeValue = Attribute[keyof Attribute];

/**
 * Filterable metadata keys.
 */
export type CategoryKey = string;

/**
 * View model of category tag.
 */
export interface CategoryTag {
  label: string;
  onRemove: () => void;
  superseded: boolean;
}

/**
 * Model of a metadata class, to be specified manually or built from LinkML schema.
 */
export interface Class {
  attributes: Attribute[];
  description: string;
  key: string;
  label: string;
  name: string;
}

/**
 * Category values to be used as keys. For example, "Homo sapiens" or "10X 3' v2 sequencing".
 */
export type CategoryValueKey = unknown;

/**
 * Model of a metadata dictionary containing a set of classes and their definitions.
 */
export interface DataDictionary {
  classes: Class[];
}

/**
 * Display model of a data dictionary column.
 */
export interface DataDictionaryColumnDef {
  attributeDisplayName: string;
  attributeSlotName: string;
  // Adding width here for now; possibly revisit separating column def and UI.
  width: {
    max: GridTrackSize;
    min: GridTrackSize;
  };
}

/**
 * Configuration of data dictionary; contains schema definition (that is, the actual data
 * dictionary) as well as column def for displaying the data dictionary.
 */
export interface DataDictionaryConfig {
  columnDefs: ColumnDef<Attribute, Attribute[keyof Attribute]>[];
  dataDictionary: DataDictionary;
}

/**
 * Label and description values from a data dictionary that are added to a site
 * config value.
 */
export interface DataDictionaryAnnotation {
  description: string;
  label: string;
}

/**
 * Set of selected category values.
 */
export type Filters = SelectedFilter[];

/**
 * Generic pagination model used by both static and dynamic lists.
 */
export interface Pagination {
  canNextPage: boolean;
  canPreviousPage: boolean;
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  resetPage: () => void;
}

/**
 * Possible pagination direction values.
 */
export type PaginationDirectionType = "next" | "prev";

/**
 * Internal filter model of a multiselect category (e.g. library construction approach).
 */
export interface SelectCategory {
  key: CategoryKey;
  label: string;
  values: SelectCategoryValue[];
}

/**
 * Internal filter model of a multiselect category value (e.g. "10x 3' v1").
 */
export interface SelectCategoryValue {
  count: number;
  key: CategoryValueKey;
  label: string; // Allows for displaying null values as "Unspecified"
  selected: boolean;
}

/**
 * View model of category value, selected state and count for single or multiselect categories.
 */
export interface SelectCategoryValueView {
  count: number;
  key: CategoryValueKey;
  label: string;
  selected: boolean;
}

/**
 * View model of category, for multiselect categories.
 */
export interface SelectCategoryView {
  annotation?: DataDictionaryAnnotation;
  enableChartView?: boolean;
  isDisabled?: boolean;
  key: CategoryKey;
  label: string;
  values: SelectCategoryValueView[];
}

/**
 * Model of selected category values in a category.
 */
export interface SelectedFilter {
  categoryKey: CategoryKey;
  value: SelectedFilterValue;
}

/**
 * Possible types of selected category values.
 */
export type SelectedFilterValue = CategoryValueKey[];
