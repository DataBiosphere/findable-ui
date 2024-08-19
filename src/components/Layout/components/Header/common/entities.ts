import { BreakpointKey } from "../../../../../hooks/useBreakpointHelper";
import { Social } from "../../../../common/Socials/socials";
import { NavLinkItem } from "../components/Content/components/Navigation/navigation";

export type Navigation = [
  NavLinkItem[] | undefined,
  NavLinkItem[] | undefined,
  NavLinkItem[] | undefined
]; // [LEFT, CENTER, RIGHT]

export type SelectedMatch =
  | SELECTED_MATCH
  | Partial<Record<BreakpointKey, boolean | SELECTED_MATCH>>;

export enum SELECTED_MATCH {
  EQUALS = "EQUALS",
  STARTS_WITH = "STARTS_WITH", // Default value.
}

export interface SocialMedia {
  socials: Social[];
}
