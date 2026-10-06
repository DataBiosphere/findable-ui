import type { LinkProps } from "../../../../../Links/components/Link/link";
import type { BaseComponentProps } from "../../../../../types";
import type { IdentityChipProps } from "./components/Chips/components/Chip/types";

export interface IdentityCellProps extends BaseComponentProps {
  chips?: IdentityChipProps[];
  subtitle?: IdentityLinkProps /* label rendered as given, e.g. a dataset title or "3 datasets" */;
  title?: IdentityLinkProps /* rendered as plain text when the url is empty or invalid */;
}

/**
 * Link props without `copyable`, and with a string `url` only:
 * - `copyable` would render the copy button as its own item in the cell's column
 *   stack, apart from the link it copies.
 * - URL objects render an explore view link, which drops Link's styling and
 *   throws on an invalid href or query rather than falling back to plain text.
 */
export interface IdentityLinkProps extends Omit<LinkProps, "copyable" | "url"> {
  url: string;
}
