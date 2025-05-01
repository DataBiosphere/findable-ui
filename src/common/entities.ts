import { ColumnDef } from "@tanstack/react-table";

/**
 * Model of a value of a metadata class.
 */
export interface Attribute {
  annotations?: {
    sourceFragment?: string; // E.g. "title" for https://github.com/chanzuckerberg/.../schema.md#title
  };
  description: string;
  example?: string; // Free text example of attribute
  multivalue: boolean; // True if attribute can have multiple values
  name: string; // Programmatic slot name or key (e.g. batch_condition, biosamples.anatomical_site)
  rationale?: string; // Free text rationale for attribute
  required?: boolean;
  source?: string; // Source of attribute; must be one of sources specified at dictionary level
  title: string; // Display name
  type?: string;
  value?: string; // Contains attribute value type (e.g. "string" or "int") and/or enum values and/or description of values
}

/**
 * Model of attribute key types; used mostly when building data dictionary column definitions.
 */
export type AttributeValueTypes = string | boolean;

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
  name: string; // Programmatic name or key (e.g. cell, sample)
  title: string; // Display name
}

/**
 * Category values to be used as keys. For example, "Homo sapiens" or "10X 3' v2 sequencing".
 */
export type CategoryValueKey = unknown;

/**
 * Key value pair where the key is an identifier for a schema and the value is
 * a URL to the schema definition.
 */
export type DataDictionaryPrefix = Record<string, string>;

/**
 * Model of a metadata dictionary containing a set of classes and their definitions.
 */
export interface DataDictionary {
  annotations: {
    sources: {
      prefix: DataDictionarySource;
    };
  };
  classes: Class[];
  description: string; // Free text description of data dictionary
  name: string; // Programmatic name or key (e.g. tier1, hca)
  prefixes: DataDictionaryPrefix;
  sources: DataDictionarySource[];
  title: string; // Display name
}

/**
 * Display model of a data dictionary column.
 */
export interface DataDictionaryColumnDef {
  attributeDisplayName: string;
  attributeSlotName: string;
  // Adding width here for now; possibly revisit separating column def and UI.
  width: {
    max: string;
    min: string;
  };
}

/**
 * Configuration of data dictionary; contains schema definition (that is, the actual data
 * dictionary) as well as column def for displaying the data dictionary.
 */
export interface DataDictionaryConfig {
  columnDefs: ColumnDef<Attribute>[];
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
 * Model of a data dictionary source, which is a source of metadata (e.g. CELLxGENE or CAP).
 */
export interface DataDictionarySource {
  name: keyof DataDictionaryPrefix;
  title: string; // Display name
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
