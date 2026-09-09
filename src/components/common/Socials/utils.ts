import { ReactNode } from "react";
import { resolveAriaLabel } from "../../../utils/ariaLabel";
import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for a social link. `Social.label` is typed as
 * `ReactNode` but is a plain string in every known consumer, so it is used
 * directly when it is one and falls back to a generic name otherwise — the
 * link's icon is `aria-hidden`, leaving no text to name it.
 * @param label - The social's label.
 * @returns The social link's accessible name.
 */
export function getSocialLabel(label: ReactNode): string {
  return resolveAriaLabel(
    typeof label === "string" ? label : undefined,
    ARIA_LABEL.SOCIAL,
  );
}
