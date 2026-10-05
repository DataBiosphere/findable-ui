import type { LinkProps } from "../../../../../Links/components/Link/link";
import type { IdentityChipProps } from "./components/Chips/components/Chip/types";

export interface IdentityCellProps {
  chips?: IdentityChipProps[];
  subtitle?: LinkProps /* label rendered as given, e.g. a dataset title or "3 datasets" */;
  title: LinkProps /* rendered as plain text when the url is empty or invalid */;
}
