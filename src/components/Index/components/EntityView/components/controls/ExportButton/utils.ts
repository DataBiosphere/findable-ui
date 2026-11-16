import { FROM_URL_PARAM } from "../../../../../../../common/constants";
import { ROUTE } from "../../../../../../../routes/constants";
import { convertUrlParams } from "../../../../../../../utils/url";

/**
 * Returns the export page's URL, with the explore origin in its `from` param.
 * @param exploreOrigin - Entity list type the user explored from.
 * @returns The export page URL.
 */
export function getExportHref(exploreOrigin: string): string {
  return `${ROUTE.EXPORT}?${convertUrlParams({ [FROM_URL_PARAM]: exploreOrigin })}`;
}
