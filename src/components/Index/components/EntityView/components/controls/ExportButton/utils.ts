import { FROM_URL_PARAM } from "../../../../../../../common/constants";
import { ROUTE } from "../../../../../../../routes/constants";
import { convertUrlParams } from "../../../../../../../utils/url";

/**
 * Returns the export page's URL, with the explore page's entity list type in its `from` param.
 * @param entityListType - Entity list type of the explore page.
 * @returns The export page URL.
 */
export function getExportHref(entityListType: string): string {
  return `${ROUTE.EXPORT}?${convertUrlParams({ [FROM_URL_PARAM]: entityListType })}`;
}
