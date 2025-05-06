import {
  Attribute,
  Class,
  DataDictionary,
  DataDictionaryAnnotation,
} from "../../../common/entities";
import { CategoryGroupConfig, SiteConfig } from "../../../config/entities";

/**
 * Annotate each entity column configuration with data dictionary values. Specifically,
 * look up label and description for each column key.
 * @param siteConfig - Site configuration to annotate.
 * @param annotationsByKey - Data dictionary annotations keyed by key.
 */
export function annotateColumnConfig(
  siteConfig: SiteConfig,
  annotationsByKey: Record<string, DataDictionaryAnnotation>
): void {
  // Annotate every column in every entity.
  siteConfig.entities.forEach((entity) => {
    entity.list.columns.forEach((columnConfig) => {
      // Find the annotation for the column key.
      const annotation = annotationsByKey[columnConfig.id];
      if (!annotation) {
        return;
      }

      if (!columnConfig.meta) {
        columnConfig.meta = {};
      }
      columnConfig.meta.annotation = annotation;
    });
  });
}

/**
 * Annotate filter and colummn configuration with data dictionary values. Note this
 * functionality mutates the site config. A possible future improvement would be to
 * create either a specific "raw"  or "annotated" type to indicate clearly the point
 * at which the config has been annotated.
 * @param siteConfig - The site configuration to annotate.
 */
export function annotateSiteConfig(siteConfig: SiteConfig): void {
  // Build and map data dictionary annotations by key.
  const { dataDictionaries: dataDictionaryConfigs } = siteConfig;
  if (!dataDictionaryConfigs || !dataDictionaryConfigs.length) {
    return;
  }
  for (const dataDictionaryConfig of dataDictionaryConfigs) {
    const annotationsByKey = keyAnnotationsByKey(
      dataDictionaryConfig.dataDictionary
    );

    // Annotate elements of site config.
    annotateEntityConfig(siteConfig, annotationsByKey);
    annotateDefaultCategoryConfig(siteConfig, annotationsByKey);
    annotateEntityCategoryConfig(siteConfig, annotationsByKey);
    annotateColumnConfig(siteConfig, annotationsByKey);
  }
}

/**
 * Annotate entity configuration with data dictionary values. Specifically, look
 * up label and description for each entity key.
 * @param siteConfig - The site configuration to annotate.
 * @param annotationsByKey - Data dictionary annotations keyed by key.
 */
export function annotateEntityConfig(
  siteConfig: SiteConfig,
  annotationsByKey: Record<string, DataDictionaryAnnotation>
): void {
  // Annotate every entity.
  siteConfig.entities.forEach((entityConfig) => {
    // Check entity for a data dictionary key.
    const { key } = entityConfig;
    if (!key) {
      return;
    }

    // Find corresponding annotation for the key and set on entity config.
    entityConfig.annotation = annotationsByKey[key];
  });
}

/**
 * Annotate top-level (app-wide) category config with data dictionary values.
 * Specifically, look up label and description for each filter key.
 * @param siteConfig - Site configuration to annotate.
 * @param annotationsByKey - Data dictionary annotations keyed by key.
 */
export function annotateDefaultCategoryConfig(
  siteConfig: SiteConfig,
  annotationsByKey: Record<string, DataDictionaryAnnotation>
): void {
  const { categoryGroupConfig } = siteConfig;
  if (categoryGroupConfig) {
    annotateCategoryGroupConfig(categoryGroupConfig, annotationsByKey);
  }
}

/**
 * Annotate entity-specific category config with data dictionary values. Specifically,
 * look up label and description for each category key.
 * @param siteConfig - Site configuration to annotate.
 * @param annotationsByKey - Data dictionary annotations keyed by key.
 */
export function annotateEntityCategoryConfig(
  siteConfig: SiteConfig,
  annotationsByKey: Record<string, DataDictionaryAnnotation>
): void {
  // Annotate every category in every entity.
  siteConfig.entities.forEach((entityConfig) => {
    const { categoryGroupConfig } = entityConfig;
    if (categoryGroupConfig) {
      annotateCategoryGroupConfig(categoryGroupConfig, annotationsByKey);
    }
  });
}

/**
 * Annonate category group configuration with data dictionary values.
 * @param categoryGroupConfig - Category group to annotate.
 * @param annotationsByKey - Data dictionary annotations keyed by key.
 */
function annotateCategoryGroupConfig(
  categoryGroupConfig: CategoryGroupConfig,
  annotationsByKey: Record<string, DataDictionaryAnnotation>
): void {
  categoryGroupConfig.categoryGroups.forEach((categoryGroup) => {
    categoryGroup.categoryConfigs.forEach((categorConfig) => {
      categorConfig.annotation = annotationsByKey[categorConfig.key];
    });
  });
}

/**
 * Transform a data dictionary into a key-annotation map. Build annotations for both
 * classes and attributes and add to map.
 * @param dataDictionary - Data dictionary to transform into a key-annotation map.
 * @returns Key-annotation map.
 */
function keyAnnotationsByKey(
  dataDictionary: DataDictionary
): Record<string, DataDictionaryAnnotation> {
  return dataDictionary.classes.reduce(
    (acc: Record<string, DataDictionaryAnnotation>, cls: Class) => {
      // Add class to map.
      acc[cls.name] = {
        description: cls.description,
        label: cls.title,
      };

      // Add each class attribute to the map.
      cls.attributes.forEach((attribute: Attribute) => {
        acc[attribute.name] = {
          description: attribute.description,
          label: attribute.title,
        };
      });
      return acc;
    },
    {} as Record<string, DataDictionaryAnnotation>
  );
}
