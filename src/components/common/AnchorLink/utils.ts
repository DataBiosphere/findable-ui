import { resolveAriaLabel } from "../../../utils/ariaLabel";
import { ARIA_LABEL } from "./constants";

/**
 * Returns the anchor link's accessible name: "Link to" the section title, or
 * "Link to this section" when the title is absent or blank.
 * @param label - Title of the section linked to.
 * @returns The accessible name.
 */
export function getAriaLabel(label?: string): string {
  const title = label?.trim();
  return resolveAriaLabel(
    title && `Link to ${title}`,
    ARIA_LABEL.LINK_TO_SECTION,
  );
}
