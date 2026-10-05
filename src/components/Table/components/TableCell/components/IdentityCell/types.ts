import type { LinkProps } from "../../../../../Links/components/Link/link";
import type { BaseComponentProps } from "../../../../../types";
import type { IdentityChipProps } from "./components/Chips/components/Chip/types";

export interface IdentityCellProps extends BaseComponentProps {
  chips?: IdentityChipProps[];
  subtitle?: IdentityLinkProps /* label rendered as given, e.g. a dataset title or "3 datasets" */;
  title?: IdentityLinkProps /* rendered as plain text when the url is empty or invalid */;
}

/**
 * Link props without `copyable`: the copy button would render as its own item in
 * the cell's column stack, apart from the link it copies. `TypographyProps`
 * omits `onClick`, because Link spreads it after its own `onClick` and it would
 * replace the cell's handler that stops clicks toggling row expansion.
 */
export interface IdentityLinkProps extends Omit<
  LinkProps,
  "copyable" | "TypographyProps"
> {
  TypographyProps?: Omit<NonNullable<LinkProps["TypographyProps"]>, "onClick">;
}
