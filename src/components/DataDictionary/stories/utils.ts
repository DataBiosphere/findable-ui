import { Attribute } from "../../../common/entities";
import { SiteConfig } from "../../../config/entities";
import { getDefaultConfig } from "../../../config/utils";
import { DICTIONARY_PATH, TABLE_OPTIONS } from "./constants";
import { TIER_1_DICTIONARY } from "./tier1";

/**
 * Returns the requirement level as a filterable label.
 * The fixture carries `true`, `false` or "strongly recommended"; the filters
 * panel needs a stable string to group on.
 * @param required - Attribute requirement level.
 * @returns Display label for the requirement level.
 */
export function getRequiredLabel(required: Attribute["required"]): string {
  if (required === true) return "Required";
  if (required === false) return "Recommended";
  return "Strongly Recommended";
}

/**
 * Returns a site config carrying just the Tier 1 dictionary.
 * Built from the default config so the shape stays valid as `SiteConfig` grows.
 * @returns Site config for the story.
 */
export function getSiteConfig(): SiteConfig {
  return {
    ...getDefaultConfig(),
    dataDictionaries: [
      {
        dataDictionary: TIER_1_DICTIONARY,
        path: DICTIONARY_PATH,
        tableOptions: TABLE_OPTIONS,
      },
    ],
  };
}
